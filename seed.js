import { faker } from "@faker-js/faker";
import Photo from "./models/Photo.js";
import Album from "./models/Album.js";
import "./lib/connect_db.js";
import dotenv from "dotenv";

dotenv.config();
console.log("run seed script");

const deletePhotos = async () => {
    return await Photo.deleteMany();
};

const deleteAlbums = async () => {
    return await Album.deleteMany();
};

const albums = [];

const createEquipment = () => ({
    name: faker.lorem.sentences(1),
    type: faker.lorem.sentences(1),
    sensor: faker.lorem.sentences(1),
    lensMount: faker.lorem.sentences(1),
    manufacturer: faker.lorem.sentences(1),
});

const createSetting = () => ({
    focalLength: faker.datatype.number({ min: 18, max: 55 }),
    exposure: faker.datatype.number({ min: 100, max: 600 }),
    aperture: faker.datatype.number({ min: 3000, max: 6000 }),
    iso: faker.datatype.number({ min: 100, max: 25000 }),
    whiteBalance: faker.datatype.number({ min: 1000, max: 4000 }),
});

const createPhoto = async () => {
    // 1 Datensatz erzeugen:
    const photo = new Photo({
        price: faker.commerce.price(),
        date: faker.date.past(),
        url: faker.image.imageUrl(undefined, undefined, undefined, true),
        theme: faker.lorem.sentences(),
        equipment: createEquipment(),
        setting: createSetting(),
        album: albums[0],
    });

    // Datensätze in DB speichern
    await photo.save();
    // // 1 Datensatz erzeugen:
    // const equipment = new Photo({
    //     name: faker.lorem.sentences(1),
    //     type: faker.lorem.sentences(),
    //     sensor: faker.lorem.sentences(1),
    //     lensMount: faker.lorem.sentences(1),
    //     manufacturer: faker.lorem.sentences(),
    // });

    // // Datensätze in DB speichern
    // await equipment.save();
};

const createAlbum = async () => {
    const album = new Album({
        albumName: faker.database.collation(),
    });
    const result = await album.save();
    albums.push(result._id);
};

const createPhotos = async (count = 20) => {
    for (let i = 0; i < count; i++) {
        console.log("creating photos: ", i + 1);
        await createPhoto();
    }
};
const createAlbums = async (count = 20) => {
    for (let i = 0; i < count / 4; i++) {
        console.log("creating album: ", i + 1);
        await createAlbum();
    }
};
// const createFake = async (count = 20) => {
//     for (let i = 0; i < count; i++) {
//         console.log("creating photo: ", i + 1);
//         await createPhoto();
//     }
// };

try {
    // Collections leeren (deleteMany())
    if (!process.argv.includes("doNotDelete")) {
        console.log("deleting all records...");
        await deletePhotos();
        await deleteAlbums();
        console.log("done");
    }

    // 100 Datensätze laut Schema erzeugen (einzelne Objekte, die als Documents gespeichert werden)
    console.log("creating new fakedata...");
    const count =
        process.argv[2] === "doNotDelete" ? undefined : process.argv[2];
    await createAlbums(count);
    console.log(albums);
    await createPhotos(count);
    console.log("done");

    console.log("seeding finished. happy coding!");
    process.exit(0);
} catch (error) {
    console.error(error);
    process.exit(1);
}
