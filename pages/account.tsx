import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/router";

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
      Account : {user?.email}
      <button
        onClick={logout}
        className={"bg-red-500 rounded-xl text-white font-semibold"}
      >
        Logout
      </button>
    </div>
  );
};
export default Account;
