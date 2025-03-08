import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserData } from "@/types/dataTypes";
import { BriefcaseBusiness } from "lucide-react";
import Image from "next/image";
import React from "react";

interface FeedCardProps {
  data: UserData | undefined;
  showData: boolean;
}

const FeedCard: React.FC<FeedCardProps> = ({ data, showData }) => {
  return (
    <>
      <Card className="overflow-hidden">
        <CardHeader className="p-0">
          <Image
            alt=""
            width={200}
            height={200}
            className="w-full h-[250px] object-cover"
            src={"https://avatar.iran.liara.run/public/11"}
          />
        </CardHeader>
        <CardContent className="max-h-[250px] overflow-y-auto px-3">
          {showData ? (
            <>
              <div className="flex gap-2 my-2">
                <h2 className="text-lg font-semibold">
                  {`${data?.firstName} ${data?.lastName}`} <span>,</span>{" "}
                  <span>{data?.age}</span>
                </h2>
                <Badge variant={"outline"}>{data?.gender}</Badge>
              </div>
              <div className="flex gap-2 my-2 items-center">
                <Badge variant={"outline"}>
                  <BriefcaseBusiness className="w-4 h-4" />
                </Badge>
                <h2 className="text-xs italic">{data?.designation}</h2>
              </div>
              <div className="flex gap-2 flex-wrap my-2">
                {data?.skills?.map((skill: string, i: number) => {
                  return (
                    <Badge
                      key={`skill-${i}`}
                      className="rounded-full"
                      variant={"outline"}
                    >
                      {skill}
                    </Badge>
                  );
                })}
              </div>
            </>
          ) : (
            <p className="flex justify-center items-center py-10">
              No Users Found
            </p>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default FeedCard;
