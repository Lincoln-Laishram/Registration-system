import { createBrowserRouter, Link } from "react-router-dom";
import App from "../App";
import { PatientDatas } from "../Pages/PatientDatas";
import { PatientTable } from "../Pages/PatientTable";
import { NoPage } from "../Pages/NoPage";
import { Admin } from "../Pages/Admin";
const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
    },
    {
        path: "/patientdata",
        element: <PatientDatas/>,
    },
    {
        path: "/patienttable",
        element: <PatientTable/>,
    },
    {
        path: "/admin",
        element: <Admin/>,
    },
    {
        path: "*",
        element: <NoPage/>,
    }
])
export default router