import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { useNavigate } from "react-router-dom";

const Login = () => {
  useDocumentTitle("Sign In");
  const nav = useNavigate();

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
            <Button className="w-full p-6 dark:bg-black dark:text-white dark:hover:bg-zinc-500">
              Sign In
            </Button>
          </div>
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
