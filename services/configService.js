import { HttpService} from "./httpService.js";
import config from "./../config.json";

class ConfigService extends HttpService {
    constructor(baseURL) {
        super(baseURL);
    }

    getCashinConfig = async () => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await this.client.get("/cash-in");

                resolve(response.data);
            } catch (err) {
                reject(err);
            }
        });
    };

    getCashoutNaturalConfig = async () => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await this.client.get("/cash-out/natural");

                resolve(response.data);
            } catch (err) {
                reject(err);
            }
        });
    };

    getCashoutJuridicalConfig = async () => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await this.client.get("/cash-out/juridical");

                resolve(response.data);
            } catch (err) {
                reject(err);
            }
        });
    };
};

const configService = new ConfigService(config.endpoint);

export default configService;
