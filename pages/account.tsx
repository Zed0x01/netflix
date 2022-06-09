import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { AiOutlineLogin, AiFillHome } from "react-icons/ai";
import Link from "next/link";

const Account = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, []);
  return (
    <div>
      <Head>
        <title>Account Settings</title>
      </Head>
      <div className={"flex justify-between"}>
        <h1 className={"m-5 text-xl font-semibold"}>
          Email:{" "}
          <span className={"cursor-pointer ml-2 text-lg text-medium underline"}>
            {user?.email}
          </span>
        </h1>
        <div className={"m-5 flex items-center"}>
          <Link href={"/"} className={"cursor-pointer"}>
            <a>
              <AiFillHome
                className={
                  "w-7 transition duration-300 hover:text-red-400 rounded-xl text-red-500 h-7"
                }
              />
            </a>
          </Link>
          <button
            onClick={logout}
            className={"ml-2 text-red-500 rounded-xl text-white font-semibold"}
          >
            <AiOutlineLogin
              className={"w-7 transition duration-300 hover:text-red-400 h-7"}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Account;
