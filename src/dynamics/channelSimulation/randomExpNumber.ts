function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

export default (randomNeg?: boolean): number => {
    let pre = "";
    if (randomNeg) {
        pre = Math.floor(getRandomArbitrary(0, 1)) ? "-" : "";
    }
    return parseFloat(`${pre}${Math.floor(getRandomArbitrary(100, 999)) / 100}e-${Math.floor(getRandomArbitrary(7, 14))}`);
};
