export const Model = {
    data: 'data',
    logs: 'logs',
    errors: 'errors',
}

export type Model = typeof Model[keyof typeof Model]