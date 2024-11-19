// @flow
import {Navigate, Outlet} from "react-router-dom";

type protectedRouteProps = {
    user: string | undefined
};

export default function ProtectedRoute(props: protectedRouteProps) {

    if(props.user === undefined || props.user ==="anonymousUser"){
        return <Navigate to={"/"}/>
    }

    return <Outlet />

};