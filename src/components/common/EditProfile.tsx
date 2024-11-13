import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { UserProfileBody, UserProfileBodyType } from "@/schema/auth.schema";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import ImageUpload from "./ImageUpload";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (profileData: UserProfileProps) => void;
  initialData: UserProfileProps;
}

type UserProfileProps = {
  UserId: string;
  UserName: string;
  Bio: string;
  PhoneNumber: string;
  DateOfBirth: string;
  Private: boolean;
};

const EditProfile: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [profileData, setProfileData] = useState<UserProfileProps>(initialData);
  const handleToggle = (checked: boolean) => {
    setProfileData({ ...profileData, Private: checked });
  };

  const { register: userProfileData, handleSubmit } =
    useForm<UserProfileBodyType>({
      resolver: zodResolver(UserProfileBody),
      defaultValues: {
        username: profileData.UserName,
        bio: profileData.Bio,
        phonenumber: profileData.PhoneNumber,
        dateofbirth: profileData.DateOfBirth,
      },
    });

  function onSubmit(values: UserProfileBodyType) {
    console.log(values);
  }
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Edit Profile
                </Dialog.Title>
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>

                <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex justify-between items-center">
                    <div>
                      <Label
                        htmlFor="name"
                        className="block text-lg font-medium dark:text-black"
                      >
                        Name
                      </Label>
                      <Input
                        {...userProfileData("username")}
                        id="name"
                        type="text"
                        className="w-full mt-1 p-6 input border-none dark:text-black"
                        placeholder="Your name"
                      />
                    </div>
                    <ImageUpload />
                  </div>
                  <div className=" items-center">
                    <Label
                      htmlFor="bio"
                      className="block text-lg font-medium dark:text-black"
                    >
                      Bio
                    </Label>
                    <Input
                      {...userProfileData("bio")}
                      id="bio"
                      type="text"
                      className="w-full mt-1 p-6 input border-none dark:text-black"
                      placeholder="Write bio"
                    />
                  </div>
                  <div className=" items-center">
                    <Label
                      htmlFor="phone"
                      className="block text-lg font-medium dark:text-black"
                    >
                      PhoneNumber
                    </Label>
                    <Input
                      {...userProfileData("phonenumber")}
                      id="phone"
                      type="text"
                      className="w-full mt-1 p-6 input border-none dark:text-black"
                      placeholder="Input phone"
                    />
                  </div>
                  <div className=" items-center">
                    <Label
                      htmlFor="dob"
                      className="block text-lg font-medium dark:text-black"
                    >
                      DateOfBirth
                    </Label>
                    <Input
                      {...userProfileData("dateofbirth")}
                      id="dob"
                      type="Date"
                      className="w-full mt-1 p-6 input border-none dark:text-black"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <Label
                      htmlFor="bio"
                      className="block text-lg font-medium dark:text-black"
                    >
                      Private Profile
                    </Label>
                    <Switch
                      checked={profileData.Private}
                      onCheckedChange={handleToggle}
                      className="data-[state=checked]:bg-gray-300 data-[state=unchecked]:bg-zinc-800 dark:data-[state=checked]:bg-gray-300 dark:data-[state=unchecked]:bg-zinc-500"
                    />
                  </div>
                  <div className="w-full flex justify-center">
                    <Button className="w-full mt-7 dark:bg-black dark:text-white">
                      Done
                    </Button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditProfile;
