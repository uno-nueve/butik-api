import express, { Express, Request, Response } from "express";
import cors, { CorsOptions } from "cors";
import mongoose from "mongoose";

export const app: Express = express();
const corsOptions: CorsOptions = {
    origin: "*",
};

const albumSchema = new mongoose.Schema({
    title: String,
    artist: String,
});
const Album = mongoose.model("Album", albumSchema);

app.use(express.json());
app.use(cors(corsOptions));

app.get("/test", async (req: Request, res: Response) => {
    const albums = await Album.find();
    if (albums) {
        res.json(albums);
    } else {
        res.status(404).send({ message: "Error finding all albums" });
    }
});

app.post("/test", async (req: Request, res: Response) => {
    const newAlbum = { ...req.body };
    await Album.create(newAlbum);
    res.status(201).send({ message: "Successfully created album:", newAlbum });
});

app.get("/test/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    const album = await Album.findById(id);
    if (album) {
        res.status(200).send(album);
    } else {
        res.status(404).send({ message: "Error finding album" });
    }
});

app.all("*", (req: Request, res: Response) => {
    res.status(404).json({ error: `Route ${req.originalUrl} not found` });
});
