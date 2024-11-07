import { useTheme } from "@/components/context/theme-provider";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import {
  Bars3BottomLeftIcon,
  Cog6ToothIcon,
  MoonIcon,
  PowerIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
const ModePopover = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Popover>
      <PopoverTrigger className="flex items-center justify-center">
        <Bars3BottomLeftIcon className="w-7 h-7" />
      </PopoverTrigger>
      <PopoverContent className="w-52 dark:bg-zinc-800 dark:text-white border border-none bg-white text-black ">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Cog6ToothIcon className="w-5 h-5" />
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-1 items-center gap-4 mb-10">
              <div className="flex items-center space-x-6">
                <Switch
                  id="theme-mode"
                  className="data-[state=checked]:bg-white data-[state=unchecked]:bg-zinc-800"
                  checked={theme === "dark"}
                  onCheckedChange={() =>
                    setTheme(theme === "light" ? "dark" : "light")
                  }
                />
                <Label htmlFor="theme-mode" className="">
                  {theme === "dark" ? (
                    <MoonIcon className="w-5 h-5" />
                  ) : (
                    <SunIcon className="w-5 h-5" />
                  )}
                </Label>
              </div>
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <Button variant={"destructive"} className="dark:bg-red-500">
                <PowerIcon className="w-5 h-5" />
                Log Out
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ModePopover;
