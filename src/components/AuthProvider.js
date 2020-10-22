import React from "react";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router";
import { GET_CURRENT_USER_QUERY } from '../pages/CurrentUserDetailsPage';
import { useToast } from "./Toast";

function saveAuthToken(token) {
    localStorage.setItem("token", token);
}

export function cleanAuthToken() {
    localStorage.removeItem("token");
}

export function getAuthToken() {
    return localStorage.getItem("token") || null;
}

const DEFAULT_VALUE = {
    currentUser: null,
    authorize: token => console.log("Trying to authorize: ", token),
    unauthorize: () => console.log("Trying to unauthorize")
};
const AuthContext = React.createContext(DEFAULT_VALUE);
export function useAuth() {
    return React.useContext(AuthContext);
}

function AuthProvider({ children }) {
    const { loading, error, data, client } = useQuery(GET_CURRENT_USER_QUERY);
    const toast = useToast();
    const navigate = useNavigate();

    function authorize(token) {
        saveAuthToken(token);
        navigate("/");
    }

    function unauthorize() {
        cleanAuthToken();
        client.resetStore();
        navigate("/");
        toast({
            description: "You've successfully logged out.",
            status: "success"
        });
    }

    const authValue = {
        ...DEFAULT_VALUE,
        authorize,
        unauthorize
    };

    if (!loading && !error) {
        authValue.currentUser = data.currentUser;
    }

    return (
        <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
    );
}

export default AuthProvider;
