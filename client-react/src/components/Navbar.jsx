import { Search } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/authContext";
import { useStateContext } from "../contexts/web3";

export default function Navbar() {
  const { user, setUser } = useAuthContext();
  const { setSearch } = useStateContext();

  const naviagte = useNavigate();

  const [searchVal, setSearchVal] = useState("");
  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(searchVal);
    naviagte("/search");
  };

  return (
    <nav className="flex flex-col md:flex-row gap-2 justify-between items-center py-2 ">
      <Link to="/" className="logo text-white text-3xl font-bold">
        logo
      </Link>
      <Link to={"/search"} className="underline">
        Filter All Arts
      </Link>
      <div className="nav-btns flex flex-col gap-4 md:flex-row md:gap-2">
        <div className="input_group ">
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex w-full gap-2 items-center "
          >
            <input
              type="text"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className="w-fill p-2 rounded-md bg-slate-700 text-white hover:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
            />
            <button type="submit">
              <Search color="white" />
            </button>
          </form>
        </div>
        <div className="auth flex gap-2 text-black">
          {user?.wallet ? (
            <>
              <Link
                to={"/dashboard"}
                className="bg-lime-400 w-24 text-center font-bold p-2 rounded-md"
              >
                Dashboard
              </Link>
              <button
                className="bg-red-400 w-24 text-center font-bold p-2 rounded-md"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to={"signin"}
                className="bg-indigo-600 w-24 font-bold p-2 text-center rounded-md "
              >
                Sign in
              </Link>
              <Link
                to={"signup"}
                className="bg-slate-300 w-24 text-center font-bold p-2 rounded-md "
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
