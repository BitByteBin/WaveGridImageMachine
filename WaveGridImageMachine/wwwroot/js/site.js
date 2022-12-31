// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

function bin2dec(binStr) {
    const lastIndex = binStr.length - 1;

    return Array.from(binStr).reduceRight((total, currValue, index) => (
        (currValue === '1') ? total + (BigInt(2) ** BigInt(lastIndex - index)) : total
    ), BigInt(0));
}

function dec2bin(x) {
    let bin = 0;
    let rem, i = 1, step = 1;
    while (x != 0) {
        rem = x % 2;
        console.log(
            `Step ${step++}: ${x}/2, Remainder = ${rem}, Quotient = ${parseInt(x / 2)}`
        );
        x = parseInt(x / 2);
        bin = bin + rem * i;
        i = i * 10;
    }
    console.log(`Binary: ${bin}`);
}

function int2bin(number, res = "") {
    if (number < 1)
        if (res === "") return "0"
        else
            return res
    else return int2bin(Math.floor(number / 2), number % 2 + res)
}
