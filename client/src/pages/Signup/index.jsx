import { useForm } from "react-hook-form";
import Button from "@/components/ui/Button";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterMutation } from "@/redux/services/authApi";

const schema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Это поле обязательно" })
    .email({ message: "Неправильная почта" }),
  password: z
    .string()
    .min(6, { message: "Пароль должен быть не менее 6 символов" }),
});

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const [registerUser] = useRegisterMutation();

  const handleRegister = async (data) => {
    try {
      const response = await registerUser({
        name: "test13",
        surname: "Doe",
        username: "dhhajkas",
        email: data.email,
        password: data.password,
      });

      if (response.data) {
        enqueueSnackbar({ message: "User registered successfully" }, "success");
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <div className="flex flex-col items-center bg-white shrink-0 w-[650px] py-[52px] px-[90px] mx-auto mb-[5rem] shadow-2xl p-6 rounded-3xl">
      <h1 className="font-bold text-[38px] text-[#333333] mb-12">
        Регистрация
      </h1>
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="w-full flex flex-col">
        <div className="mb-10">
          <div className="flex justify-between items-center">
            <label
              htmlFor="email"
              className="ml-[2px] text-[#333333] text-2xl text-left self-start mb-[3px]">
              Ваш E-mail
            </label>
            {errors.email && (
              <p className="text-[#FF0000] font-medium text-lg leading-8 self-start">
                {errors.email.message}
              </p>
            )}
            {error && (
              <p className="text-[#FF0000] font-medium text-lg leading-8 self-start">
                {error}
              </p>
            )}
          </div>
          <input
            {...register("email")}
            type="text"
            id="email"
            className="w-full border-[#C0E3E5] solid border-[2.8px] rounded-[20px] px-7 py-3 text-[#979797] text-2xl"
          />
        </div>
        <div className="mb-10">
          <div className="flex justify-between items-center">
            <label
              htmlFor="password"
              className="ml-[2px] text-[#333333] text-2xl text-left self-start mb-[3px]">
              Ваш Пароль
            </label>
            {errors.password && (
              <p className="text-[#FF0000] font-medium text-lg leading-8 self-start">
                {errors.password.message}
              </p>
            )}
          </div>
          <input
            {...register("password")}
            type="password"
            id="password"
            className="w-full border-[#C0E3E5] solid border-[2.8px] rounded-[20px] px-7 py-3 text-[#979797] text-2xl appearance-none"
          />
        </div>
        <Button className="mb-[10px] self-center" disabled={isSubmitting}>
          Зарегистрироваться
        </Button>
      </form>
      <Link
        to="/login"
        className="text-[#979797] leading-8 cursor-pointer disabled:cursor-not-allowed">
        Уже есть аккаунт?{" "}
        <span className="font-bold capitalize underline">Войти</span>
      </Link>
    </div>
  );
};

export default Signup;