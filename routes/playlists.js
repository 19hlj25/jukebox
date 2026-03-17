import express, { Router } from "express";
import {
  getPlaylists,
  getPlaylistById,
  createPlaylist,
  getTracksByPlaylistId
} from "#db/queries/playlists";
import { addTrackToPlaylist } from "#db/queries/playlists_tracks";
import { getTrackById } from "db/queries/tracks";

const router = express.Router();


router.get("/", async (req, res) => {
    const playlists = await getPlaylists();
    res.send(playlists)
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
   
    if (isNaN(id)) {
        return res.status(400).send("Id must be a number");
    }


    const playlist = await getPlaylistById(id);

    if (!playlist){
        return res.status(404).send("Playlist not found");
    }

    res.send(playlist);
});

router.post("/", async (req, res, next) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).send("Request body required");
    }

    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).send("Missing required fields");
    }

    const playlist = await createPlaylist(name, description);
    return res.status(201).send(playlist);
  } catch (err) {
    next(err);
  }
});

router.get("/:id/tracks", async (req, res) => {
  const { id } = req.params;
    if (isNaN(id)) {
    return res.status(400).send("Id must be a number");
  }
  const playlist = await getPlaylistById(id);
  if (!playlist) {
    return res.status(404).send("Playlist not found");
  }
  const tracks = await getTracksByPlaylistId(id);

  res.send(tracks);
});




router.post("/:id/tracks", async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).send("Request body required");
    }

    const { trackId } = req.body;

    if (isNaN(id)) {
      return res.status(400).send("Playlist id must be a number");
    }

    if (trackId === undefined) {
      return res.status(400).send("Missing trackId");
    }

    if (isNaN(trackId)) {
      return res.status(400).send("trackId must be a number");
    }

    const playlist = await getPlaylistById(id);
    if (!playlist) {
      return res.status(404).send("Playlist not found");
    }

    const track = await getTrackById(trackId);
    if (!track) {
      return res.status(400).send("Track does not exist");
    }

    const playlistTrack = await addTrackToPlaylist(id, trackId);
    return res.status(201).send(playlistTrack);
  } catch (err) {
    if (err.code === "23505") {
      return res.status(400).send("Track already in playlist");
    }
    next(err);
  }
});

export default router;