import { useState, useEffect } from 'react';
import {getUrl} from "../utils/api";

const useApi = (route: string, options: any = {}) => {

    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            // @ts-ignore
            const initData = window["Telegram"]['WebApp']['initData'];

            const url = getUrl() + route;

            try {
                const response = await fetch(
                    url,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'launch-params': initData,
                        },
                        body: JSON.stringify(options),
                    }
                );

                const result = await response.json();
                if (result.status !== 'ok') {
                    setError(result.payload);
                    return;
                }

                setData(result.payload);
            } catch (error) {
                console.error(error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData().then();
    }, [route]);

    return { data, loading, error };

};

export default useApi;