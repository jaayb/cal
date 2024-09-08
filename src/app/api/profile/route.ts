import { session } from "@/libs/session";
import { ProfileModel } from "@/models/Profile";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

export async function PUT(req: NextRequest) {
  await mongoose.connect(process.env.MONGODB_URI as string);
  const body = await req.json();
  console.log("🚀🚀🚀Body: ", body);
  const { username, firstname, lastname } = body;
  const email = await session().get("email");
  console.log("🚀🚀🚀Username: ", username);
  console.log("🚀🚀🚀firstname: ", firstname);
  console.log("🚀🚀🚀lastname: ", lastname);
  console.log("🚀🚀🚀email: ", email);
  if (email && username) {
    const profileDoc = await ProfileModel.findOne({ email });
    if (profileDoc) {
      console.log("🚀🚀🚀ProfileDoc: ", profileDoc);
      profileDoc.username = username;
      profileDoc.firstname = firstname;
      profileDoc.lastname = lastname;
      await profileDoc.save();
    } else {
      console.log("🚀🚀🚀create doc ");
      await ProfileModel.create({ email, username, firstname, lastname });
    }
    return Response.json(true);
  } else {
    return Response.json(false);
  }
}
