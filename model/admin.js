import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  firstName: String,
  email: String,
  password: String,
});

export default mongoose.models.user|| mongoose.model("user", AdminSchema);
