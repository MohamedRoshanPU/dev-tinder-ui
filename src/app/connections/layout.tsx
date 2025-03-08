import BaseLayout from "@/components/layout/BaseLayout";
import React, { PropsWithChildren } from "react";

const layout: React.FC<PropsWithChildren> = ({ children }) => {
  return <BaseLayout>{children}</BaseLayout>;
};

export default layout;
