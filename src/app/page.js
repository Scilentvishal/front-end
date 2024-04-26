"use client";
import { isLogin, logout } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const authenticate = async () => {
      const loggedIn = await isLogin();
      console.log(loggedIn)
      if (loggedIn) {
       setUser(loggedIn);
      } else {
        router.push("/login");
      }
    };

    authenticate()
  }, []);

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <main className="px-4  h-screen grid place-items-center">
      <div className="p-4 w-[400px] h-[250px] text-center space-y-4">
        <h3>Hi {user?.email}, welcome {user?.name} </h3>
        <button
          className="bg-red-500 px-4 py-2 text-white"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </main>
  );
}
