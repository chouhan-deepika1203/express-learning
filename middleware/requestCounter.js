let requestCount = 0;

export const requestCounter = (req, res, next) => {
    requestCount++;
    console.log(`Total requests: ${requestCount}`);
    next();
};