let requestCount = 0;

export const requestCounter = (req, res, next) => { // store in db?
    requestCount++;
    console.log(`Total requests: ${requestCount}`);
    next();
};
