export class Portfolio {
    constructor() {

    }

    calculatePNL = (exitPrice, amountSold, entryPrice, amountBought, fees) => {
        const pnl = (exitPrice * amountSold) - (entryPrice * amountBought) - fees;
        console.log({pnl});
        return pnl;
    }

//     const exitPrice = 35; // Selling price
//     const amountSold = 1; // Amount sold
//     const entryPrice = 30; // Buying price
//     const amountBought = 1; // Amount bought
//     const fees = 0.01; // Assuming a 1% fee
//
//     const pnlResult = calculatePNL(exitPrice, amountSold, entryPrice, amountBought, fees);
//     console.log(`PNL: ${pnlResult}`);

}