import { s3DataType } from "./types"
import * as CryptoJS from 'crypto-js';

const localStorageKey = 's3-credentials';

const _key = import.meta.env.VITE_SECRET_KEY

function encrypt(txt: string) {
    return CryptoJS.AES.encrypt(txt, _key).toString();
}

function decrypt(txtToDecrypt:string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, _key).toString(CryptoJS.enc.Utf8);
}

export const addToLocalStorage = (data: s3DataType) => {
    const encryptedData = encrypt(JSON.stringify(data))
    window.localStorage.setItem(localStorageKey, JSON.stringify(encryptedData));
};

export const getData = (): s3DataType | null => {
    const jsonData = window.localStorage.getItem(localStorageKey);
    if(jsonData){
        const data = JSON.parse(decrypt(JSON.parse(jsonData)))
        return data
    }
    return null
};

export const removeFromLocalStorage = () => {
    window.localStorage.removeItem(localStorageKey);
}