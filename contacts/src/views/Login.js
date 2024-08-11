import { useState } from "react";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import GradientBorder from "examples/GradientBorder";

// Vision UI Dashboard assets
import radialGradient from "assets/theme/functions/radialGradient";
import palette from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";

// Authentication layout components
import CoverLayout from "components/CoverLayout";

// Images
import bgSignIn from "assets/images/signInImage.png";

// Custom components
import Swal from 'sweetalert2/dist/sweetalert2.js';
import axios from "axios";
import { useHistory } from 'react-router-dom'

// sweetalert2 dark theme
import '@sweetalert2/theme-dark';

function Login() {
  // Set variables
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory()
    
  // Set error alert
  const showError = (title) => {
    Swal.fire({
        title: title,
        icon: "error",
        showConfirmButton: false,
        timer: 1500
    });
  };

  const login = () => {
    // send login data to backend
    axios({
        url: `${process.env.REACT_APP_API}Auth/Login`,
        method: 'POST',
        data: {
          Username: userName,
          Password: password
        }
    }).then((response) =>  {
        // set localstorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userName', response.data.userName);

        // go to home page
        history.push('/contacts')
    }).catch((error) => {
      console.log(error);
      showError("Niepoprawna nazwa użytkownika lub hasło");
    });
  };

  return (
    <CoverLayout
      title="Logowanie"
      color="white"
      premotto="Aby móc zarządzać kontaktami"
      motto="Zaloguj się"
      image={bgSignIn}
    >
      <VuiBox component="form" role="form">
        {/* user name input */}
        <VuiBox mb={2}>
          <VuiBox mb={1} ml={0.5}>
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              Nazwa użytkownika
            </VuiTypography>
          </VuiBox>
          <GradientBorder
            minWidth="100%"
            padding="1px"
            borderRadius={borders.borderRadius.lg}
            backgroundImage={radialGradient(
              palette.gradients.borderLight.main,
              palette.gradients.borderLight.state,
              palette.gradients.borderLight.angle
            )}
          >
            <VuiInput
              placeholder="Wprowadź nazwę użytkownika..." 
              fontWeight="500" 
              onChange={(data) => setUserName(data.target.value)} 
              onKeyPress={(e) => e.charCode === 13 && login()}
            />
          </GradientBorder>
        </VuiBox>

        {/* password input */}
        <VuiBox mb={2}>
          <VuiBox mb={1} ml={0.5}>
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              Hasło
            </VuiTypography>
          </VuiBox>
          <GradientBorder
            minWidth="100%"
            borderRadius={borders.borderRadius.lg}
            padding="1px"
            backgroundImage={radialGradient(
              palette.gradients.borderLight.main,
              palette.gradients.borderLight.state,
              palette.gradients.borderLight.angle
            )}
          >
            <VuiInput
              type="password"
              placeholder="Wprowadź hasło..."
              onChange={(data) => setPassword(data.target.value)}
              onKeyPress={(e) => e.charCode === 13 && login()}
            />
          </GradientBorder>
        </VuiBox>

        {/* login button */}
        <VuiBox mt={4} mb={1}>
          <VuiButton color="info" fullWidth onClick={() => login()}>
            Zaloguj
          </VuiButton>
        </VuiBox>
      </VuiBox>
    </CoverLayout>
  );
}

export default Login;
