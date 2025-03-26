import axios, {AxiosInstance, AxiosResponse} from "axios";

export class Request {
    private api: AxiosInstance;

    constructor(apiBase: string, apiKey: string = "") {
        this.api = this.createAxiosInstance(apiBase, apiKey);
    }

    private createAxiosInstance(apiBase: string, apiKey: string): AxiosInstance {
        return axios.create({
            baseURL: apiBase,
            timeout: 5000,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "x-api-key": apiKey,
            },
        });
    }

    setApiKey(newApiKey: string) {
        console.log(newApiKey);
        this.api.defaults.headers["x-api-key"] = newApiKey;
    }

    async get<T>(url: string, params: object = {}): Promise<T> {
        return this.handleRequest(() => this.api.get(url, {params}));
    }

    async post<T>(url: string, data: object): Promise<T> {
        return this.handleRequest(() => this.api.post(url, data));
    }

    async patch<T>(url: string, data: object): Promise<T> {
        return this.handleRequest(() => this.api.patch(url, data));
    }

    async delete<T>(url: string): Promise<T> {
        return this.handleRequest(() => this.api.delete(url));
    }

    private async handleRequest<T>(request: () => Promise<AxiosResponse<T>>): Promise<T> {
        try {
            const response = await request();
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.error || "API request failed");
        }
    }
}

const apiClient = new Request(import.meta.env.VITE_API_BASE);
export default apiClient;
