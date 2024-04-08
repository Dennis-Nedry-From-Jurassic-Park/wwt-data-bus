export const Model = {
    data: 'data',
    logs: 'logs',
    errors: 'errors',
    // 4byte
    signatures: '4byte.signatures',
    eventsignatures: '4byte.eventsignatures',

}

export type Model = typeof Model[keyof typeof Model]