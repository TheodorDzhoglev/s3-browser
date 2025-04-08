import { s3DataType } from "./types"

const localStorageKey = 's3-credentials';

export const addToLocalStorage = (data: s3DataType) => {
    window.localStorage.setItem(localStorageKey, JSON.stringify(data));
};

export const getData = (): s3DataType | null => {
    const jsonData = window.localStorage.getItem(localStorageKey);
    return jsonData ? JSON.parse(jsonData) : null;
};

export const removeFromLocalStorage = () => {
    window.localStorage.removeItem(localStorageKey);
}