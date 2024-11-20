function cleanPayload(req, res, next) {
    try {
        const payload = req.body;
        const isEmptyObject = (obj) => Object.keys(obj).length === 0;

        const cleanArray = (arr) =>
            arr
                .filter((item) => {
                    if (typeof item === "string") {
                        return item.trim() !== "";
                    } else if (typeof item === "object" && item !== null) {
                        const cleanedItem = cleanObject(item);
                        return !isEmptyObject(cleanedItem);
                    }
                    return item !== null;
                })
                .map((item) => (typeof item === "object" ? cleanObject(item) : item));

        const cleanObject = (obj) => {
            const cleanedObj = {};
            for (const key in obj) {
                if (typeof obj[key] === "string") {
                    if (obj[key].trim() !== "") {
                        cleanedObj[key] = obj[key];
                    }
                } else if (Array.isArray(obj[key])) {
                    const cleanedArray = cleanArray(obj[key]);
                    if (cleanedArray.length > 0) {
                        cleanedObj[key] = cleanedArray;
                    }
                } else if (typeof obj[key] === "object" && obj[key] !== null) {
                    const cleanedNestedObj = cleanObject(obj[key]);
                    if (!isEmptyObject(cleanedNestedObj)) {
                        cleanedObj[key] = cleanedNestedObj;
                    }
                } else if (typeof obj[key] === "number") {
                    if (!isNaN(obj[key])) {
                        cleanedObj[key] = obj[key];
                    }
                } else if (obj[key] !== null) {
                    cleanedObj[key] = obj[key];
                }
            }
            return cleanedObj;
        };

        req.body = cleanObject(payload);
        next();
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            statusCode: 500,
            msg: "Something went wrong",
            stack: process.env.NODE_ENV !== "production" ? err.stack : null,
        });
    }
}

module.exports = cleanPayload;
