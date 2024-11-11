import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoginBody, LoginBodyType } from "@/schema/auth.schema";
import { login } from "@/services/authService";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Login = () => {
  useDocumentTitle("Sign In");
  const nav = useNavigate();

  const {
    register: loginData,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
  });

  const onSubmit: SubmitHandler<LoginBodyType> = async (data) => {
    try {
      const response = await login(data.email, data.password);
      console.log(response);
      await new Promise((resolve) =>
        setTimeout(async () => {
          console.log(data);
          // const response = await login(data.email, data.password);
          resolve(console.log(response));
        }, 1000)
      );
      reset();
    } catch (error) {
      setError("root", { message: "Error" });
    }
  };

  return (
    <div
      className={`flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 bg-gradient-to-r from-cyan-500 to-blue-500 h-screen`}
    >
      <div className="absolute top-4 left-4">
        <Button
          onClick={() => nav(-1)} // Navigate back
          className="bg-white text-gray-700 p-2 rounded-full shadow-md hover:bg-gray-200"
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </Button>
      </div>
      <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-md rounded-lg ">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          SIGN IN
        </h2>
        <div className="space-y-3">
          <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </Label>
              <Input
                {...loginData("email")}
                id="email"
                type="email"
                className="w-full mt-1 p-6 input input-bordered bg-white text-black border-gray-300"
                placeholder="Enter your email"
              />
              {errors.email && (
                <div className=" mt-0 text-red-500 ">
                  {errors.email.message}
                </div>
              )}
            </div>

            <div>
              <Label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </Label>
              <Input
                {...loginData("password")}
                id="password"
                type="password"
                className="w-full mt-1 p-6 input input-bordered bg-white text-black border-gray-300"
                placeholder="Enter your password"
              />
              {errors.password && (
                <div className="text-red-500">{errors.password.message}</div>
              )}
            </div>

            <div
              className=" justify-end text-sm cursor-pointer text-blue-500 bg-gradient-to-r from-cyan-500 to-blue-500 inline-block text-transparent bg-clip-text"
              onClick={() => {
                nav("/forgot-password");
              }}
            >
              Forgot password?{" "}
            </div>

            <div>
              {isSubmitting ? (
                <>
                  <div className="flex justify-center my-5">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </div>
                </>
              ) : (
                <>
                  <Button className=" w-full p-6 dark:bg-black dark:text-white dark:hover:bg-zinc-500">
                    Sign In
                  </Button>
                </>
              )}
            </div>
          </form>
          <p className="text-center dark:text-black">
            Not a member? {""}
            <a
              className="cursor-pointer bg-gradient-to-r from-cyan-500 to-blue-500 inline-block text-transparent bg-clip-text"
              onClick={() => {
                nav("/register");
              }}
            >
              Create an account{" "}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
