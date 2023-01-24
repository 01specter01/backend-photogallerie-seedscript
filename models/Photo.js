import mongoose from "mongoose";
import Album from "./Album.js";

const equipment = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        sensor: {
            type: String,
            required: true,
        },
        lensMount: {
            type: String,
            required: true,
        },
        manufacturer: {
            type: String,
        },
    },
    { _id: false }
);
const setting = new mongoose.Schema(
    {
        focalLength: {
            type: Number,
            min: 18,
            max: 55,
            required: true,
        },
        exposure: {
            type: Number,
            required: true,
            validate: {
                validator: (v) => {
                    const val = v.Number > +(1 / 6000) && v.Number <= 600;
                    return val;
                },
                message: "exposure value is not possible",
            },
        },
        aperture: {
            type: Number,
            required: true,
            validate: {
                validator: (v) => {
                    const val = v.Number >= 3000 && v.Number <= 10000;
                    return val;
                },
                message: "aperture value is not possible",
            },
        },
        iso: {
            type: Number,
            required: true,
            validate: {
                validator: (v) => {
                    const val = v.Number >= 100 && v.Number <= 25000;
                    return val;
                },
                message: "iso value is not possible",
            },
        },
        whiteBalance: {
            type: Number,
            validate: {
                validator: (v) => {
                    const val = v.Number >= 3000 && v.Number <= 4000;
                    return val;
                },
                message: "white balance value is not possible",
            },
        },
    },
    { _id: false }
);
const schema = new mongoose.Schema(
    {
        price: Number,
        date: {
            type: Date,
            default: Date.now(),
        },
        url: {
            type: String,
            validate: {
                validator: (v) => {
                    const val = v.startsWith("http") || v.startsWith("www");
                    return val;
                },
                message: "Bitte übergebe eine richtige URL",
            },
            required: true,
            unique: true,
        },
        theme: String,
        equipment: [equipment],
        setting: {
            type: setting,
        },
        album: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Album",
        },
    },
    {
        versionKey: false,
    }
);

//Model: Photo -> Collection: photos
const Photo = mongoose.model("Photo", schema);

export const create = async ({ price, date, url, theme }) => {
    // Erforderliche Daten nicht übergeben haben
    // Falscher Datentyp
    // Duplikat
    const newPhoto = new Photo({ price, date, url, theme });
    const result = await newPhoto.save();
    return result;
};

export const getAll = async () => {
    /**
     * Der Rückgabetyp von find() ist ein Array
     */
    const photos = await Photo.find().populate("album");
    return photos;
};

export const getOne = async (photoId) => {
    /**
     * Analog zu find() gibt es auch die Funktion findOne(), die uns nur ein einzigen Eintrag zurück gibt.
     * So bekommen wir anstatt einem Array ein Objekt
     * wenn wir nichts in die Klammern schreiben, dann bekommen wir den ersten Eintrag in der Liste.
     * Deswegen übergeben wir ein Objekt in das wir schreiben wonach wir filtern wollen. Dazu morgen mehr
     * Wenn wir also nur einen bestimmten Eintrag möchten, dann identifizieren wir ihn über seine ID
     * wir sagen also findOne({_id: <id-nach-der-wir-suchen>}).
     *
     * Mongoose hat für den spezifischen Fall von findOne und filter nach Id die Methode findById(), der wir die
     * ID ohne Objekt übergeben können.
     */
    //const photo = await Photo.findOne({_id: photoId})

    const photo = await Photo.findById(photoId);

    return photo;
};

export const updateOne = async (photoId, data) => {
    /**
     * findById kann direkt weiterverwendet werden um einen Eintrag zuändern. Dafür wird das
     * Objekt erst mit der gefunden und dann geändert: finde mit id und ändere -> find by id and update
     * Dafür übergeben wir erst die id, dann ein Objekt mit allem was wir ändern wollen.
     * Optional können wir noch Optionen geben. Eine davon ist new. Wenn wir new auf true setzen wird der
     * geänderte Eintrag zurück gegeben. Ansonsten ist der false und der EIntrag vor Änderung wird zurück gegeben
     * Ob ihr den neuen oder das alten EIntrag möchtet kommt ganz darauf an, was ihr mit den Daten machen wollt.
     */
    const photo = await Photo.findByIdAndUpdate(photoId, data, {
        new: true,
        /** Die Validatoren unseres Schema (unique, required und unsere erstellten) wendet mongoose nur
         * beim Erstellen an. Wenn wir möchten, dass auch bei updates und replaces die Eingabe überprüft wird,
         * müssen wir in den Optionen runValidators auf true setzen.
         * */
        runValidators: true,
    });

    return photo;
};

export const replaceOne = async (photoId, data) => {
    const photo = await Photo.findOneAndReplace(
        {
            _id: photoId,
        },
        data,
        {
            //returnDocument: "after" hat den selben Effekt wie new: true. Ich schätze legacy code, dass zwei verschiedene genutzt werden
            returnDocument: "after",
            runValidators: true,
        }
    );
    return photo;
};

export const deleteOne = async (photoId) => {
    /**
     * Wie findByIdAndUpdate gibt es auch findByIdAndDelete zum löschen.
     * Hier müssen wir aber nur die ID von dem Eintrag übergeben, den wir löschen möchten
     */
    const photo = await Photo.findByIdAndDelete(photoId);

    return photo;
};
export default Photo;
