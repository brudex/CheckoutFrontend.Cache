export interface Country {
  code: string;
  name: string;
  dialCode: string;
  flagUrl: string;
  provider: string;
  placeholder: string;
  networks: string[];
}

export interface PhoneData {
  countryCode: string;
  phoneNumber: string;
  network: string;
}