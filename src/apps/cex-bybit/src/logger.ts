import {DefaultLogger} from "bybit-api";

export const logger = {
    ...DefaultLogger,
    silly: (...params) => console.log('silly', ...params),
};