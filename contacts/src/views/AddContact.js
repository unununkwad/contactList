// @mui material components
import Card from "@mui/material/Card";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";
import VuiInput from "components/VuiInput";

// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { IoIosArrowDropleftCircle, IoIosSave } from "react-icons/io";

// Custom components
import { useEffect, useState } from "react";
import axios from 'axios'
import { Label } from "reactstrap";
import { Grid } from "@mui/material";
import Select from "react-select";
import Swal from 'sweetalert2/dist/sweetalert2.js';

// sweetalert2 dark theme
import '@sweetalert2/theme-dark';

const AddContact = (props) => {
  // Set variables
    const [ categories, setCategories ] = useState([]);
    const [ subCategories, setSubCategories ] = useState([]);
    const [ emails, setEmails ] = useState([]);
    const [ name, setName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ selectedCategory, setSelectedCategory ] = useState(null);
    const [ selectedSubCategory, setSelectedSubCategory ] = useState(null);
    const [ subCategory, setSubCategory ] = useState("");
    const [ phoneNumber, setPhoneNumber ] = useState("");
    const [ birthDate, setBirthDate ] = useState("");

    // Set variables from parent
    const {
        setAddNewContact
    } = props;

  // Set success alert
    const showSuccess = () => {
        Swal.fire({
            title: "Kontakt został dodany",
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

    const addContact = () => {
        // data validation
        if (name === "" ||
            lastName === "" ||
            email === "" ||
            password === "" ||
            selectedCategory === null ||
            (selectedCategory.value === 1 && selectedSubCategory === null) ||
            (selectedCategory.value === 3 && subCategory === "") ||
            phoneNumber === "" ||
            birthDate === ""
        ) {
            showError("Pola nie mogą pozostać puste")
        } else if (emails.filter(a => a.toLowerCase() === email.toLowerCase()).length > 0) {
            showError("Taki email już występuje")
        } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            showError("Email jest nieprawidłowy")
        } else if (!/^(?=.*[a-z])/.test(password)) {
            showError("Hasło powinno zawierać małe znaki")
        } else if (!/^(?=.*[A-Z])/.test(password)) {
            showError("Hasło powinno zawierać duże znaki")
        } else if (!/^(?=.*[0-9])/.test(password)) {
            showError("Hasło powinno zawierać cyfry")
        } else if (!/^(?=.*\W)(?!.* )/.test(password)) {
            showError("Hasło powinno zawierać znaki specjalne")
        } else if (!/^.{8,40}$/.test(password)) {
            showError("Hasło musi zawierać od 8 do 40 znaków")
        } else if (/^(?=.*[a-z])/.test(phoneNumber) || /^(?=.*[A-Z])/.test(phoneNumber)) {
            showError("Numer telefonu nie może zawierać liter")
        } else {
            // send new contact data to save
            axios({
                url: `${process.env.REACT_APP_API}Contacts/AddContact`,
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                data: {
                    Name: name,
                    LastName: lastName,
                    Email: email,
                    Password: password,
                    CategoryID: selectedCategory.value,
                    SubCategoryID: selectedSubCategory === null ? null : selectedSubCategory.value,
                    SubCategoryString: subCategory,
                    PhoneNumber: phoneNumber,
                    BirthDate: birthDate
                }
            }).then((response) => {
                showSuccess()
                setAddNewContact(false)
            }).catch((error) => {
                console.log(error);
                showError("Nie udało się zapisać zmian")
            });
        }
    };

    useEffect(() => {
        // download categories to select
        axios({
            url: `${process.env.REACT_APP_API}Contacts/GetCategories`,
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then((response) => {
            setCategories(response.data.map(a => ({label: a.name, value: a.id})));
        }).catch((error) => {
            console.log(error);
        });
        
        // download subcategories to select
        axios({
            url: `${process.env.REACT_APP_API}Contacts/GetSubCategories`,
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then((response) => {
            setSubCategories(response.data.map(a => ({label: a.name, value: a.id})));
        }).catch((error) => {
            console.log(error);
        });
        
        // download emails to check unique
        axios({
            url: `${process.env.REACT_APP_API}Contacts/GetEmails`,
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then((response) => {
            setEmails(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    // reset subcategory after category change
    useEffect(() => {
        setSelectedSubCategory(null)
        setSubCategory("")
    }, [selectedCategory]);

    return (
        <DashboardLayout>
            <DashboardNavbar />
            {/* header */}
            <VuiBox py={3}>
                <VuiBox mb={3}>
                    <Card>
                        <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb="22px">
                            <VuiTypography variant="lg" color="white">
                                Dodaj nowy kontakt
                            </VuiTypography>
                            <VuiBox>
                                <VuiButton color='success' onClick={() => addContact()}>
                                    <IoIosSave />
                                    Zapisz
                                </VuiButton>
                                <VuiButton color='dark' onClick={() => setAddNewContact(false)}>
                                    <IoIosArrowDropleftCircle />
                                    Powrót
                                </VuiButton>
                            </VuiBox>
                        </VuiBox>
                    </Card>
                </VuiBox>
            </VuiBox>

            {/* contact form */}
            <Grid container spacing={3}>
                <Grid item xs={0} md={3}>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
                        <VuiBox>
                            <VuiBox mb={1}>
                                <Label>Imię</Label>
                                <VuiInput
                                    value={name}
                                    onChange={(data) => setName(data.target.value)}
                                />
                            </VuiBox>
                            <VuiBox mb={1}>
                                <Label>Nazwisko</Label>
                                <VuiInput
                                    value={lastName}
                                    onChange={(data) => setLastName(data.target.value)}
                                />
                            </VuiBox>
                            <VuiBox mb={1}>
                                <Label>Email</Label>
                                <VuiInput
                                    value={email}
                                    onChange={(data) => setEmail(data.target.value)}
                                />
                            </VuiBox>
                            <VuiBox mb={1}>
                                <Label>Hasło</Label>
                                <VuiInput
                                    value={password}
                                    onChange={(data) => setPassword(data.target.value)}
                                />
                            </VuiBox>
                            <VuiBox mb={1}>
                                <Label>Kategoria</Label>
                                <Select 
                                    options={categories} 
                                    value={selectedCategory} 
                                    onChange={(data) => setSelectedCategory(data)}
                                    styles={{
                                        // set a dark mode
                                        control: (baseStyles) => ({
                                            ...baseStyles,
                                            backgroundColor: '#00000030 !important'
                                        })
                                    }} 
                                />
                            </VuiBox>
                            {selectedCategory !== null && selectedCategory.value === 1 &&
                                <VuiBox mb={1}>
                                    <Label>Podkategoria</Label>
                                <Select 
                                    options={subCategories} 
                                    value={selectedSubCategory} 
                                    onChange={(data) => setSelectedSubCategory(data)}
                                    styles={{
                                        // set a dark mode
                                        control: (baseStyles) => ({
                                            ...baseStyles,
                                            backgroundColor: '#00000030 !important'
                                        })
                                    }} 
                                />
                                </VuiBox>
                            }
                            {selectedCategory !== null && selectedCategory.value === 3 &&
                                <VuiBox mb={1}>
                                    <Label>Podkategoria</Label>
                                    <VuiInput
                                        value={subCategory}
                                        onChange={(data) => setSubCategory(data.target.value)}
                                    />
                                </VuiBox>
                            }
                            <VuiBox mb={1}>
                                <Label>Numer telefonu</Label>
                                <VuiInput
                                    value={phoneNumber}
                                    onChange={(data) => setPhoneNumber(data.target.value)}
                                />
                            </VuiBox>
                            <VuiBox>
                                <Label>Data urodzenia</Label>
                                <VuiInput
                                    type="date"
                                    value={birthDate}
                                    onChange={(data) => setBirthDate(data.target.value)}
                                />
                            </VuiBox>
                            
                        </VuiBox>
                    </Card>
                </Grid>
                <Grid item xs={0} md={3}>
                </Grid>
            </Grid>

        </DashboardLayout>
    );
};

export default AddContact;