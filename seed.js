console.log("run seed script");
import { faker } from "@faker-js/faker";
import Photo from "./models/Photo.js";
import "./lib/connect_db.js";
import dotenv from "dotenv";
dotenv.config();
const deleteAll = async () => {
    return await Photo.deleteMany();
};
const repeatedOutput = process.env.REP || 20;
const createPhoto = async () => {
    // 1 Datensatz erzeugen:
    const photo = new Photo({
        title: faker.lorem.sentences(1),
        description: faker.lorem.sentences(),
        url: faker.image.imageUrl(undefined, undefined, undefined, true),
    });

    // Datensätze in DB speichern
    await photo.save();
};

const createFake = async (count = 1) => {
    for (let i = 0; i < count; i++) {
        console.log("creating photo: ", i + 1);
        await createPhoto();
    }
};

try {
    // Collections leeren (deleteMany())
    await deleteAll();

    // 100 Datensätze laut Schema erzeugen (einzelne Objekte, die als Documents gespeichert werden)
    await createFake(repeatedOutput);

    process.exit(0);
} catch (error) {
    console.error(error);
    process.exit(1);
}
