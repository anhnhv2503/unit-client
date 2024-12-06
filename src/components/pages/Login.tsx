import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { decodeToken } from "@/lib/utils";
import { LoginBody, LoginBodyType } from "@/schema/auth.schema";
import { getUserProfile, login } from "@/services/authService";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useWebSocket } from "../context/NotificationProvider";

const Login = () => {
  useDocumentTitle("Sign In");
  const nav = useNavigate();
  const [isToggle, setIsToggle] = useState(false);
  const { connect, handleLogin } = useWebSocket();
  const location = useLocation();

  useEffect(() => {
    const currentUrl = location.pathname + location.search;
    sessionStorage.setItem("previousUrl", currentUrl);
  }, [location]);

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
      if (response.data.accessToken) {
        const redirectPath = localStorage.getItem("redirectAfterLogin");
        const decodedToken = decodeToken(response.data.accessToken);
        handleLogin((decodedToken as { username: string })?.username);

        setTimeout(async () => {
          const user = await getUserProfile(
            (decodedToken as { username: string }).username,
            true
          );
          localStorage.setItem("isPrivate", JSON.stringify(user.data.Private));
        }, 1000);

        if (connect) {
          connect();
        }

        localStorage.setItem(
          "accessToken",
          JSON.stringify(response.data.accessToken)
        );
        localStorage.setItem(
          "refreshToken",
          JSON.stringify(response.data.refreshToken)
        );
        toast.success("Login successful", {
          duration: 500,
        });
        setTimeout(() => {
          if (redirectPath) {
            localStorage.removeItem("redirectAfterLogin"); // Clear redirect path
            nav(redirectPath); // Redirect to the saved path
          } else {
            nav("/"); // Default path after login
          }
        }, 1000);
        reset();
      }
    } catch (error) {
      const errorMessage =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (error as any)?.response?.data?.Message || "An unknown error occurred";
      if (errorMessage === "User is not confirmed.") {
        setTimeout(() => {
          nav(`/confirm?email=${data.email}`);
        }, 500);
      }

      toast.error(errorMessage);
      setError("root", { message: "Error" });
    }
  };

  return (
    <div
      className={`flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 bg-gradient-to-r from-cyan-500 to-blue-500 h-screen`}
    >
      <Toaster />
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
              <div className="relative">
                <Input
                  {...loginData("password")}
                  id="password"
                  type={isToggle ? "text" : "password"}
                  className="w-full mt-1 p-6 input input-bordered bg-white text-black border-gray-300"
                  placeholder="Enter your password"
                />
                <EyeIcon
                  className={`size-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer ${
                    isToggle ? "hidden" : "block"
                  }`}
                  onClick={() => setIsToggle(!isToggle)}
                />
                <EyeSlashIcon
                  className={`size-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer ${
                    isToggle ? "block" : "hidden"
                  }`}
                  onClick={() => setIsToggle(!isToggle)}
                />
              </div>
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
