import {Module} from '@nestjs/common';
import {ScamCheckController} from "./scam.check.controller";
import {HttpModule} from "@nestjs/axios";
import {ScamCheckService} from "./scam.check.service";

@Module({
    imports: [HttpModule],
    controllers: [ScamCheckController],
    providers: [ScamCheckService],
    exports: [],
})
export class ScamCheckModule {}