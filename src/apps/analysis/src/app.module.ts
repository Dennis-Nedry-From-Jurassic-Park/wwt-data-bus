import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {Hex} from "../../../bot/utils/hex";
import {ClickHouseClient, ClickHouseModule} from "@depyronick/nestjs-clickhouse";
import {defaultOptions} from "../../../db/clickhouse/config";
import {Provider} from "../../../bot/provider";
import {PriceOracle} from "../../../bot/price-oracle";

@Module({
    imports: [
        ClickHouseModule.register(defaultOptions)
    ],
    controllers: [AppController],
    providers: [
        AppService,
        Hex,
        ClickHouseClient,
        Provider,
        PriceOracle
    ],
})
export class AppModule {
}
