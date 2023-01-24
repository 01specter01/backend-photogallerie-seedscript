function log(req, res, next) {
    console.log(req.method, req.url);
    next();
}

export default log;

// to display used methode (get,put,patch,delete) and parth eg ID used
