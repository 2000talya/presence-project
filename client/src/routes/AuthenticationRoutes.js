import SignIn from "../components/authentication/SignIn";
import SignUp from "../components/authentication/SignUp";

export const AuthenticationRoutes = {
    path: '/',
    children: [{
        path: '/',
        element: <SignIn />
    },
    {
        path: '/signin',
        element: <SignIn />
    },
    {
        path: '/signup',
        element: <SignUp />
    },]
}