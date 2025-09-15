import { toast } from "react-toastify";

const showSuccess = () => {
    toast.success({
        position: "top-center",
        autoClose: 3000, // 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
};
let activeToastId = null;
const showError = (message="error") => {
    if (activeToastId) toast.dismiss(activeToastId);
    activeToastId = toast.error(message, {
        position: "top-center",
        autoClose: 1000, // 3 seconds
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        limit: 3,
        onClose: () => {
            activeToastId: null;
        }
        // progress: undefined,
    });
};
export { showSuccess, showError };