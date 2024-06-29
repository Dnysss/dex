import { Outlet } from "react-router-dom";
import Character from "/background.png";
import Logo from "/logo.svg";

export function AuthLayout() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex w-full max-w-4xl h-3/4">
        <div className="relative flex w-full md:w-1/2 flex-col p-8">
          <div className="flex flex-col items-start justify-center py-4">
            <div className="mb-8">
              <img src={Logo} alt="Logo" className="w-28" />
            </div>

            <p className="mb-5 text-sm font-medium text-indigo-400">
              Coordinate tasks, projects and details of your work, in a simple
              and automated way.
            </p>
          </div>
          <div className="absolute top-36 -right-24 hidden md:block">
            <img src={Character} alt="Character" className="w-72 h-auto" />
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
