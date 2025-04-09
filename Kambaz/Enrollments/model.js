import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("Enrollments", schema);
export default model;