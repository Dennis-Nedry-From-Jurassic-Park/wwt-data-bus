import {Controller, Get, Post, Req} from '@nestjs/common';
import { AppService } from './app.service';

@Controller("analytics")
export class AppController {
  constructor(private readonly appService: AppService) {}

  // TODO -------------------------------- HEX --------------------------------

  @Post('/hex')
  getHex(): any {
    return this.appService.getHex();
  }

  // TODO -------------------------------- ERC --------------------------------

  @Post('/address/isERC20') // https://abitype.dev/guide/getting-started
  isERC20(@Req() req): any { // Coin erc-20-abi
    const body = req.body;

    return this.appService.isERC20(body.address);
  }

  @Post('/address/isERC721')
  isERC721(@Req() req): any {
    const body = req.body;

    return this.appService.isERC721(body.address);
  }

  @Post('/test')
  test(@Req() req): any {
    const body = req.body;

    return this.appService.test();
  }

  @Post('/fetch')
  fetch(@Req() req): any {
    const body = req.body;

    return this.appService.fetch();
  }

}
