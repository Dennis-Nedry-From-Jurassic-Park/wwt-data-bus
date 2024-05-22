import { Injectable } from '@nestjs/common';
import {Hex} from "../../../bot/utils/hex";

@Injectable()
export class AppService {
  constructor(private readonly hex: Hex) {}

  getHex(): string {
    return this.hex.to_datetime('0x').toUTCString();
  }
}
