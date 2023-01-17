console.log("run seed script");
import { faker } from "@faker-js/faker";
import Photo from "./models/Photo.js";
import "./lib/connect_db.js";
import dotenv from "dotenv";
dotenv.config();

const deleteAll = async () => {
    return await Photo.deleteMany();
};

const createPhoto = async () => {
    // 1 Datensatz erzeugen:
    const photo = new Photo({
        title: faker.lorem.sentences(1),
        description: faker.lorem.sentences(),
        url: faker.image.imageUrl(undefined, undefined, undefined, true),
    });

    // Datensätze in DB speichern
    await photo.save();
    // 1 Datensatz erzeugen:
    const equipment = new Photo({
        name: faker.lorem.sentences(1),
        type: faker.lorem.sentences(),
        sensor: faker.lorem.sentences(1),
        lensMount: faker.lorem.sentences(1),
        manufacturer: faker.lorem.sentences(),
    });

    // Datensätze in DB speichern
    await equipment.save();
};

const createFake = async (count = 20) => {
    for (let i = 0; i < count; i++) {
        console.log("creating photo: ", i + 1);
        await createPhoto();
    }
};

try {
    // Collections leeren (deleteMany())
    if (!process.argv.includes("doNotDelete")) {
        console.log("deleting all records...");
        await deleteAll();
        console.log("done");
    }

    // 100 Datensätze laut Schema erzeugen (einzelne Objekte, die als Documents gespeichert werden)
    console.log("creating new fakedata...");

    const count =
        process.argv[2] === "doNotDelete" ? undefined : process.argv[2];
    await createFake(count);
    console.log("done");

    console.log("seeding finished. happy coding!");
    process.exit(0);
} catch (error) {
    console.error(error);
    process.exit(1);
}
