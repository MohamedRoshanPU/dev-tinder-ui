import React, { PropsWithChildren } from "react";
import Header from "../pageComponents/containers/Header";
import BottomBar from "../pageComponents/containers/BottomBar";
import Footer from "../pageComponents/containers/Footer";

const BaseLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="w-full h-[calc(100vh-16vh)] bg-green-50 overflow-y-auto px-4 py-8">
        {children}
      </main>
      <BottomBar />
      <Footer />
    </div>
  );
};

export default BaseLayout;
