const locate = async (ip) => {
    try {
        const response = await fetch(`http://ip-api.com/json/${ip}`);
        return response.json();
    } catch(err) {
        console.error("[ERR LOG] Error occured while fetching location from ip-api.com", err);
    }
}

module.exports = {
    locate
};