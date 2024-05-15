export const Model = {
    data: 'data',
    logs: 'logs',
    errors: 'errors',
    // 4byte
    etherface_signatures: 'etherface.signatures',
    fourbyte_signatures: '4byte.signatures',
    fourbyte_eventsignatures: '4byte.eventsignatures',

    mock: 'mock',
}

export type Model = typeof Model[keyof typeof Model]