import {NetworkResponse} from "./model/network-response";
import {DexResponse} from "./model/dex-response";
import {GeckoTerminalError, GeckoTerminalErrorsResponse} from "./model/error-response";

// https://www.coingecko.com/api/documentations/v3
// https://samuraitruong.github.io/coingecko-api-v3/https://samuraitruong.github.io/coingecko-api-v3/
// https://www.coingecko.com/api/documentations/v3#/simple/get_simple_price
// https://github.com/samuraitruong/coingecko-api-v3
// https://www.geckoterminal.com/ru/ton/pools/EQBb8kl4N3C0xr_U00Tc84Ipm0juApDUZlW0F0SbrqXJXdjY
export class GeckoTerminalApiV2 {
    private baseUrl: String = 'https://api.geckoterminal.com/api/v2';

    constructor() {}


    /**
     * A description of the entire function.
     *
     * @param {number} page - page through results
     * @return {Promise<NetworkResponse>} get list of supported networks
     */
    public getNetworks(page: number = 1): Promise<NetworkResponse> {
        return this.get<NetworkResponse>(`/networks`);
    }

    /**
     * getDexes
     */
    public getDexes(network: string, integer: number = 1): Promise<DexResponse> {
        return this.get<DexResponse>(`/networks/${network}/dexes?page=${integer}`);
    }

    private async get<T>(path: string, init?: RequestInit): Promise<T> {
        console.log(this.baseUrl + path);
        const res = await fetch(this.baseUrl + path, init);
        if (!res.ok) {
            throw new GeckoTerminalError(res);
        }

        return res.json() as T;
    }


}