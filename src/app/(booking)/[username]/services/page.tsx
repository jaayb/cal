import React from "react";

import { EventTypeModel } from "@/models/EventType";
import { ProfileModel } from "@/models/Profile";
import mongoose from "mongoose";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

type PageProps = {
  params: {
    username: string;
  };
};

export default async function BookingPage(props: PageProps) {
  await mongoose.connect(process.env.MONGODB_URI as string);
  const profile = await ProfileModel.findOne({
    username: new RegExp(`^${props.params.username}$`, "i"),
  });

  if (!profile) {
    return "404";
  }

  const eventTypes = await EventTypeModel.find({
    email: profile.email,
  });

  console.log("🚀🚀🚀 etDoc", eventTypes);
  if (!eventTypes) {
    return "404";
  }
  return (
    <div>
      {eventTypes.map((et) => (
        <div key={et.id} className="block p-2 border-b">
          <Card className={cn("w-[380px]")}>
            <CardHeader>
              <CardTitle>Service: {et.title}</CardTitle>
              <CardDescription>{et.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                <Link
                  href={
                    "http://" +
                    process.env.NEXT_PUBLIC_URL +
                    "/" +
                    profile.username +
                    "/" +
                    et.uri
                  }
                >
                  Book Appointment
                </Link>
              </p>
            </CardContent>
            <CardFooter>
              <p>{et.length} min</p>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
}
