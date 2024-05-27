import {WSClientConfigurableOptions} from "bybit-api/lib/types";

export const API_KEY = process.env.CEX_BYBIT_API_V5_PUB_KEY;
export const PRIVATE_KEY = process.env.CEX_BYBIT_API_V5_PRIVATE_KEY;
export const RECV_WINDOW = 10000;


export const ws_options: WSClientConfigurableOptions= {
    market: 'v5',
    testnet: false,
    key: API_KEY,
    secret: PRIVATE_KEY,
    pongTimeout: 10000,
    // how often to check (in ms) that WS connection is still alive
    pingInterval: 10000,
    // config options sent to RestClient (used for time sync). See RestClient docs.
    // restOptions: { },

    // config for axios used for HTTP requests. E.g for proxy support
    // requestOptions: { }

    // how long to wait before attempting to reconnect (in ms) after connection is closed
    // reconnectTimeout: 500,

    // recv window size for authenticated websocket requests (higher latency connections (VPN) can cause authentication to fail if the recv window is too small)
    // recvWindow: 5000,

    // override which URL to use for websocket connections
    // wsUrl: 'wss://stream.bytick.com/realtime'
}