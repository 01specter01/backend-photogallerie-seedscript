// Nach der Überprüfung im Controller, haben wir uns entschieden,
// die Validierung auszulagern und eigene Middlewares daraus zu machen.
// Diese Middlewares prüfen nun wie die Lösung im Controller den req.body.
// Hier haben wir jetzt aber alles übersichtlicher gebündelt
// und können die Middlewares im Router vor den Controllers einbinden.

export const validatePost = (req, res, next) => {
    if (!req.body.price > 0) {
        return res.status(400).json("please provide price over 0");
    }
    // email und username sind gegeben

    if (!req.body.date > 0) {
        return res.status(400).json("date is required");
    }
    // email ist länger als 0 Zeichen lang

    if (!req.body.url.includes("http") || req.body.url.includes("www")) {
        return res.status(400).json("url must include http or www");
    }
    // email enthält ein @-Zeichen

    if (!req.body.theme.length > 0) {
        return res.status(400).json("theme is required");
    }
    // username ist länger als 0 Zeichen lang

    next();
};

export const validatePut = () => {};
export const validateDelete = () => {};
