import {Hex} from "./utils/hex";

export class Base {
    private readonly hex_: Hex;

    constructor() {
        this.hex_ = new Hex();

    }

    get hex() {
        return this.hex_;
    }
}