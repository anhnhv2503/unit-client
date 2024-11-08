import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResetPasswordBody, ResetPasswordBodyType } from "@/schema/auth.schema";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useState } from "react";

export const ResetPassword = () => {
  useDocumentTitle("Sign In");
  const nav = useNavigate();

  const [otpValue, setOtpValue] = useState<string>("");

  const {
    register: resetPassword,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordBodyType>({
    resolver: zodResolver(ResetPasswordBody),
  });

  const handleOtpChange = (value: string) => {
    setOtpValue(value); // Capture OTP input
  };

  const onSubmit: SubmitHandler<ResetPasswordBodyType> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form Data:", { ...data, pin: otpValue });
      setOtpValue("");
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
          RESET PASSWORD
        </h2>
        <div className="space-y-3">
          <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
            <div className="text-black flex justify-center">
              <InputOTP
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                onChange={handleOtpChange}
                value={otpValue} //
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <div>
              <Label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </Label>
              <Input
                {...resetPassword("password")}
                id="password"
                type="password"
                className="w-full mt-1 p-6 input input-bordered bg-white text-black border-gray-300"
                placeholder="Enter your password"
              />
              {errors.password && (
                <div className=" mt-0 text-red-500 ">
                  {errors.password.message}
                </div>
              )}
            </div>

            <div>
              <Label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </Label>
              <Input
                {...resetPassword("confirmPassword")}
                id="confirm-password"
                type="password"
                className="w-full mt-1 p-6 input input-bordered bg-white text-black border-gray-300"
                placeholder="Enter your confirm-password"
              />
              {errors.confirmPassword && (
                <div className="text-red-500">
                  {errors.confirmPassword.message}
                </div>
              )}
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
                    Reset
                  </Button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
