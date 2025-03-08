import { Button } from "@/components/ui/button";
import { RequestData } from "@/types/dataTypes";
import Image from "next/image";
import React from "react";

interface RequestCardProps {
  data: RequestData;
}

const RequestCard: React.FC<RequestCardProps> = ({ data }) => {
  return (
    <div className="w-full p-4 bg-white rounded-md shadow-md border flex justify-between items-center gap-12">
      <div className="flex  gap-3 items-center">
        <div className="w-20 h-20">
          <Image
            alt=""
            width={200}
            height={200}
            className="w-full h-full object-cover"
            src={"https://avatar.iran.liara.run/public/11"}
          />{" "}
        </div>
        <div>
          <p>{`${data.fromUserId.firstName} ${data.fromUserId.lastName}`}</p>
          <p>{`${data.fromUserId.designation}`}</p>
        </div>
      </div>
      <div className="flex gap-4">
        <Button className="bg-green-700 hover:bg-green-800">Accept</Button>
        <Button variant={"destructive"}>Reject</Button>
      </div>
    </div>
  );
};

export default RequestCard;
