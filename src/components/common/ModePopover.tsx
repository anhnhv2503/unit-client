import { useTheme } from "@/components/context/theme-provider";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
const ModePopover = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Popover>
      <PopoverTrigger className="flex items-center justify-center">
        <Bars3BottomLeftIcon className="w-7 h-7" />
      </PopoverTrigger>
      <PopoverContent className="w-52 bg-zinc-800 text-white border border-none dark:bg-white dark:text-black">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Setting</h4>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-1 items-center gap-4 mb-2">
              <div className="flex items-center space-x-2">
                <Switch
                  id="theme-mode"
                  checked={theme === "dark"}
                  onCheckedChange={() =>
                    setTheme(theme === "light" ? "dark" : "light")
                  }
                />
                <Label htmlFor="theme-mode">
                  {theme === "dark" ? "Dark Mode" : "Light Mode"}
                </Label>
              </div>
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <Button variant={"destructive"} className="dark:bg-red-500">
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
