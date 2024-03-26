import { createContext } from "react";

const contestoAutenticazione = createContext({
    userProfile: null,
    isLoading: true,
    hasError: false,
    error: null,
    setUserProfile: () =>{}
});

export default contestoAutenticazione;