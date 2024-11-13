import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "../ui/switch";
import ImageUpload from "./ImageUpload";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDocumentTitle } from "@uidotdev/usehooks";
// import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserProfileBody, UserProfileBodyType } from "@/schema/auth.schema";
import { useState } from "react";
import { updateProfile } from "@/services/authService";
import { DialogTitle } from "@radix-ui/react-dialog";

interface EditProfileProps {
  username: string;
  bio: string;
  phonenumber: string;
  dob: string;
  isprivate: boolean;
}

export const EditProfile = ({
  username,
  bio,
  phonenumber,
  dob,
  isprivate,
}: EditProfileProps) => {
  useDocumentTitle("Sign In");
  //   const nav = useNavigate();
  const [isOn, setIsOn] = useState(isprivate ? isprivate : false);
  console.log(username, bio, phonenumber, dob, isprivate);

  const handleToggle = (checked: boolean) => {
    setIsOn(checked);
  };

  const {
    register: userProfileData,
    handleSubmit,
    setError,
    reset,
  } = useForm<UserProfileBodyType>({
    defaultValues: {
      username: "username",
      bio: bio,
      phonenumber: phonenumber,
      dateofbirth: dob,
    },
    resolver: zodResolver(UserProfileBody),
  });

  const onSubmit: SubmitHandler<UserProfileBodyType> = async (data) => {
    let date;
    if (data.dateofbirth) {
      date = new Date(data.dateofbirth).toISOString();
    }
    try {
      console.log(date!, isOn);
      const response = await updateProfile(
        data.username,
        data.phonenumber,
        date!,
        data.bio,
        isOn
      );
      toast.success("Profile updated successfully", {
        duration: 500,
      });
      console.log(response);
      reset();
    } catch (error) {
      const errorMessage =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (error as any)?.response?.data?.Message || "An unknown error occurred";
      console.log(error);
      toast.error(errorMessage);
      setError("root", { message: "Error" });
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <div className="mt-20 p-2 text-center rounded-lg border cursor-pointer dark:text-white dark:border-white">
          Edit Profile
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] w-9/12">
        <DialogHeader>
          <DialogTitle className="text-center dark:text-white text-black">
            New Post
          </DialogTitle>
        </DialogHeader>
        <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between items-center">
            <div>
              <Label htmlFor="name" className="block text-lg font-medium ">
                Name
              </Label>
              <Input
                {...userProfileData("username")}
                id="name"
                type="text"
                className="w-full mt-1 p-6 input border-none "
                placeholder="Your name"
              />
            </div>
            <ImageUpload />
          </div>
          <div className=" items-center">
            <Label htmlFor="bio" className="block text-lg font-medium">
              Bio
            </Label>
            <Input
              {...userProfileData("bio")}
              id="bio"
              type="text"
              className="w-full mt-1 p-6 input border-none "
              placeholder="Write bio"
            />
          </div>
          <div className=" items-center">
            <Label htmlFor="phone" className="block text-lg font-medium">
              PhoneNumber
            </Label>
            <Input
              {...userProfileData("phonenumber")}
              id="phone"
              type="text"
              className="w-full mt-1 p-6 input border-none "
              placeholder="Input phone"
            />
          </div>
          <div className=" items-center">
            <Label htmlFor="dob" className="block text-lg font-medium">
              DateOfBirth
            </Label>
            <Input
              {...userProfileData("dateofbirth")}
              id="dob"
              type="Date"
              className="w-full mt-1 p-6 input border-none "
            />
          </div>
          <div className="flex justify-between items-center">
            <Label htmlFor="bio" className="block text-lg font-medium">
              Private Profile
            </Label>
            <Switch checked={isOn} onCheckedChange={handleToggle} />
          </div>
          <div className="w-full flex justify-center">
            <Button className="w-full mt-7">Done</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
