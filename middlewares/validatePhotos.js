// Nach der Überprüfung im Controller, haben wir uns entschieden,
// die Validierung auszulagern und eigene Middlewares daraus zu machen.
// Diese Middlewares prüfen nun wie die Lösung im Controller den req.body.
// Hier haben wir jetzt aber alles übersichtlicher gebündelt
// und können die Middlewares im Router vor den Controllers einbinden.

export const validatePost = (req, res, next) => {
    if (!req.body.price > 0) {
        return res.status(400).json("please provide price over 0");
    }
    // price is more than 0

    if (!req.body.date > "2022-01-23T20:34:55+00:00") {
        return res.status(400).json("date is required");
    }
    // date is later than 1. january 2022

    if (!req.body.url.includes("http") || req.body.url.includes("www")) {
        return res.status(400).json("url must include http or www");
    }
    // url includes www or http

    if (!req.body.theme.length > 0) {
        return res.status(400).json("theme is required");
    }
    // theme length is greater than 0

    next();
};

export const validatePut = () => {};
export const validateDelete = () => {};
