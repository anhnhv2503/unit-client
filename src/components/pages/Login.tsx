import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useDocumentTitle } from "@uidotdev/usehooks";
import React, { useState } from "react";

const Login = () => {
  useDocumentTitle("Sign In");
  const [darkMode, setDarkMode] = useState(true);
  console.log(darkMode);
  return (
    <div
      className={`flex items-center justify-center min-h-96 p-8 pb-44 ${
        darkMode ? "bg-zinc-950" : "bg-white"
      }  h-screen`}
    >
      <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-md rounded-lg">
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
          <div className="flex items-center space-x-2">
            <Switch id="airplane-mode" onClick={() => setDarkMode(!darkMode)} />
            <Label htmlFor="airplane-mode">
              {darkMode ? "Light" : "Dark"} Mode
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
