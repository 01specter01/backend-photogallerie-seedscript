// In dieser Datei beschreiben wir die Struktur der Request Bodies.
// Wir können mit Ajv - ähnlich wie in Mongoose Models - Schemas definieren.
// Die Form ist hier natürlich etwas anders, erfüllt aber den gleichen Zweck.
// Für jeden Endpoint richten wir ein eigenes Schema ein.
const equipment = {
    type: "array",
    items: {
        type: "object",
        properties: {
            name: { type: "string" },
            type: { type: "string" },
            sensor: { type: "string" },
            lensMount: { type: "string" },
            manufacturer: { type: "string" },
        },
        required: ["name", "type", "sensor", "lensMount"],
        additionalProperties: false,
    },
};
const setting = {
    type: "object",
    properties: {
        focalLength: { type: "number" },
        exposure: { type: "number" },
        aperture: { type: "number" },
        iso: { type: "number" },
        whiteBalance: { type: "number" },
    },
    required: ["focalLength", "exposure", "aperture", "iso"],
    additionalProperties: false,
};
/*
adding equipment and settings in photos.schema.js to variable to validate them in main schema under setttings, equipment
*/
export const postSchema = {
    type: "object",
    properties: {
        price: { type: "number" },
        date: { type: "string", format: "date" },
        url: { type: "string" },
        theme: { type: "string" },
        equipment,
        setting,
    },
    required: ["url"],
    additionalProperties: false,
};

// Da wir bei GET und DELETE keinen Body haben,
// können wir in der Validierung festlegen, dass dort nichts stehen darf.
// Durch die express.json() Middleware ist req.body immer ein Object.
// Somit können wir den type auf "object" setzen.
// Fügen wir jetzt noch die Property additionalProperties: false ein,
// Darf nichts in req.body übermittelt werden.
export const getSchema = {
    type: "object",
    additionalProperties: false,
};

export const deleteSchema = {
    type: "object",
    additionalProperties: false,
};
