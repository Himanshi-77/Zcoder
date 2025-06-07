// app/ClientLayout.jsx
"use client";

import { usePathname } from "next/navigation";
import Navbar from "./components/ui/Navbar";

const ClientLayout = ({ children }) => {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith("/user/login") || pathname.startsWith("/user/signup");

  return (
    <>
      {!isAuthPage && <Navbar />}
      <main className="min-h-screen">{children}</main>
    </>
  );
};

export default ClientLayout;