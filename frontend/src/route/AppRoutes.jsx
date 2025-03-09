import { createBrowserRouter, Link } from "react-router-dom";
import App from "../App";
import { PatientTable } from "../Pages/PatientTable";
import { NoPage } from "../Pages/NoPage";
import { AdminLogin } from "@/Pages/AdminLogin";
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/patienttable",
        element: <PatientTable />,
    },
    {
        path: "/admin",
        element: <AdminLogin />,
    },
    {
        path: "*",
        element: <NoPage />,
    }
])
export default router