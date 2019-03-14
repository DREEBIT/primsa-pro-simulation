function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

export default (): number => {
    return parseFloat(`${Math.floor(getRandomArbitrary(100, 999)) / 100}e-${Math.floor(getRandomArbitrary(7, 14))}`);
};
