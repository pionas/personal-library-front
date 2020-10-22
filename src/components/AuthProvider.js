import React from "react";
import { useNavigate } from "react-router";

function saveAuthToken(token) {
    localStorage.setItem("token", token);
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
    const navigate = useNavigate();

    function authorize(token) {
        saveAuthToken(token);
        navigate("/");
    }

    const authValue = {
        ...DEFAULT_VALUE,
        authorize
    };

    return (
        <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
    );
}

export default AuthProvider;
