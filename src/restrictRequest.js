function restrictRequest(req, res, next) {
    try {
        let queue = [req.body];
        let containsNull = false;

        while (queue.length > 0) {
            let currentNode = queue.shift();

            for (let key in currentNode) {
                if (currentNode.hasOwnProperty(key)) {
                    let value = currentNode[key];

                    if (value === null || value === undefined || (typeof value === "number" && isNaN(value))) {
                        containsNull = true;
                        break;
                    }

                    if (typeof value === "object" && value !== null && value !== undefined && value !== NaN) {
                        queue.push(value);
                    }
                }
            }

            if (containsNull) {
                return res.status(422).json({
                    statusCode: 422,
                    msg: "Request Contains Null or Undefined Value",
                });
            }
        }

        next();
    } catch (err) {
        return res.status(500).json({
            statusCode: 500,
            msg: "Something went wrong",
            stack: process.env.NODE_ENV !== "production" ? err.stack : null,
        });
    }
}

module.exports = restrictRequest;
