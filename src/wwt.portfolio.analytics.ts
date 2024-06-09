import {Decimal} from "decimal.js";

const exec = async () => {
    const list = require('./wwt.bal3.json').result.list

    const totalEquity = list[0].totalEquity
    const totalAvailableBalance = list[0].totalAvailableBalance
    const totalWalletBalance = list[0].totalWalletBalance

    const table = []

    for (const coin of list[0].coin) {
        table.push(
            {
                equity: new Decimal(totalEquity).toSD(7, 2),
                available: new Decimal(totalAvailableBalance).toSD(7, 2),
                //twb: new Decimal(totalWalletBalance).toSD(6, 2),
                //availableBalancePercent: new Decimal(totalAvailableBalance / totalEquity * 100).toSD(3),
                coin: coin.coin,
                percent: new Decimal(coin.usdValue / totalEquity * 100).toSD(3),
                equity_: coin.equity,
                usdValue: coin.usdValue,
                walletBalance: coin.walletBalance,
            }
        )
    }

    const totalPercent = table
        .map(it => it.percent)
        .reduce((acc: Decimal, curr: Decimal) => acc.add(curr), new Decimal(0));

    const totalAvailableBalancePercent = new Decimal(totalAvailableBalance / totalEquity * 100)

    const coinsPercent: Decimal = table
        .map(it => it.percent)
        .reduce((acc: Decimal, curr: Decimal) => acc.add(curr), new Decimal(0))
        .minus(totalAvailableBalancePercent);

    console.log({
        totalPercent: totalPercent,
        totalAvailableBalancePercent: totalAvailableBalancePercent,
        coinsPercent: coinsPercent,
    });
    console.table(table);
}
exec();