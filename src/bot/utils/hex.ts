// https://www.rapidtables.com/convert/number/hex-to-decimal.html

export class Hex {
    constructor() {
    }

    // hex_to_number Number("0x65e0fdc3");

    to_datetime = (
        hex: `0x${string}`,
    ) => {
        return new Date(Number(hex) * 1000)
    }

    to_datetime_rev2 = (
        hex: `0x${string}`,
    ) => { // "0x65e0fdc3"
        const timeInSeconds = parseInt(hex, 16);

        const timeInMilliseconds = timeInSeconds * 1000;

        const dateTime = new Date(timeInMilliseconds);

        return dateTime
    }

}