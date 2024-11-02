import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Header = () => {
  const nav = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
  return (
    <header className="bg-black fixed top-0 left-0 right-0 z-50 ">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-2 lg:px-8 "
      >
        <div className="flex lg:flex-1">
          <a onClick={handleClick} className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              alt=""
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=gray&shade=50"
              className="h-8 w-auto cursor-pointer"
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <div className="relative">
            <a
              onClick={() => nav("/")}
              className="flex items-center gap-x-1 text-sm/6 font-semibold  text-white cursor-pointer"
            >
              Home
            </a>
          </div>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Button onClick={() => nav("/login")} variant={"secondary"}>
            Login <span aria-hidden="true">&rarr;</span>
          </Button>
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-zinc-950 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
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
                      nav("/"), setMobileMenuOpen(false);
                    }}
                    className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base/7 font-semibold text-white"
                  >
                    Home
                  </DisclosureButton>
                </Disclosure>
              </div>
              <div className="py-6">
                <Button
                  onClick={() => {
                    nav("/login"), setMobileMenuOpen(false);
                  }}
                  variant={"secondary"}
                >
                  Login <span aria-hidden="true">&rarr;</span>
                </Button>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Header;
