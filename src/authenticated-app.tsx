import {ProjectListScreen} from "./screen/project-list";
import React from "react";
import {useAuth} from "./context/auth-context";

export const AuthenticatedApp = () =>{
    const {logout} = useAuth()

    return (
        <div>
            <button onClick={logout}>登出</button>
            <ProjectListScreen />
        </div>
    )
}