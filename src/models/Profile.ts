import mongoose, { model, models, Schema } from "mongoose";

interface IProfile extends mongoose.Document {
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  grantId: string;
}

const ProfileSchema = new Schema<IProfile>({
  email: { type: String, required: true, unique: true },
  username: { type: String, unique: true },
  firstname: { type: String, required: false },
  lastname: { type: String, required: false },
  grantId: { type: String },
});

export const ProfileModel =
  models?.Profile || model<IProfile>("Profile", ProfileSchema);
