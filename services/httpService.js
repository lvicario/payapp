import axios from "axios";

export class HttpService {
    constructor(baseURL) {
        this.client = axios.create({
            baseURL
        });

        this.responseInterceptor();
    }

    responseInterceptor() {
        this.client.interceptors.response.use((resp) => resp, (err) => {
            const expectedError =
                err.response &&
                err.response.status >= 400 &&
                err.response.status < 500;

            if (!expectedError) {
                // should use logger service
                console.log("Log errors:", err);
            }

            return Promise.reject(err);
        });
    }
}
