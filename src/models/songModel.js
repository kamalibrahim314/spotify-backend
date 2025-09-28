import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, },
    desc: { type: String, required: true, trim: true, },
    album: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Album",
        required: true
    },
    image: {
        secure_url: { type: String, required: true, trim: true, },
        public_id: { type: String, required: true, trim: true, },
    },
    audio: {
        secure_url: { type: String, required: true, trim: true, },
        public_id: { type: String, required: true, trim: true, },
    },
    duration: { type: String, required: true, trim: true, },

},
    { timestamps: true }
);

const songModel = mongoose.models.Song || mongoose.model("Song", songSchema);

export default songModel;