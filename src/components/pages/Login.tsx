import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { useNavigate } from "react-router-dom";

const Login = () => {
  useDocumentTitle("Sign In");
  const nav = useNavigate();

  return (
    <div
      className={`flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 bg-zinc-950 h-screen`}
    >
      <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-md rounded-lg ">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          SIGN IN
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
            <Button className="w-full p-6">Sign In</Button>
          </div>
          <p className="text-center">
            Not a member? {""}
            <a
              className="cursor-pointer"
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
