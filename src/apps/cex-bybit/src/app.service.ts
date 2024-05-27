import {Injectable} from '@nestjs/common';
import {RestClientV5} from "bybit-api";
import {API_KEY, PRIVATE_KEY, RECV_WINDOW} from "./config";
import axios from "axios";

const crypto = require('crypto');

@Injectable()
export class AppService {
    private readonly client_: RestClientV5

    // TODO https://www.bybit.com/en/help-center/article/How-to-Create-an-RSA-Key-on-Bybit
    constructor() {
        this.client_ = new RestClientV5({
            testnet: false,
            key: API_KEY,
            secret: PRIVATE_KEY,
            recv_window: RECV_WINDOW
        })
            //{
        //         headers: {
        //             'X-BAPI-API-KEY': this.params.api_key,
        //             'X-BAPI-SIGN': this.createSignature(this.params),
        //             'X-BAPI-SIGN-TYPE': '2',
        //             'X-BAPI-TIMESTAMP': Math.floor(Date.now() / 1000).toString(),
        //             'X-BAPI-RECV-WINDOW': this.params.recv_window,
        //             'Content-Type': 'application/json'
        //
        //             //'X-BAPI-SIGN': this.generateSignature(API_KEY, PRIVATE_KEY, this.params),
        //         }
        //     //data:  this.createSignature(this.params)
        //     // data: {
        //     //     headers: {
        //     //         'X-BAPI-SIGN-TYPE': '2',
        //     //         //'X-BAPI-SIGN': this.generateSignature(API_KEY, PRIVATE_KEY, this.params),
        //     //         'X-BAPI-SIGN': this.createSignature(this.params),
        //     //         'X-BAPI-API-KEY': this.params.api_key,
        //     //         'X-BAPI-TIMESTAMP': this.params.timestamp.toString(),
        //     //         'X-BAPI-RECV-WINDOW': this.params.recv_window,
        //     //         'Content-Type': 'application/json'
        //     //     }
        //     //     // todo: sign: this.createSignature()
        //     // }
        // });

    }

    generateHmacSignature(params, secret) {
        // Sort the parameters alphabetically
        const sortedParams = Object.keys(params).sort().map(key => `${key}=${params[key]}`).join('&');

        // Concatenate the sorted parameters with the secret key
        const concatenatedString = `${sortedParams}${secret}`;

        // Generate the HMAC SHA256 signature
        return crypto.createHmac('sha256', secret).update(concatenatedString).digest('hex');
    }

    async generateClient() {
        try {
            const response
                = await axios.get('https://api.bybit.com/v5/market/time', {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                console.log(response.status);

                const currentTimeStamp = Date.now();
                const timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000; // Offset in milliseconds
                const utcTimeStamp = currentTimeStamp - timezoneOffset;
                console.log(utcTimeStamp);

                const timestamp = response.data.time//.result.timeSecond // Math.floor(Date.now() / 1000).toString()

                console.log({
                    delta: timestamp - RECV_WINDOW,
                    now: Date.now(),
                    delta1000: (timestamp + 1000)
                });

                // 1716741422277
                // 1716741432594
                // 1716741433277

                console.log({time: response.data});
                console.log({timestamp});
                console.log({now: Date.now()});

                // 1716736970957
                // 1716736971116

                // 1716737062435
                // 1716737062598

                // const client0 = new RestClientV5({
                //     testnet: false,
                //     key: API_KEY,
                //     secret: PRIVATE_KEY,
                //     recv_window: RECV_WINDOW,
                //     enable_time_sync: true,
                //     syncTimeBeforePrivateRequests: true
                // })

                //const ts = await client0.fetchServerTime()

                const params = {
                    api_key: API_KEY,
                    timestamp: timestamp + "",//Math.floor(ts).toString(),//Math.floor(Date.now()/1000).toString(),
                    recv_window: RECV_WINDOW
                }
                
                //console.log({ts});
                //console.log({ts2: Math.floor(ts)});

                const client = new RestClientV5({
                    testnet: false,
                    key: API_KEY,
                    secret: PRIVATE_KEY,
                    recv_window: RECV_WINDOW,
                    enable_time_sync: false,
                    syncTimeBeforePrivateRequests: false,

                    //1716736738380759985
                    //1716736836155
                    //1716736738
                    //1716736738637
                    //1716736738530
                }, {
                    headers: {
                        'X-BAPI-API-KEY': params.api_key,
                        'X-BAPI-SIGN': this.getSignature(null, PRIVATE_KEY),
                        'X-BAPI-SIGN-TYPE': '2',
                        'X-BAPI-TIMESTAMP': params.timestamp,
                        'X-BAPI-RECV-WINDOW': params.recv_window + "",
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                });

                await (async () => {
                    try {
                        const res = await client.getWalletBalance({accountType: 'UNIFIED'});

                        console.log('response: ', JSON.stringify(res, null, 2));
                    } catch (e) {
                        console.error('request failed: ', e);
                    }
                })();



                return client
            } else {
                console.error(`Request failed with status ${response.status}`);
            }
        } catch (error) {
            console.error(error);
        }

        return undefined
        // {"retCode":0,"retMsg":"OK","result":{"timeSecond":"1716724176","timeNano":"1716724176319684150"},"retExtInfo":{},"time":1716724176319}
    }

    generateSignature(apiKey, secretKey, params) {
        const sortedParams = Object.entries(params).sort();
        let paramStr = '';
        sortedParams.forEach(([key, value]) => {
            if (paramStr!== '') paramStr += '&';
            paramStr += `${encodeURIComponent(key)}=${encodeURIComponent(value + '')}`;
        });

        // Include apiKey, timestamp, and recv_window in the signature base string
        const baseString = `${apiKey}${paramStr}`;

        // Generate the signature
        const hmac = crypto.createHmac('sha256', secretKey);
        hmac.update(baseString);
        const signature = hmac.digest('hex');

        return signature;
    }

    createSignature(data) {
        const sortedData = Object.keys(data).sort().map(key => `${key}=${data[key]}`).join('&');
        return crypto.createHmac('sha256', PRIVATE_KEY).update(sortedData).digest('hex');
    }

    getSignature(parameters, secret) {
        return crypto.createHmac('sha256', secret).update(
            Date.now().toString() + API_KEY + RECV_WINDOW + parameters
        ).digest('hex');
    }

    get client() {
        return this.client_
    }

    getHello(): string {
        return 'Hello World!';
    }
}
