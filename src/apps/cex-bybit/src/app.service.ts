import {Injectable} from '@nestjs/common';
import {RestClientV5} from "bybit-api";
import {API_KEY, PRIVATE_KEY, RECV_WINDOW} from "./config";

@Injectable()
export class AppService {
    private readonly client_: RestClientV5

    constructor() {
        this.client_ = new RestClientV5({
            testnet: false,
            key: API_KEY,
            secret: PRIVATE_KEY,
            recv_window: RECV_WINDOW
        })
    }

    get client() {
        return this.client_
    }
}
