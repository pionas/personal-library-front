import React, { useCallback, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router";
import { decode } from "jsonwebtoken";
import { GET_CURRENT_USER_QUERY } from '../pages/CurrentUserDetailsPage';
import { useToast } from "./Toast";

function saveAuthToken(token) {
    localStorage.setItem("token", token);
}

export function getAuthToken() {
    return localStorage.getItem("token") || null;
}

export function cleanAuthToken() {
    localStorage.removeItem("token");
}

function getAuthTokenPayload() {
    const token = getAuthToken();
    if (!token) {
        return {};
    }
    return decode(token);
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
    const { loading, error, data, client, refetch } = useQuery(GET_CURRENT_USER_QUERY);
    const toast = useToast();
    const navigate = useNavigate();

    function authorize(token) {
        saveAuthToken(token);
        navigate("/");
        refetch();
    }

    const unauthorize = useCallback(function unauthorize() {
        cleanAuthToken();
        client.resetStore();
        navigate("/");
        toast({
            description: "You've successfully logged out.",
            status: "success"
        });
    }, [client, navigate, toast]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const payload = getAuthTokenPayload();
            const nowInSeconds = Math.round(Date.now() / 1000);
            if (payload.exp - nowInSeconds < 15) {
                unauthorize();
            }
        }, 5000);
        return () => {
            clearInterval(intervalId);
        }
    }, [unauthorize]);

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
