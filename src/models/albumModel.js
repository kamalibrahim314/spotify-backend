import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, },
    desc: { type: String, required: true, trim: true, },
    bgColor: { type: String, required: true, trim: true, },
    image: {
        secure_url: { type: String, required: true, trim: true, },
        public_id: { type: String, required: true, trim: true, },
    },
    // artist: { type: String, required: true, trim: true, },
});

const AlbumModel = mongoose.models.Album || mongoose.model("Album", albumSchema);

export default AlbumModel;