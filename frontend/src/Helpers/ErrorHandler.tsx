import axios from "axios";
import { toast } from "react-toastify";

    export const handleError = (error: any) => {
        
        if (axios.isAxiosError(error)) {
            
            var err = error.response;

            if (err && Array.isArray(err.data)) {
                for (const val of err.data) {
                    if (val.description) {
                        toast.warning(val.description);
                    }
            }
            } else if (Array.isArray(err?.data.errors)) {
                for (let val of err?.data.errors) {
                    toast.warning(val.description);
                }
            } else if (typeof err?.data.errors === 'object') {
                for (let e in err?.data.errors) {
                    toast.error(err.data.errors[e][0]);
                }
            } else if (err?.data) {
                toast.error(err.data);
            } else if (err?.status == 401) {
                toast.warning("Please login first");
                window.history.pushState({}, "LoginPage", "/login");
            } else if (err) {
                toast.error("Something went wrong.");
            }
            
        }
    }