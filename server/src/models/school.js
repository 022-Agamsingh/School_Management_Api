import mongoose from "mongoose";

const schoolSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    latitude: {
        type: Number,
        required: true,
        min: -90,
        max: 90
    },
    longitude: {
        type: Number,
        required: true,
        min: -180,
        max: 180
    }
}, {
    timestamps: true // This will add createdAt and updatedAt fields
});

// Add index for geospatial queries (optional, for better performance)
schoolSchema.index({ latitude: 1, longitude: 1 });

const School = mongoose.model("School", schoolSchema);
export default School;
