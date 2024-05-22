export const App = {
    analysis: {
        port: 3000,
        logger: true
    },
    other: {

    },
}
export type App = typeof App[keyof typeof App]