import db from "#db/client";

export async function addTrackToPlaylist(playlist_id, track_id) {
  const sql = `
    INSERT INTO playlists_tracks (playlist_id, track_id)
    VALUES ($1, $2)
    RETURNING *;
  `;

  const { rows: [playlistTrack] } = await db.query(sql, [playlist_id, track_id]);
  return playlistTrack;
}

export async function getTracksByPlaylistId(id) {
  const sql = `
    SELECT tracks.*
    FROM tracks
    JOIN playlists_tracks
    ON tracks.id = playlists_tracks.track_id
    WHERE playlists_tracks.playlist_id = $1;
  `;

  const { rows } = await db.query(sql, [id]);
  return rows;
}

