import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"
import { NoPage } from "./NoPage";
import { PatientDatas } from "./PatientDatas";
//ICONS
import { FaTableCells } from "react-icons/fa6";
import { LiaClipboardListSolid } from "react-icons/lia";
import { PatientTable } from "./PatientTable";
export const Admin = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const user = queryParams.get('user');
    return (
        <>
            <br />
            {
                user === "Lincoln" ?
                    <>
                        {/* <PatientDatas/> */}
                        <PatientTable />

                    </>
                    :
                    <NoPage />
            }
        </>
    )
}