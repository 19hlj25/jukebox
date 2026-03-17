import db from "#db/client";
import { createTrack } from "./queries/tracks.js";
import { createPlaylist } from "./queries/playlists.js";
import { addTrackToPlaylist } from "./queries/playlists_tracks.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const tracks = [];
  const playlists = [];

  for (let i = 0; i < 20; i++) {
    const track = await createTrack(
      `Track ${i + 1}`,
      180000 + i * 10000
    );
    tracks.push(track);
  }

  for (let i = 0; i < 10; i++) {
    const playlist = await createPlaylist(
      `Playlist ${i + 1}`,
      `Description ${i + 1}`
    );
    playlists.push(playlist);
  }

  for (let i = 0; i < 15; i++) {
    await addTrackToPlaylist(
      playlists[i % playlists.length].id,
      tracks[i].id
    );
  }
};