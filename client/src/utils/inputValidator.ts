import React from "react";

export const teamFormChange = (input: string, event: any, setter: React.Dispatch<React.SetStateAction<any>>) => {
    const value = event.target.value;

    switch (input) {
        case 'name': {
            const regex = /^[a-zA-Zа-яА-Я0-9\s\-_]+$/;
            if (!regex.test(value) && value.length > 1) {
                return;
            }

            if (value.length > 25) {
                return;
            }

            setter(value);
            break;
        }

        case 'link': {
            /*const regex = /^(?:https?:\/\/)?(?:\w+\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/\S*)?$/;
            if (!regex.test(value) && value.length > 1) {
                return;
            }*/

            if (value.length > 150) {
                return;
            }

            setter(value);
            break;
        }
    }
}

export const checkCryptoAddress = (address: string, network: 'trc20' | 'bep20') => {
    switch (network) {
        case "trc20": {
            if (address.length !== 34) {
                return false;
            }

            if (address.charAt(0) !== 'T') {
                return false;
            }

            const regExp = /^[0-9a-fA-F]+$/;
            if (!regExp.test(address.slice(1))) {
                return false;
            }

            break;
        }

        case "bep20": {
            if (address.length !== 42) {
                return false;
            }

            if (address.slice(0, 2) !== '0x') {
                return false;
            }

            const regExp = /^[0-9a-fA-F]+$/;
            if (!regExp.test(address.slice(2))) {
                return false;
            }

            break;
        }
    }

    return true;
}