import mongoose from "mongoose";

const enrollmentsSchema = new mongoose.Schema({
    _id: String,
    user: String,
    course: String
});

export default enrollmentsSchema;