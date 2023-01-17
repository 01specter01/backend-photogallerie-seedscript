import mongoose from "mongoose";

// Um Authors nicht mehrfach/redundant in der Datenbank zu speichern,
// nehmen wir sie als SubDocuments aus den Reports heraus
// und legen sie in einer eigenen Collection ab.
// Hierfür erstellen wir ein neues Model, welches einen einzelnen Author beschreibt.
const schema = new mongoose.Schema(
    {
        albumName: {
            type: String,
            required: true,
        },
    },
    {
        versionKey: false,
    }
);

const Album = mongoose.model("Album", schema);

export default Album;
