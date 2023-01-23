import Ajv from "ajv";
// ajv is activated sice it has already been installed

const ajv = new Ajv({ allErrors: true });
// ajv is executed

const validate = (schema) => {
    const test = ajv.compile(schema);
    

    return (req, res, next) => {
        const valid = test(req.body);
        if (!valid) return res.status(400).json(test.errors);
        next();
    };
};
export default validate;
/*
validate function with schema which is a json format. 
test variable compiles so that the following code can catch errors
if no errors the req will be displayed

*/