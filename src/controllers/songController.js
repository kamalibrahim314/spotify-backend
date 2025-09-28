import { v2 as cloudinary } from "cloudinary";
import songModel from "../models/songModel.js";
import { sanitizeTextInput } from "../utils/sanitize.js";

const addSong = async (req, res) => {
    try {
        let { name, desc, album } = req.body;
        const { image, audio } = req.files;
        const audioUpload = await cloudinary.uploader.upload(audio[0].path, { resource_type: "video" });
        const imageUpload = await cloudinary.uploader.upload(image[0].path);
        const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(audioUpload.duration % 60)}`;

        name = sanitizeTextInput(name)
        desc = sanitizeTextInput(desc)
        album = sanitizeTextInput(album)

        const song = await songModel.create({
            name,
            desc,
            album,
            image: {
                secure_url: imageUpload.secure_url,
                public_id: imageUpload.public_id
            },
            audio: {
                secure_url: audioUpload.secure_url,
                public_id: audioUpload.public_id
            },
            duration,
        });

        res.status(201).json({
            success: true,
            message: "Song added successfully",
            song
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}
const ListSongs = async (req, res) => {
    try {
        const allSongs = await songModel.find({});

        res.status(200).json({
            success: true,
            message: "All Songs",
            allSongs
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}
const albumSongs = async (req, res) => {
    try {
        const { id } = req.params;
        const albumSongs = await songModel.find({ album: id }).populate("album");
        if (!albumSongs) {
            return res.status(404).json({
                success: false,
                message: "Album songs not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Album Songs",
            albumSongs
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

const removeSong = async (req, res) => {
    try {
        const { id } = req.params;
        // delete this song from cloudinary and database
        const song = await songModel.findById(id);
        await cloudinary.uploader.destroy(song.image.public_id);
        await cloudinary.uploader.destroy(song.audio.public_id, { resource_type: "video" });
        await songModel.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Song deleted successfully",
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

export { addSong, ListSongs, albumSongs, removeSong };