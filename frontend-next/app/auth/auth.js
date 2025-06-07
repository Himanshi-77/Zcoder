"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const auth = (Component) => {
  const Auth = (props) => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      const token = window.sessionStorage.getItem("token");
      if (!token) {
        router.replace("/user/login");
        return;
      }

      axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/getAuth`, {
          headers: { Authorization: `${token}` },
        })
        .then(() => {
          setLoading(false);
        })
        .catch(() => {
          router.replace("/user/login");
        });
    }, [router]);

    if (loading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <p className="text-gray-600 text-sm">Authenticating...</p>
        </div>
      );
    }

    return <Component {...props} />;
  };

  return Auth;
};

export default auth;
