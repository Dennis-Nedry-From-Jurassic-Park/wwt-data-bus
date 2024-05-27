import {Controller, Get, Inject, Post, Req} from '@nestjs/common';
import {AppService} from './app.service';
import {token} from "../../../db/clickhouse/config";
import {ClickHouseClient} from "@depyronick/nestjs-clickhouse";
import {BybitTemp} from "./dto";

@Controller('bybit')
export class AppController {
    constructor(
        private readonly appService: AppService,
        @Inject(token)
        private clickHouseClient: ClickHouseClient
    ) {

    }

    // TODO: getOpenInterest getHistoricOrders

    /*
        {
            "accountType": "UNIFIED"
        }
     */
    @Post('getWalletBalance')
    async getWalletBalance(@Req() req): Promise<any> {
        console.log(req.body);
        return await this.appService.client.getWalletBalance(req.body);
    } // TODO https://bybit-exchange.github.io/docs/v5/account/wallet-balance

    // https://github.com/tiagosiebler/bybit-api/blob/master/examples/rest-v5-private.ts
    @Post('submitOrder')
    async order(@Req() req): Promise<any> {
        const balance_before_deal =
            await this.appService.client.getWalletBalance(req.body);
        const body = req.body
        const orderResult = await this.appService.client.submitOrder({
            category: body.category,
            symbol: body.symbol,
            orderType: body.orderType,
            qty: body.qty,
            side: body.side,
            price: body.price,
        });
        const orderDetails = await this.appService.client.getActiveOrders({
            category: body.category,
            orderId: orderResult.result.orderId
        });

        this.clickHouseClient.insert<BybitTemp>(
            "wwt.bybit_temp", [
                {
                    timestamp: Date.now(),
                    router: 'getWalletBalance',
                    data: balance_before_deal,
                    version: 5
                },
                {
                    timestamp: Date.now(),
                    router: `submitOrder.${body.category}.${body.orderType}.${body.side}.${body.qty}`,
                    data: orderResult,
                    version: 5
                },
                {
                    timestamp: Date.now(),
                    router: `getActiveOrders.${body.category}.${orderResult.result.orderId}`,
                    data: orderDetails,
                    version: 5
                }
            ]
        ).subscribe({
            error: (err: any): void => {
                console.error({err});
            },
        });

        return orderResult;
    }
}
