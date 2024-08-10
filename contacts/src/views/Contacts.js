// @mui material components
import Card from "@mui/material/Card";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Table from "examples/Tables/Table";
import VuiButton from "components/VuiButton";
import { IoIosAdd, IoIosInformationCircle, IoIosTrash } from "react-icons/io";

// Custom components
import { useEffect, useState } from "react";
import axios from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2.js';

// sweetalert2 dark theme
import '@sweetalert2/theme-dark';

// Get views
import AddContact from "./AddContact";
import ContactDetails from "./ContactDetails";
import EditContact from "./EditContact";


const Contacts = () => {
  // Set variables
  const [ contacts, setContacts ] = useState([]);
  const [ showDetails, setShowDetails ] = useState(null);
  const [ editContact, setEditContact ] = useState(null);
  const [ addNewContact, setAddNewContact ] = useState(false);

  // Set success alert
  const showSuccess = (title) => {
    Swal.fire({
        title: title,
        icon: "success",
        showConfirmButton: false,
        timer: 1500
    });
};
    
  // Set error alert
  const showError = (title) => {
    Swal.fire({
        title: title,
        icon: "error",
        showConfirmButton: false,
        timer: 1500
    });
  };

  // Get data for table
  const getContact = () => {
    axios({
      url: `${process.env.REACT_APP_API}Contacts/GetContacts`,
      method: 'GET'
    }).then((response) => {
      setContacts(response.data.map(a => ({
        Imię: a.name,
        Nazwisko: a.lastName,
        Email: a.email,
        Szczegóły: (
          <VuiBox>
            <VuiButton color='info' onClick={() => setShowDetails(a)}><IoIosInformationCircle /> Wyświetl szczegóły</VuiButton>
            {localStorage.getItem("token") !== null && <VuiButton color='error' onClick={() => showWarning({id: a.id, fullName: `${a.name} ${a.lastName}`})}><IoIosTrash /> Usuń</VuiButton>}
          </VuiBox>
        )
      })));
    }).catch((error) => {
      console.log(error);
    });
  };

  // delete Contact
  const deleteContact = (contactID) => {
    axios({
        url: `${process.env.REACT_APP_API}Contacts/DeleteContact/${contactID}`,
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    }).then((response) => {
        showSuccess("Kontakt został usunięty")
        getContact()
    }).catch((error) => {
        console.log(error);
        showError("Nie udało się usunąć kontaktu")
    });
  };

  // Set warning to confirm contact delete
  const showWarning = (data) => {
    Swal.fire({
        title: `Czy na pewno chcesz usunąć kontakt ${data.fullName}`,
        icon: "warning",
        showConfirmButton: false,
        showDenyButton: true,
        showCancelButton: true,
        denyButtonText: "Usuń"
    }).then((result) => {
      if (result.isDenied) {
        deleteContact(data.id);
      }
    });
  };

  // Set columns for table
  const columns = [
    { name: "Imię", align: "center" },
    { name: "Nazwisko", align: "center" },
    { name: "Email", align: "center" },
    { name: "Szczegóły", align: "center" }
  ];

  // get data after page open
  useEffect(() => {
    getContact()
  }, []);

  // get data after changes
  useEffect(() => {
    if (!addNewContact && editContact === null) getContact()
  }, [addNewContact, editContact]);

  // page with add contact form
  if (addNewContact) {
    return (
      <AddContact setAddNewContact={setAddNewContact} />
    )
  };

  // page with contact details
  if (showDetails !== null) {
    return (
      <ContactDetails setShowDetails={setShowDetails} setEditContact={setEditContact} details={showDetails} />
    )
  };

  // page with edit contact form
  if (editContact !== null) {
    return (
      <EditContact setShowDetails={setShowDetails} setEditContact={setEditContact} details={editContact} />
    )
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <Card>
            {/* header */}
            <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb="22px">
              <VuiTypography variant="lg" color="white">
                Lista kontaktów
              </VuiTypography>
              {localStorage.getItem("token") !== null && 
                <VuiButton color='success' onClick={() => setAddNewContact(true)}>
                  <IoIosAdd />
                  Dodaj nowy kontakt
                </VuiButton>
              }
            </VuiBox>
            {/* table with contacts */}
            <VuiBox
              sx={{
                "& th": {
                  borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                    `${borderWidth[1]} solid ${grey[700]}`,
                },
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                      `${borderWidth[1]} solid ${grey[700]}`,
                  },
                },
              }}
            >
              <Table columns={columns} rows={contacts} />
            </VuiBox>
          </Card>
        </VuiBox>
      </VuiBox>

    </DashboardLayout>
  );
};

export default Contacts;
