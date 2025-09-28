import { v2 as cloudinary } from "cloudinary";
import albumModel from "../models/albumModel.js";
import { sanitizeTextInput } from "../utils/sanitize.js";

const addAlbum = async (req, res) => {
    try {
        let { name, desc, bgColor } = req.body;
        let { secure_url, public_id } = await cloudinary.uploader.upload(req?.file?.path);

        name = sanitizeTextInput(name)
        desc = sanitizeTextInput(desc)
        bgColor = sanitizeTextInput(bgColor)

        const album = await albumModel.create({
            name,
            desc,
            bgColor,
            image: {
                secure_url,
                public_id
            }
        });
        res.status(201).json({ success: true, message: "Album added successfully", album });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

const ListAlbums = async (req, res) => {
    try {
        const allAlbums = await albumModel.find({});
        res.status(200).json({ success: true, message: "All Albums", allAlbums });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

const album = async (req, res) => {
    try {
        const { id } = req.params;
        const album = await albumModel.findById(id);
        res.status(200).json({ success: true, message: "Album", album });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

const removeAlbum = async (req, res) => {
    try {
        const { id } = req.params;
        const album = await albumModel.findById(id);
        await cloudinary.uploader.destroy(album.image.public_id);
        await albumModel.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Album deleted successfully" });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export { addAlbum, ListAlbums, removeAlbum, album };