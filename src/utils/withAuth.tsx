"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const AuthComponent = (props: P) => {
    const router = useRouter();
    const token = Cookies.get("token");

    useEffect(() => {
      if (!token) {
        router.replace("/login");
      }
    }, [token]);

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
