
import { Toast, ToastToggle } from "flowbite-react";
import { HiCheck, HiX } from "react-icons/hi";

interface CustomToastProps {
  title: string;
  isSuccess: boolean;
}

export const CustomToast = ({ title, isSuccess }: CustomToastProps) => {
  return (
    <div className="flex flex-col gap-4">
      <Toast>
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
          { isSuccess ? <HiCheck className="h-5 w-5" /> : <HiX className="h-5 w-5" />}
        </div>
        <div className="ml-3 text-sm font-normal">{title}</div>
        <ToastToggle />
      </Toast>
    </div>
  );
}
