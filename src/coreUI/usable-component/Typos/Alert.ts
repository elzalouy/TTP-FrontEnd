import { toast } from "react-toastify";
import { generateID } from "../../../helpers/IdGenerator";

export const ToastWarning = (message: string) => {
  return toast.warning(message, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    toastId: "mail",
  });
};
export const ToastError = (message: string) => {
  return toast.error(message, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    toastId: generateID(),
  });
};
