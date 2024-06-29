import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { z } from "zod";
import { SigninParams } from "../../../app/services/authService/signin";
import { authService } from "../../../app/services/authService";
import { useAuth } from "../../../hooks/useAuth";
import { toast } from "react-toastify";

const schema = z.object({
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

export function useLoginController() {
  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isLoading } = useMutation({
    mutationKey: ["signin"],
    mutationFn: async (data: SigninParams) => {
      return authService.signin(data);
    },
  });

  const { signin } = useAuth();

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data);
      signin(accessToken);
    } catch {
      toast.error("Invalid credentials!");
    }
  });

  return { register, handleSubmit, errors, isLoading };
}
