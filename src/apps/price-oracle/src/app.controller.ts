import {Controller, Get, Post, Req} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('price-oracle')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/priceRateConversion')
  async priceRateConversion(@Req() req): Promise<string> {
    const body = req.body;
    return await this.appService.priceRateConversion(body.address);
  }
}
