import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { useNavigate } from "react-router-dom";
import { Label } from "../ui/label";

const Register = () => {
  useDocumentTitle("Sign Up");
  const nav = useNavigate();
  return (
    <div
      className={`flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 bg-zinc-950 h-screen`}
    >
      <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-md rounded-lg">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          SIGN UP
        </h2>
        <div className="space-y-3">
          <div>
            <Label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              className="w-full mt-1 p-6 input input-bordered bg-white text-black border-gray-300"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <Label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </Label>
            <Input
              id="password"
              type="password"
              className="w-full mt-1 p-6 input input-bordered bg-white text-black border-gray-300"
              placeholder="Enter your password"
              required
            />
          </div>

          <div>
            <Label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </Label>
            <Input
              id="confirm-password"
              type="password"
              className="w-full mt-1 p-6 input input-bordered bg-white text-black border-gray-300"
              placeholder="Enter your confirm-password"
              required
            />
          </div>

          <div>
            <Button className="w-full p-6">Sign Up</Button>
          </div>

          <p className="text-center">
            Already have account!! {""}
            <a
              className="cursor-pointer"
              onClick={() => {
                nav("/login");
              }}
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
