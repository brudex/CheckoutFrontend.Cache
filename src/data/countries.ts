import type { Country } from '../types/mobile-money';

export const countries: Country[] = [
  {
    code: 'GH',
    name: 'Ghana',
    dialCode: '+233',
    flagUrl: 'https://flagcdn.com/gh.svg',
    provider: 'MTN Mobile Money',
    placeholder: '24 123 4567',
  },
  {
    code: 'KE',
    name: 'Kenya',
    dialCode: '+254',
    flagUrl: 'https://flagcdn.com/ke.svg',
    provider: 'M-PESA',
    placeholder: '712 345678',
  },
  {
    code: 'SZ',
    name: 'Eswatini',
    dialCode: '+268',
    flagUrl: 'https://flagcdn.com/sz.svg',
    provider: 'MTN Mobile Money',
    placeholder: '76 123 456',
  },
];