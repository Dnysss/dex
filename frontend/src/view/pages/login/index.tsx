import { IoEyeSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";

// Components
import { Input } from "../../components/inputs/Input";
import Button from "../../components/buttons/Button";
import { useLoginController } from "./useLoginController";
import { Link } from "react-router-dom";

export function Login() {
  const { register, handleSubmit, errors, isLoading } = useLoginController();

  return (
    <div className="flex w-full md:w-1/2 flex-col p-8 md:ml-28">
      <h2 className="flex mb-6 text-2xl font-medium text-indigo-950">
        Sign in
      </h2>

      <form className="flex w-full max-w-xs flex-col" onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Enter email or user name"
          label="Email"
          error={errors.email?.message}
          {...register("email")}
          icon={<MdEmail className="text-2xl text-gray-500" />}
        />

        <Input
          type="password"
          placeholder="Password"
          label="Password"
          error={errors.password?.message}
          {...register("password")}
          icon={<IoEyeSharp className="text-2xl text-gray-500" />}
        />

        <a href="#" className="flex justify-end mb-8 text-sm text-gray-500 ">
          Forgot password?
        </a>
        <Button type="submit" isLoading={isLoading}>
          Login
        </Button>
      </form>

      <div className="py-5">
        <p className="text-sm text-indigo-950">
          If you don't have an account
          <Link to="/register" className="ml-1 text-indigo-900 font-semibold">
            Register here!
          </Link>
        </p>
      </div>
    </div>
  );
}
