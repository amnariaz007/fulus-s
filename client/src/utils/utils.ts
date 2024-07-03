export const copyText = (text: string) => {
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = text;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextArea);
}

export const getTG = () => {
    // @ts-ignore
    return window.Telegram.WebApp;
}

export const getUnixTime = () => {
    return parseInt(String(new Date().getTime() / 1000));
}

export function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const getSocialIconByUrl = (url: string) => {
    if (url.includes('x.com') || url.includes('twitter.com')) {
        return 'social/twitter.png'
    }

    if (url.includes('t.me')) {
        return 'social/telegram.png'
    }

    if (url.includes('facebook.com')) {
        return 'social/facebook.png'
    }

    return 'emoji/loudspeaker.png';
}