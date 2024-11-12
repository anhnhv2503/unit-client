import bowLogo from "@/assets/header-logo/bow.png";
import wobLogo from "@/assets/header-logo/wob.png";
import ModePopover from "@/components/common/ModePopover";
import { useTheme } from "@/components/context/theme-provider";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const fakeAvt = `https://images.pexels.com/photos/19640832/pexels-photo-19640832/free-photo-of-untitled.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load`;

const Header = () => {
  const nav = useNavigate();
  const { theme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    setUserId(JSON.parse(localStorage.getItem("user_id")!));
  }, [userId]);

  const handleClick = () => {
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("Success!");
        }, 2000);
      }),
      {
        loading: "Loading...",
        success: "Success!",
        error: "Cound not refresh",
      }
    );
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <header className="dark:bg-black bg-white fixed top-0 left-0 right-0 z-10 ">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-2 lg:px-8 "
      >
        <div className="flex lg:flex-1">
          <a onClick={handleClick} className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            {theme === "dark" ? (
              <img
                alt="Dark Theme Logo"
                src={wobLogo}
                className="h-8 w-auto cursor-pointer transition ease-in-out delay-150 motion-reduce:transition-none motion-reduce:hover:transform-none"
              />
            ) : (
              <img
                alt="Light Theme Logo"
                src={bowLogo}
                className="h-8 w-auto cursor-pointer transition ease-in-out delay-150 motion-reduce:transition-none motion-reduce:hover:transform-none"
              />
            )}
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 dark:text-white "
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <div className="relative">
            <a
              onClick={() => {
                handleScrollTop();
                nav("/");
              }}
              className="flex items-center gap-x-1 text-sm/6 font-semibold  dark:text-white text-black cursor-pointer"
            >
              Home
            </a>
          </div>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {userId ? (
            <>
              <img
                src={fakeAvt}
                alt="Profile picture of the second user"
                className="w-10 h-10 rounded-full mr-2 no-nav cursor-pointer"
                onClick={() => nav(`/user-profile/1`)}
              />
            </>
          ) : (
            <></>
          )}
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-64 overflow-y-auto dark:bg-zinc-950 bg-gray-100 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 dark:text-white text-black"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton
                    onClick={() => {
                      nav("/");
                      setMobileMenuOpen(false);
                    }}
                    className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base/7 font-semibold dark:text-white text-black"
                  >
                    Home
                  </DisclosureButton>
                </Disclosure>
              </div>
              <div className="py-6">
                {/* {userId ? (
                  <>
                    <img
                      src={fakeAvt}
                      alt="Profile picture of the second user"
                      className="w-10 h-10 rounded-full mr-2 no-nav cursor-pointer"
                      onClick={() => nav(`/user-profile/1`)}
                    />
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => {
                        nav("/login");
                        setMobileMenuOpen(false);
                      }}
                    >
                      Login <span aria-hidden="true">&rarr;</span>
                    </Button>
                  </>
                )} */}
              </div>
            </div>
            <div className="py-6">
              <ModePopover />
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Header;
