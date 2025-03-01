import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BriefcaseBusiness } from "lucide-react";
import Image from "next/image";
import React from "react";

const FeedCard = () => {
  return (
    <>
      <Card className="overflow-hidden">
        <CardHeader className="p-0">
          <Image
            alt=""
            width={200}
            height={200}
            className="w-full h-[250px] object-cover"
            src={"/dummy-profile.jpg"}
          />
        </CardHeader>
        <CardContent className="max-h-[250px] overflow-y-auto px-3">
          <div className="flex gap-2 my-2">
            <h2 className="text-lg font-semibold">
              Hrithwik Roshan <span>,</span> <span>45</span>
            </h2>
            <Badge variant={"outline"}>Male</Badge>
          </div>
          <div className="flex gap-2 my-2 items-center">
            <Badge variant={"outline"}>
              <BriefcaseBusiness className="w-4 h-4" />
            </Badge>
            <h2 className="text-xs italic">Actor</h2>
          </div>
          <div className="flex gap-2 flex-wrap my-2">
            <Badge className="rounded-full" variant={"outline"}>
              Action
            </Badge>
            <Badge className="rounded-full" variant={"outline"}>
              Action
            </Badge>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default FeedCard;
