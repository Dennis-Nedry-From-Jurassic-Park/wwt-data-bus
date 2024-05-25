import { SubscribeMessage, WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { WebsocketClient } from 'bybit-api';
import {ws_options} from "./config";
import {logger} from "./logger";
import {wsTopics} from "./topics";
import {Socket} from "socket.io";

@WebSocketGateway()
export class BybitWebSocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server;

    private logger: Logger = new Logger(BybitWebSocketGateway.name);

    constructor() {
        const API_KEY = 'your_api_key_here';
        const PRIVATE_KEY = 'your_private_key_here';

        const wsConfig = {
            key: API_KEY,
            secret: PRIVATE_KEY,
            market: 'v5',
        };

        const ws = new WebsocketClient(
            ws_options,
            logger
        );
        ws.subscribeV5(wsTopics, 'spot');

        ws.on('update', (data) => {
            this.server.emit('bybitUpdate', data); // Emit the update to connected clients
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

    @SubscribeMessage('disconnect')
    handleDisconnect(client: Socket): void {
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    handleConnection(client: any, ...args: any[]): any {
    }
}
