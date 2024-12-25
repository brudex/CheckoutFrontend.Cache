export const getCryptoAddress = (cryptoType: string): string => {
  const addresses = {
    USDT: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    Ethereum: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
  };
  
  return addresses[cryptoType as keyof typeof addresses];
};