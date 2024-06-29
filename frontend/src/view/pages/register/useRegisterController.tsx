import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SignupParams } from "../../../app/services/authService/signup";
import { useMutation } from "react-query";
import { authService } from "../../../app/services/authService";
import { useAuth } from "../../../hooks/useAuth";
import { toast } from "react-toastify";

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z
    .string()
    .min(1, { message: "E-mail is required" })
    .email("Please provide a valid email"),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, "Password must contain at least 8 digits"),
});

type FormData = z.infer<typeof schema>;

export function useRegisterController() {
  const {
    handleSubmit: hookFormSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isLoading } = useMutation({
    mutationKey: ["signup"],
    mutationFn: async (data: SignupParams) => {
      return authService.signup(data);
    },
  });

  const { signin } = useAuth();

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data);

      signin(accessToken);
    } catch {
      toast.error("An error occurred while creating your account!");
    }
  });

  return { register, errors, handleSubmit, isLoading };
}
