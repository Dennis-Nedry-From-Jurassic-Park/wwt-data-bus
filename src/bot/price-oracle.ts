import {GeckoTerminalApiV2} from "./price-oracles/coingecko/geckoterminal-api-v2";

export class PriceOracle {
    private readonly geckoTerminalApiV2_: GeckoTerminalApiV2

    constructor() {
        this.geckoTerminalApiV2_ = new GeckoTerminalApiV2()
    }

    get geckoTerminalApiV2() {
        return this.geckoTerminalApiV2_;
    }

}

