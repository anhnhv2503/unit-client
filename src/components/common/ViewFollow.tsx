import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

const followersData = [
  {
    username: "hyunchan.0610",
    name: "Huyền Trang",
    img: "https://placehold.co/40x40",
  },
  {
    username: "tranthithuyhang205",
    name: "Trần Thị Thúy Hằng",
    img: "https://placehold.co/40x40",
  },
  { username: "quancd35", name: "Duy Quân", img: "https://placehold.co/40x40" },
  { username: "ntnguyetanh_", name: "na", img: "https://placehold.co/40x40" },
  {
    username: "wuyn.tram24",
    name: "Hồ Thị Quỳnh Trâm",
    img: "https://placehold.co/40x40",
  },
  {
    username: "kim_ngocc",
    name: "Kim Ngọc",
    img: "https://placehold.co/40x40",
  },
  {
    username: "qui.suuu_",
    name: "Huy Hồ Đức",
    img: "https://placehold.co/40x40",
  },
];

const followingData = [
  { username: "john_doe", name: "John Doe", img: "https://placehold.co/40x40" },
  {
    username: "jane_smith",
    name: "Jane Smith",
    img: "https://placehold.co/40x40",
  },
];

interface ViewFollowModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ViewFollow: React.FC<ViewFollowModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = React.useState("followers");
  const [data, setData] = React.useState(followersData);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setData(tab === "followers" ? followersData : followingData);
  };

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
          <div className="flex min-h-full items-center justify-center p-4 sm:p-6 lg:p-8 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md sm:max-w-lg lg:max-w-xl transform overflow-hidden rounded-2xl bg-white p-4 sm:p-6 lg:p-8 text-left align-middle shadow-xl transition-all">
                {/* Modal Header */}
                <div className="flex justify-between items-center border-b px-4 py-2">
                  <div
                    className={`flex-1 text-center cursor-pointer ${
                      activeTab === "followers"
                        ? "font-semibold text-gray-800"
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
                      {followersData.length}
                    </p>
                  </div>
                  <div
                    className={`flex-1 text-center cursor-pointer ${
                      activeTab === "following"
                        ? "font-semibold text-gray-800"
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
                      {followingData.length}
                    </p>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="divide-y">
                  {data.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between px-4 py-2"
                    >
                      <div className="flex items-center">
                        <img
                          src={item.img}
                          alt={`Profile picture of ${item.username}`}
                          className="rounded-full w-10 h-10"
                        />
                        <div className="ml-3">
                          <p className="font-semibold text-gray-800">
                            {item.username}
                          </p>
                          <p className="text-sm text-gray-500">{item.name}</p>
                        </div>
                      </div>
                      {activeTab === "followers" ? (
                        <button className="text-sm text-black border border-gray-300 rounded px-3 py-1">
                          Follow back
                        </button>
                      ) : (
                        <button className="text-sm text-gray-400 border border-gray-300 rounded px-3 py-1">
                          Following
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
