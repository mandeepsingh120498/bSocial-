import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.REACT_APP_SECRET_KEY || '';

// Function to encrypt data
export const encryptData = (data: string): string => {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
};

// Function to decrypt data
export const decryptData = (encryptedData: string): string | null => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Error decrypting data:', error);
    return null;
  }
};

// Function to store encrypted key-value pairs in sessionStorage
export const storeEncryptedKeyValuePairs = (data: Record<string, any>) => {
  Object.entries(data).forEach(([key, value]) => {
    const encryptedValue = encryptData(String(value));
    sessionStorage.setItem(key, encryptedValue);
  });
};

// Function to get decrypted value from sessionStorage
export const getDecryptedValue = (key: string): string | null => {
  const encryptedValue = sessionStorage.getItem(key);
  return encryptedValue ? decryptData(encryptedValue) : null;
};
