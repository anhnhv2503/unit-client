import { Button } from "@/components/ui/button";
import {
  getFollowers,
  getFollowing,
  unfollowUser,
} from "@/services/followService";
import { Dialog, Transition } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

interface ViewFollowModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string | undefined;
  selectedTab: string;
}

type FollowProps = {
  UserId: string;
  UserName: string;
  ProfilePicture: string;
};

export const ViewFollow: React.FC<ViewFollowModalProps> = ({
  isOpen,
  onClose,
  userId,
  selectedTab,
}) => {
  const [activeTab, setActiveTab] = useState(selectedTab);
  const [followers, setFollowers] = useState<FollowProps[]>([]);
  const [following, setFollowing] = useState<FollowProps[]>([]);

  const fetchFollowers = async () => {
    const response = await getFollowers(userId!);
    setFollowers(response.data);
  };
  const fetchFollowing = async () => {
    const response = await getFollowing(userId!);
    setFollowing(response.data);
  };

  useEffect(() => {
    fetchFollowers();

    fetchFollowing();
  }, [userId]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleUnfollow = async (userId: string) => {
    const response = await unfollowUser(userId);
    if (response.status === 200) {
      toast.success("User unfollowed successfully");
      fetchFollowing();
    }
  };

  return (
    <Transition appear show={isOpen}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
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
          <div className="flex min-h-full items-center justify-center p-4 sm:p-6 lg:p-8 text-center">
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md sm:max-w-lg lg:max-w-xl transform overflow-hidden rounded-2xl bg-white dark:bg-zinc-800 p-4 sm:p-6 lg:p-8 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-center border-b px-4 py-2">
                  <div
                    className={`flex-1 text-center cursor-pointer ${
                      activeTab === "followers"
                        ? "font-semibold text-gray-500 dark:text-gray-300"
                        : "text-gray-400"
                    }`}
                    onClick={() => handleTabClick("followers")}
                  >
                    <h2>Followers</h2>
                    <p
                      className={`text-sm ${
                        activeTab === "followers"
                          ? "text-gray-500"
                          : "text-gray-400"
                      }`}
                    >
                      {followers.length}
                    </p>
                  </div>
                  <div
                    className={`flex-1 text-center cursor-pointer ${
                      activeTab === "following"
                        ? "font-semibold text-gray-500 dark:text-gray-300"
                        : "text-gray-400"
                    }`}
                    onClick={() => handleTabClick("following")}
                  >
                    <h2>Following</h2>
                    <p
                      className={`text-sm ${
                        activeTab === "following"
                          ? "text-gray-500"
                          : "text-gray-400"
                      }`}
                    >
                      {following.length}
                    </p>
                  </div>
                </div>

                <div className="">
                  {activeTab === "followers" ? (
                    <div className="divide-y">
                      {followers.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between px-4 py-2"
                        >
                          <div className="flex items-center">
                            <img
                              src={item.ProfilePicture}
                              alt={`Profile picture of ${item.UserName}`}
                              className="rounded-full w-10 h-10"
                            />
                            <div className="ml-3">
                              <p className="font-semibold text-gray-800 dark:text-white">
                                {item.UserName}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-white">
                                {item.UserName}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="divide-y">
                      {following.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between px-4 py-2"
                        >
                          <div className="flex items-center">
                            <img
                              src={item.ProfilePicture}
                              alt={`Profile picture of ${item.UserName}`}
                              className="rounded-full w-10 h-10"
                            />
                            <div className="ml-3">
                              <p className="font-semibold text-gray-800 dark:text-white">
                                {item.UserName}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-white">
                                {item.UserName}
                              </p>
                            </div>
                          </div>
                          <Button
                            className="dark:bg-zinc-700 dark:border dark:border-zinc-800 dark:hover:bg-zinc-600"
                            variant={"outline"}
                            onClick={() => handleUnfollow(item.UserId)}
                          >
                            Following
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
