import {Body, Controller, Inject, Logger, OnModuleInit, Post} from "@nestjs/common";
import {HttpService} from "@nestjs/axios";
import {AxiosResponse} from "axios";
import {RabbitMQService} from "../rabbitmq/rmq.service";
import {AMQ_DIRECT, ROUTING_KEY} from "../rabbitmq/rmq.common";
import {flattenObject} from "../flat";

const parallel = require('run-parallel');

export const HandlerId = {
    GetPairs: "1",
    IsHoneypotCoin: "2",
    IsHoneypotCoinFlatten: "3",
}

@Controller('ScamCheck')
export class ScamCheckController {
    private _urlHoneypotIs = 'https://api.honeypot.is/'
    private _routingKey = 'ms.scam-coin.'
    @Inject()
    private readonly rabbitMQService: RabbitMQService
    constructor(
        // https://docs.nestjs.com/techniques/http-module
        private readonly httpService: HttpService
    ) {
    }

    get urlHoneypotIs() {
        return this._urlHoneypotIs
    }
    get routingKey() {
        return this._routingKey
    }
    
    algo = async (
        msg: any,
    ) => {
        console.log(msg);
    }
    /*
    {
    "statusCode": 500,
    "message": "Internal server error"
}
     */

    // https://curlconverter.com/node-axios/

    @Post('honeypot/GetPairs')
    async getPairs(@Body() body: { address: string, chainId: string }): Promise<AxiosResponse<any[]>> {
        const response = await this.httpService.axiosRef.get(this.urlHoneypotIs + 'v1/GetPairs', {
            params: {
                'address': body.address,
                'chainID': body.chainId
            }
        });
        const data = response.data
        const routingKey = this.routingKey + 'getPairs'
        await this.rabbitMQService.amqpConnection.publish(AMQ_DIRECT, routingKey, {
            "id": HandlerId.GetPairs,
            "routingKey": routingKey,
            "body": data[0] // TODO: Array to CLickhouse Quote err: CANNOT_PARSE_QUOTED_STRING ???
        })
        return data
    }
    // https://www.npmjs.com/package/@normalizex/honeypot-is
    // https://docs.honeypot.is/topholders#get-top-holders
    @Post('honeypot/TopHolders')
    async getTopHolders(@Body() body: { address: string, chainId: string }): Promise<AxiosResponse<any[]>> {
        const response = await this.httpService.axiosRef.get(this.urlHoneypotIs + 'v1/TopHolders', {
            params: {
                'address': body.address,
                'chainID': body.chainId
            }
        });
        Logger.error(response.data);
        return response.data
    }

    @Post('honeypot/IsHoneypot')
    async isHoneypot(@Body() body: { address: string, pair: string }): Promise<AxiosResponse<any[]>> {
        const response = await this.httpService.axiosRef.get(this.urlHoneypotIs + 'v2/IsHoneypot', {
            params: {
                'address': body.address,
                'pair': body.pair
            }
        });
        //Logger.debug(response.data);
        return response.data
    }
    // old ver 0
    @Post('honeypot/IsHoneypotCoin')
    async isHoneypotCoin(@Body() body: { address: string, chainId: string }): Promise<AxiosResponse<any[]>> {
        //const routingKey = this.routingKey + 'getPairs'


        const data = await this.getPairs({ address: body.address, chainId: body.chainId })
        const pairAddr = data[0].Pair.Address
        const response = await this.isHoneypot({ address: body.address, pair: pairAddr })
        console.log("-".repeat(10));
        Logger.error(response);

        const routingKey = this.routingKey + 'IsHoneypotCoin'

        await this.rabbitMQService.amqpConnection.publish(AMQ_DIRECT, routingKey, {
            "id": HandlerId.IsHoneypotCoin, // TODO: rename to step ???
            "routingKey": routingKey,
            "body": response // TODO: Array to Clickhouse Quote err: CANNOT_PARSE_QUOTED_STRING ???
        })

        return response
    }
    // new ver 1
    @Post('honeypot/IsHoneypotCoinFlatten')
    async isHoneypotCoinFlatten(@Body() body: { address: string, chainId: string }): Promise<AxiosResponse<any[]>> {
        //const routingKey = this.routingKey + 'getPairs'

        const data = await this.getPairs({ address: body.address, chainId: body.chainId })
        console.log('pair data:');
        console.log(data);
        const pairAddr = data[0].Pair.Address
        const response = await this.isHoneypot({ address: body.address, pair: pairAddr })
        console.log("-".repeat(10));

        const flatten: any = await flattenObject(response)
        Logger.error(flatten);

        const routingKey = this.routingKey + 'IsHoneypotCoin' + '.Flatten'

        parallel([
            async () => {
                await this.rabbitMQService.amqpConnection.publish(AMQ_DIRECT, routingKey, {
                    "id": HandlerId.IsHoneypotCoinFlatten, // TODO: rename to step ???
                    "routingKey": routingKey,
                    "body": flatten // TODO: Array to Clickhouse Quote err: CANNOT_PARSE_QUOTED_STRING ???
                })
            },
            async () => this.algo(flatten)
        ]);

        return response
    }
}