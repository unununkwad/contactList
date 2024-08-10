import { useHistory } from "react-router-dom";

const Logout = () => {
  const history = useHistory()

  // cleaning localstorage
  localStorage.removeItem("token");
  localStorage.removeItem("username");

  // go to home page
  history.push("/contacts")
}

export default Logout;