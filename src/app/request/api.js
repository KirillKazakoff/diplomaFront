class Api {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;

        this.message = {
            sendFileData: async (fileData) => {
                const res = await this.postJson('/message/sendFileData', fileData);
                return res.text();
            },
            sendFile: async (file) => {
                const res = await this.post('/message/sendFile', file);
                return res.text();
            },

            getFilesData: async () => {
                const res = await this.get('/message/getFilesData');
                return res.json();
            },
            getFile: async (id) => {
                const res = await this.get(`/${id}`);
                return res.blob();
            },

            // getImg: async () => {
            //     const res = await this.get('/Landscape - 757.mp4');
            //     return res.blob();
            // },
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
            body: postData,
        });
    }

    async postJson(url, postData) {
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
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
            },
        });
    }
}

const api = new Api('http://localhost:9091');
export default api;
