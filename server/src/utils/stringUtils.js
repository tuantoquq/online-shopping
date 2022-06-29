const StringUtils = {};

StringUtils.generateProductCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let codes = '';
    for (let i = 0; i < process.env.PRODUCTS_CODE_LENGTH; i++) {
        codes += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return codes;
};

export default StringUtils;
