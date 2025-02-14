const useragentCleaner = (useragent) => {
    if(useragent) {
        return Object.fromEntries(
            Object.entries(useragent).filter(([key, value]) => value !== false && key !== 'source')
        );
    } else {
        return {};
    }
}

module.exports = {
    useragentCleaner
};