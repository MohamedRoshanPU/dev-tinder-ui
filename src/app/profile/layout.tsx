import Footer from "@/components/pageComponents/containers/Footer";
import Header from "@/components/pageComponents/containers/Header";
import React, { PropsWithChildren } from "react";

const layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="w-full h-[calc(100vh-16vh)] bg-green-50 overflow-y-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default layout;
