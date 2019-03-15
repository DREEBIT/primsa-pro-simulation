function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

export default (randomNeg?: boolean): number => {
    let pre = "";
    if (randomNeg) {
        pre = getRandomArbitrary(0, 1) > 0.5 ? "-" : "";
    }
    return parseFloat(`${pre}${Math.floor(getRandomArbitrary(100, 999)) / 100}e-${Math.floor(getRandomArbitrary(7, 14))}`);
};
