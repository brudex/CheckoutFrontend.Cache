// Payment Interface Alpine.js Component
document.addEventListener('alpine:init', () => {
    // Main Payment Interface
    Alpine.data('paymentInterface', () => ({
        selectedTab: 'visa',
        isPaymentEnabled: true,
        showStatusModal: false,
        modalStatus: 'loading',
        modalMessage: '',
        
        availableTabs: [
            { id: 'visa', label: 'Visa', icon: 'credit-card' },
            { id: 'mobile', label: 'Mobile Money', icon: 'smartphone' },
            { id: 'crypto', label: 'Crypto', icon: 'bitcoin' }
        ],

        init() {
            this.filterAvailablePaymentModes();
            this.initializePaymentStatus();
        },

        get buttonClasses() {
            return {
                'btn-visa': this.selectedTab === 'visa',
                'btn-mobile': this.selectedTab === 'mobile',
                'btn-crypto': this.selectedTab === 'crypto'
            };
        },

        get buttonText() {
            const texts = {
                visa: 'Pay with Visa',
                mobile: 'Send Payment Request',
                crypto: 'Pay with Crypto'
            };
            return texts[this.selectedTab];
        },

        selectTab(tabId) {
            this.selectedTab = tabId;
        },

        filterAvailablePaymentModes() {
            const modesMetaElement = document.querySelector('meta[name="payment-modes"]');
            if (modesMetaElement) {
                const modes = JSON.parse(modesMetaElement.getAttribute('content') || '[]');
                const modeMapping = { card: 'visa', wallet: 'mobile', crypto: 'crypto' };
                this.availableTabs = this.availableTabs.filter(tab => 
                    modes.includes(Object.keys(modeMapping).find(key => modeMapping[key] === tab.id))
                );
            }
        },

        async handlePayment() {
            if (!this.isPaymentEnabled) return;

            const modal = new bootstrap.Modal(document.getElementById('paymentStatusModal'));
            this.showStatusModal = true;
            this.modalStatus = 'loading';
            this.modalMessage = 'Processing your payment...';
            modal.show();

            try {
                // Implement payment processing logic here
                await this.processPayment();
            } catch (error) {
                this.modalStatus = 'error';
                this.modalMessage = error.message || 'Payment failed';
            }
        },

        async processPayment() {
            // Implementation will vary based on payment type
            switch(this.selectedTab) {
                case 'visa':
                    // Process card payment
                    break;
                case 'mobile':
                    // Process mobile money payment
                    break;
                case 'crypto':
                    // Process crypto payment
                    break;
            }
        },

        handleModalClose() {
            this.showStatusModal = false;
            this.modalStatus = 'loading';
            this.modalMessage = '';
        },

        initializePaymentStatus() {
            // Initialize payment status check if needed
        }
    }));

    // Order Details Component
    Alpine.data('orderDetails', () => ({
        orderDetails: null,

        async init() {
            await this.fetchOrderDetails();
        },

        async fetchOrderDetails() {
            const trxnId = document.querySelector('meta[name="trxn-id"]')?.getAttribute('content');
            if (!trxnId) return;

            try {
                const response = await fetch(`/api/getOrderDetails/${trxnId}`);
                const data = await response.json();
                
                if (data.status !== "00" && data.redirectUrl) {
                    window.location.href = data.redirectUrl;
                    return;
                }

                this.orderDetails = data;
            } catch (error) {
                console.error('Failed to fetch order details:', error);
            }
        },

        formatPrice(amount) {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
            }).format(amount);
        }
    }));

    // Mobile Money Payment Component
    Alpine.data('mobileMoneyPayment', () => ({
        countries: [
            {
                code: 'GH',
                name: 'Ghana',
                dialCode: '+233',
                flagUrl: 'https://flagcdn.com/gh.svg',
                provider: 'MTN Mobile Money',
                placeholder: '24 123 4567',
                networks: ['MTN', 'Telecel', 'AT']
            },
            // Add other countries...
        ],
        selectedCountry: null,
        selectedNetwork: '',
        phoneNumber: '',

        init() {
            this.selectedCountry = this.countries[0];
        },

        selectCountry(country) {
            this.selectedCountry = country;
            this.selectedNetwork = country.networks[0];
        }
    }));

    // Crypto Payment Component
    Alpine.data('cryptoPayment', () => ({
        cryptocurrencies: ['USDT', 'Ethereum'],
        selectedCrypto: 'USDT',
        cryptoIcons: {
            USDT: 'dollar-sign',
            Ethereum: 'ethereum'
        },

        init() {
            this.$watch('selectedCrypto', () => this.updateQRCode());
            this.updateQRCode();
        },

        get cryptoAddress() {
            const addresses = {
                USDT: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
                Ethereum: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
            };
            return addresses[this.selectedCrypto];
        },

        selectCrypto(crypto) {
            this.selectedCrypto = crypto;
        },

        updateQRCode() {
            const qr = qrcode(0, 'M');
            qr.addData(this.cryptoAddress);
            qr.make();
            this.$refs.qrcode.innerHTML = qr.createImgTag(6);
        }
    }));

    // Visa Payment Component
    Alpine.data('visaPayment', () => ({
        cardData: {
            number: '',
            expiry: '',
            cvv: ''
        },

        formatCardNumber(event) {
            let value = event.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{4})/g, '$1 ').trim();
            this.cardData.number = value;
        },

        formatExpiry(event) {
            let value = event.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2);
            }
            this.cardData.expiry = value;
        }
    }));
});