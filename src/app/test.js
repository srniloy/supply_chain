const CryptoJS = require("crypto-js");

// Manually provide the AES key as a hexadecimal string (32 bytes for AES-256)
const manualKeyHex = "0123456789abcdef0123456789abcdef";

// Convert the hexadecimal string to a WordArray
const manualKey = CryptoJS.enc.Hex.parse(manualKeyHex);

// Example JSON data
const jsonData = { key1: "value1", key2: "value2" };

// Encrypt the JSON data with the manually provided key
const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(jsonData), manualKey, {
    mode: CryptoJS.mode.CFB,
    padding: CryptoJS.pad.Pkcs7,
});

console.log("Encrypted Data:", encryptedData.toString());

// Decrypt the data with the manually provided key
const decryptedData = CryptoJS.AES.decrypt(encryptedData, manualKey, {
    mode: CryptoJS.mode.CFB,
    padding: CryptoJS.pad.Pkcs7,
});

console.log("Decrypted Data:", decryptedData.toString(CryptoJS.enc.Utf8));
