// @mui material components
import Card from "@mui/material/Card";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";

// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { IoIosArrowDropleftCircle, IoIosCreate } from "react-icons/io";

const ContactDetails = (props) => {
    // Set variables from parent
    const {
        setShowDetails,
        setEditContact,
        details
    } = props;

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <VuiBox py={3}>
                <VuiBox mb={3}>
                    <Card>
                        {/* header */}
                        <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb="22px">
                            <VuiTypography variant="lg" color="white">
                                Szczegóły kontaktu
                            </VuiTypography>
                            <VuiBox>
                                {localStorage.getItem("token") !== null && 
                                    <VuiButton color='warning' onClick={() => (setEditContact(details), setShowDetails(null))}>
                                        <IoIosCreate />
                                        Edytuj
                                    </VuiButton>
                                }
                                <VuiButton color='dark' onClick={() => setShowDetails(null)}>
                                    <IoIosArrowDropleftCircle />
                                    Powrót
                                </VuiButton>
                            </VuiBox>
                        </VuiBox>
                        <hr />
                        {/* contact detail */}
                        <VuiBox color="white" m={5}>
                            <ul>
                                <li><b>Imię: </b>{details.name}</li>
                                <li><b>Nazwisko: </b>{details.lastName}</li>
                                <li><b>Email: </b>{details.email}</li>
                                <li><b>Hasło: </b>{details.password}</li>
                                <li><b>Kategoria: </b>{details.category.name}</li>
                                {details.subCategory !== null && <li><b>Podkategoria: </b>{details.subCategory.name}</li>}
                                <li><b>Numer telefonu: </b>{details.phoneNumber}</li>
                                <li><b>Data urodzenia: </b>{details.birthDate}</li>
                            </ul>
                        </VuiBox>
                    </Card>
                </VuiBox>
            </VuiBox>

        </DashboardLayout>
    );
};

export default ContactDetails;