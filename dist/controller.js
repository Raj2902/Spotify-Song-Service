import { asyncHandler } from "./middleware/asyncHandler.js";
import { sql } from "./config/db.js";
import { AppError } from "./utils/AppError.js";
import { redisClient } from "./config/redis.js";
export const getAllAlbums = asyncHandler(async (req, res) => {
    let albums;
    const CACHE_EXPIRY = 1800;
    if (redisClient.isReady) {
        albums = await redisClient.get("albums");
    }
    if (albums) {
        console.log("Cache hit");
        res.status(200).json(JSON.parse(albums));
    }
    else {
        console.log("Cache miss");
        albums = await sql `
      SELECT * FROM albums
      `;
        if (redisClient.isReady) {
            await redisClient.set("albums", JSON.stringify(albums), {
                EX: CACHE_EXPIRY,
            });
        }
        res.status(200).json(albums);
    }
});
export const getAllSongs = asyncHandler(async (req, res) => {
    let songs;
    const CACHE_EXPIRY = 1800;
    if (redisClient.isReady) {
        songs = await redisClient.get("songs");
    }
    if (songs) {
        console.log("Cache hit");
        res.status(200).json(JSON.parse(songs));
    }
    else {
        console.log("Cache miss");
        songs = await sql `
      SELECT * FROM songs
      `;
        if (redisClient.isReady) {
            await redisClient.set("songs", JSON.stringify(songs), {
                EX: CACHE_EXPIRY,
            });
        }
        res.status(200).json(songs);
    }
});
export const getAllSongsOfAlbum = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const CACHE_EXPIRY = 1800;
    let album, songs, cacheData;
    if (redisClient.isReady) {
        cacheData = await redisClient.get(`album_songs_${id}`);
    }
    if (cacheData) {
        console.log("cache hit");
        res.status(200).json(JSON.parse(cacheData));
    }
    else {
        album = await sql `SELECT * FROM albums WHERE id = ${id}`;
        if (album.length === 0) {
            throw new AppError("No album with this id", 404);
        }
        songs = await sql `SELECT * FROM songs WHERE album_id = ${id}`;
        const response = { songs, album: album[0] };
        if (redisClient.isReady) {
            await redisClient.set(`album_songs_${id}`, JSON.stringify(response), {
                EX: CACHE_EXPIRY,
            });
        }
        console.log("cache miss");
        res.status(200).json(response);
    }
});
export const getSingleSong = asyncHandler(async (req, res) => {
    const song = await sql `SELECT * FROM songs WHERE id=${req.params.id}`;
    res.status(200).json(song[0]);
});
//# sourceMappingURL=controller.js.map