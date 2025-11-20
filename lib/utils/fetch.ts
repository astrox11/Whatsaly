export const astroNetwork = {
    get: async (url: string, options?: RequestInit) => {
        const response = await fetch(url, {
            method: 'GET',
            ...options,
        });
        return response;
    },
    post: async (url: string, body: any, options?: RequestInit) => {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                ...(options && options.headers ? options.headers : {}),
            },
            ...options,
        });
        return response;
    },
}