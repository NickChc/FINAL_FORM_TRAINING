import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "@src/Providers/GlobalProvider";
import { TAuthStage_Enum, useAuthContext } from "@src/Providers/AuthProvider";

export function Header() {
  const { setOpenRegister, setOpenLogIn } = useGlobalContext();
  const { authStage, logOut } = useAuthContext();

  const authorizedView = useMemo(() => {
    if (authStage === TAuthStage_Enum.AUTHORIZED) {
      return (
        <button
          className="p-[.8rem] cursor-pointer outline-none "
          onClick={logOut}
        >
          LOG OUT
        </button>
      );
    } else if (authStage === TAuthStage_Enum.UNAUTHORIZED) {
      return (
        <>
          <button
            className="outline-none p-[.5rem] text-[.6rem] sm:text-[.9rem] cursor-pointer border-solid border border-black rounded-lg hover:border-[blue] hover:text-[blue] duration-100 "
            onClick={() => {
              setOpenRegister(true);
            }}
          >
            REGISTER
          </button>
          <button
            className="whitespace-nowrap outline-none p-[.5rem] text-[.6rem] sm:text-[.9rem] cursor-pointer border-solid border border-black rounded-lg hover:border-[blue] hover:text-[blue] duration-100 "
            onClick={() => setOpenLogIn(true)}
          >
            LOG IN
          </button>
        </>
      );
    } else if (authStage === TAuthStage_Enum.PENDING) {
      return <h1>LOADING...</h1>;
    }
  }, [authStage]);

  return (
    <header className="text-[.6rem] sm:text-[1rem] flex flex-col sm:flex-row items-center justify-between p-3 bg-slate-500 sticky top-0 border-solid border border-slate-800 border-x-0 border-t-0">
      <h1 className="whitespace-nowrap">FAKE WEBSITE</h1>
      <div className="w-[40%] flex justify-around items-center ">
        <Link
          className="hidden sm:block text-[1.2rem] sm:text-[1.6rem] font-semibold text-slate-200 no-underline hover:text-slate-300 "
          to={"/"}
        >
          HOME
        </Link>
        <div className="flex gap-x-3 ">{authorizedView}</div>
      </div>
      <nav className="flex justify-around items-center sm:hidden mt-3  ">
        <Link
          className="text-[1.2rem] sm:text-[1.6rem] font-semibold text-slate-200 no-underline hover:text-slate-300 "
          to={"/"}
        >
          HOME
        </Link>
      </nav>
    </header>
  );
}
