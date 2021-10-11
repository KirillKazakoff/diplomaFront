class Api {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;

        this.message = {
            send: async (mesData) => {
                const res = await this.post('/message/send', mesData);
                return res.text();
            },
            getMessages: async () => {
                const res = await this.get('message/getMessages');
                return res.json();
            },
        };
    }

    async api(url, settings) {
        const response = await fetch(this.baseUrl + url, settings);

        if (!response.ok) {
            throw new Error(`Api error ${response.statusText}`);
        }

        return response;
    }

    async post(url, postData) {
        return this.api(url, {
            method: 'POST',
            body: JSON.stringify(postData),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
            },
        });
    }

    async get(url) {
        return this.api(url, {
            method: 'GET',
        });
    }
}

const api = new Api('http://localhost:9091');
export default api;
