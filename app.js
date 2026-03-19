import express from "express";
const app = express();

app.use(express.json());

import playlistsRouter from "./routes/playlists.js";
app.use("/playlists", playlistsRouter);

import tracksRouter from "./routes/tracks.js";
app.use("/tracks", tracksRouter);

export default app;