var CryptoJS = require("crypto-js");
const config = require('../config/config.json');

function convertText(conversiontype, convertText, replace = false) {
    try {
        if (conversiontype === 'enc' && replace) {
            return CryptoJS.AES.encrypt(convertText.toString().trim(), config.encryptKey).toString().replace(/\//g, 'ebh78').replace(/[+]/g, 'plo125').replace(/=/g, 'iisd5545');
        } else if (conversiontype === 'enc' && !replace) {
            return CryptoJS.AES.encrypt(convertText.toString().trim(), config.encryptKey).toString();
        } else if (conversiontype === 'dec' && replace) {
            return CryptoJS.AES.decrypt(convertText.toString().trim().replace(/ebh78/g, '/').replace(/plo125/g, '+').replace(/iisd5545/g, '='), config.encryptKey).toString(CryptoJS.enc.Utf8);
        } else if (conversiontype === 'dec' && !replace) {
            return CryptoJS.AES.decrypt(convertText.toString().trim(), config.encryptKey).toString(CryptoJS.enc.Utf8);
        }
    } catch (e) {
        console.log('Enc-Dec: Error->' + e);
    }
}
function encryptSensitiveV1(data) {
    const iv = CryptoJS.enc.Utf8.parse('55Smc254#!$^4144GUjsgyAihAu54!SM');
    const key = CryptoJS.enc.Utf8.parse(config.encryptKey);
    const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), key,
        {
            iv
        });
    return encrypted.toString().replace(/\//g, 'ebh78').replace(/[+]/g, 'plo2').replace(/=/g, 'Mgs5');
}

function decryptSensitiveV1(data) {
    const iv = CryptoJS.enc.Utf8.parse('55Smc254#!$^4144GUjsgyAihAu54!SM');
    const key = CryptoJS.enc.Utf8.parse(config.encryptKey);
    const encrypted = CryptoJS.AES.decrypt(data.trim().replace(/ebh78/g, '/').replace(/plo2/g, '+').replace(/Mgs5/g, '='), key,
        {
            iv
        });
    return encrypted.toString(CryptoJS.enc.Utf8);
}

function encryptSensitive(data) {

    const key = CryptoJS.enc.Utf8.parse('55Smc254#!$^4144GUjsgyAihAu54!SM');
    const iv = CryptoJS.enc.Utf8.parse(config.encryptKey);
    const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), config.encryptKey, key,
        {
            keySize: 64,
            iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
    return encrypted.toString().replace(/\//g, 'ebh78').replace(/[+]/g, 'plo2').replace(/=/g, 'Mgs5');
}

function decryptSensitive(data) {
    try {
        const encrypted = CryptoJS.AES.decrypt(data.trim().replace(/ebh78/g, '/').replace(/plo2/g, '+').replace(/Mgs5/g, '='), config.encryptKey);
        return encrypted.toString(CryptoJS.enc.Utf8);
    } catch (e) {
        console.log('enc-dec=>', e);
    }
}
module.exports = {
    convertText,
    encryptSensitiveV1,
    encryptSensitive,
    decryptSensitiveV1,
    decryptSensitive
}