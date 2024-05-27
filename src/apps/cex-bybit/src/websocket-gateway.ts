import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from '@nestjs/websockets';
import {Inject, Logger} from '@nestjs/common';
import {WebsocketClient} from 'bybit-api';
import {ws_options} from "./config";
import {wsTopics} from "./topics";
import {Socket} from "socket.io";
import {token} from "../../../db/clickhouse/config";
import {ClickHouseClient} from "@depyronick/nestjs-clickhouse";
import {BybitTemp} from "./dto";


// TODO: https://announcements.bybit.com/article/introducing-new-api-feature-websocket-order-placement-blt9d3dc36eff27f1c1/
@WebSocketGateway()
export class BybitWebSocketGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server;

    private readonly logger = new Logger(BybitWebSocketGateway.name);

    private messages = []

    private counter = 0

    private thresholds = []


    // private observableArray = ko.observableArray([]);
    //
    // arrayLengthGreaterThanFive = ko.computed(function() {
    //     return this.observableArray().length > 5;
    // });
    //
    // // Step: Create a computed observable
    // checkArrayLength = ko.computed(function() {
    //     // Check if the array's length is greater than 1
    //     if (this.observableArray().length > 1) {
    //         // Execute your function here
    //         console.log("Array length is greater than 1.");
    //
    //
    //     }
    // });

    // private readonly logger_: Logger
    //
    // get logger() {
    //     return this.logger_
    // }



    constructor(
        @Inject(token)
        private clickHouseClient: ClickHouseClient
    ) {
        process.on('SIGINT', () => {
            console.log('Received SIGINT, starting graceful shutdown...');
            if(this.messages.length > 0) {
                this.counter += this.messages.length
                this.clickHouseClient.insert<BybitTemp>(
                    "wwt.bybit_temp", this.messages
                ).subscribe({
                    error: (err: any): void => {
                        console.error({err});
                    },
                });
            }
            this.messages = []
            // Perform cleanup tasks here
            console.log({c: this.counter});
            process.exitCode = 0;
        });
        // this.logger_ = new Logger(
        //     BybitWebSocketGateway.name, { timestamp: true }
        // );
        const ws = new WebsocketClient(
            ws_options,
            //logger
        );

        ws.subscribeV5(wsTopics, 'spot');

        ws.on('response', function incoming(data) {
            //const message = JSON.parse(data);
            console.log({data});
            //this.logger.log({data})
        });

        /*
        data: {
    type: 'snapshot',
    topic: 'kline.1.ARBUSDT',
    data: [ [Object] ],
    ts: 1716652320285,
    wsKey: 'v5SpotPublic'
  }


         data: {
      start: 1716652320000,
      end: 1716652379999,
      interval: '1',
      open: '1.2',
      close: '1.2',
      high: '1.2',
      low: '1.2',
      volume: '0',
      turnover: '0',
      confirm: false,
      timestamp: 1716652320285
    }

         */

        ws.on('update', (data) => {
            const msg = {
                timestamp: data.ts,
                router: data.topic,
                data: data,
                version: 5
            }
            //console.log({data});
            //console.log({d: data.data});

            this.messages.push(msg)
            //console.log(this.messages.length);
            if(this.messages.length > 100) {

                this.counter += this.messages.length
                this.clickHouseClient.insert<BybitTemp>(
                    "wwt.bybit_temp", this.messages
                ).subscribe({
                    error: (err: any): void => {
                        console.error({err});
                    },
                    complete: (): void => {
                        // called when insert is completed
                    },
                });
                this.messages = []
            }

            //this.server.emit('bybitUpdate', data); // Emit the update to connected clients
        });

        ws.on('open', ({ wsKey, event }) => {
            this.logger.log(`Connected to Bybit WebSocket with ID: ${wsKey}`);
        });

        ws.on('close', () => {
            this.logger.log('Disconnected from Bybit WebSocket');
        });

        ws.on('error', (err) => {
            this.logger.error('Error occurred:', err);
        });
    }

    @SubscribeMessage('connect')
    handleConnect(client: Socket): void {
        this.logger.log(`Client connected: ${client.id}`);
    }

    @SubscribeMessage('message')
    handleMessage(client: any, payload: any): void {
        console.log(payload.data);
    }

    @SubscribeMessage('disconnect')
    handleDisconnect(client: Socket): void {
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    handleConnection(client: any, ...args: any[]): any {
    }

    afterInit(server: any): any {
        this.logger.log("Initialized");
    }




}
