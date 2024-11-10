import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from "./pages/app/dashboard";
import { Signin } from "./pages/auth/signin";
import { AppLayout } from "./pages/_layouts/app";
import { AuthLayout } from "./pages/_layouts/auth";
import { Signup } from "./pages/auth/signup";

export const router = createBrowserRouter ([
    {
        path: '/',
        element: <AppLayout />,
        children: [{path: '/', element: <Dashboard />}]
    },
    
    {
        path: '/',
        element: <AuthLayout />,
        children: [
            {path: '/signin', element: <Signin />},
            {path: '/signup', element: <Signup />}
        ],        
    },
])