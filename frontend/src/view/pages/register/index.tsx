import { IoEyeSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";

// Components
import { Input } from "../../components/inputs/Input";
import Button from "../../components/buttons/Button";
import { useRegisterController } from "./useRegisterController";
import { Link } from "react-router-dom";

export function Register() {
  const { register, handleSubmit, errors, isLoading } = useRegisterController();

  return (
    <div className="flex w-full md:w-1/2 flex-col p-8 md:ml-28">
      <h2 className="flex mb-6 text-2xl font-medium text-indigo-950">
        Sign up
      </h2>
      <form className="flex w-full max-w-xs flex-col" onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Enter user name"
          label="Name"
          error={errors.name?.message}
          {...register("name")}
          icon={<FaUser className="text-2xl text-gray-500" />}
        />
        <Input
          type="email"
          placeholder="Enter email"
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

        <a href="#" className="flex mb-8 text-sm text-gray-500 ">
          Forgot password?
        </a>
        <Button type="submit" isLoading={isLoading}>
          Create your account
        </Button>
      </form>

      <div className="py-5">
        <p className="text-sm text-indigo-950">
          If you have an account
          <Link to="/login" className="ml-1 text-indigo-900 font-semibold">
            Sign in here!
          </Link>
        </p>
      </div>
    </div>
  );
}
