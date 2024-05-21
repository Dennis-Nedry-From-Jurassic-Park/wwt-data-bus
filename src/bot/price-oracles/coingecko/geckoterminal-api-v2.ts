import {NetworkResponse} from "./model/network-response";
import {DexResponse} from "./model/dex-response";
import {GeckoTerminalError, GeckoTerminalErrorsResponse} from "./model/error-response";

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