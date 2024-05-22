import {ClickHouseModuleOptions} from "@depyronick/nestjs-clickhouse/clickhouse.module";

export const token = 'DEFAULT_SERVER'

export const defaultOptions: ClickHouseModuleOptions[] = [
    {
        name: token, // ANALYTICS_SERVER
        host: '127.0.0.1',
        port: 8123,
        password: '',
    },
]