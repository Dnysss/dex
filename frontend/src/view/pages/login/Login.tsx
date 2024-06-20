import { useState } from "react";
import Character from "./../../../../public/background.png";

import { IoEyeSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";

// Components
import Input from "../../components/inputs/Input";
import Button from "../../components/buttons/Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <div className="flex w-full max-w-4xl">
          {/* Left side */}
          <div className="relative flex w-full md:w-1/2 flex-col items-center justify-center p-8">
            <div className="flex flex-col items-start justify-center">
              <h1 className="mb-4 text-4xl font-semibold text-indigo-950">
                Sign in to
              </h1>
              <p className="mb-5 text-sm font-medium text-indigo-400">
                Coordinate tasks, projects and details of your work, in a simple
                and automated way.
              </p>
              <div className="w-56">
                <p className="mb-6 text-sm text-indigo-950">
                  If you don't have an account register
                  <a
                    href="#"
                    className="ml-1 text-indigo-900 font-semibold"
                  >
                    Register here!
                  </a>
                </p>
              </div>
            </div>
            <div className="absolute top-56 -right-28 hidden md:block">
              <img src={Character} alt="Character" className="w-72 h-auto" />
            </div>
          </div>

          {/* Right side */}
          <div className="flex w-full md:w-1/2 flex-col p-8 md:ml-28">
            <h2 className="flex mb-6 text-2xl font-medium text-indigo-950">
              Sign in
            </h2>
            <form className="flex w-full max-w-xs flex-col">
              <Input
                id="email"
                type="email"
                placeholder="Enter email or user name"
                label="Email"
                icon={<MdEmail className="text-2xl text-gray-500" />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                id="password"
                type="password"
                placeholder="Password"
                label="Password"
                icon={<IoEyeSharp className="text-2xl text-gray-500" />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <a
                href="#"
                className="flex justify-end mb-8 text-sm text-gray-500 "
              >
                Forgot password?
              </a>
              <Button type="submit">Login</Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
