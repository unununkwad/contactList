// Vision UI Dashboard React layouts
import Contacts from "views/Contacts";
import Login from "views/Login";
import Logout from "views/Logout";

// Vision UI Dashboard React icons
import { IoIosLogIn, IoIosLogOut } from "react-icons/io";
import { BsFillPersonFill } from "react-icons/bs";

  // menu
  const routes = [
    {
      type: "collapse",
      name: "Lista kontaktów",
      key: "contacts",
      route: "/contacts",
      icon: <BsFillPersonFill size="15px" color="inherit" />,
      component: Contacts,
      noCollapse: true,
      showLoggedIn: true,
      withoutLogin: true,
    },
    {
      type: "collapse",
      name: "Zaloguj",
      key: "login",
      route: "/login",
      icon: <IoIosLogIn size="15px" color="inherit" />,
      component: Login,
      noCollapse: true,
      showLoggedIn: true,
      withoutLogin: false,
    },
    {
      type: "collapse",
      name: "Wyloguj",
      key: "logout",
      route: "/",
      icon: <IoIosLogOut size="15px" color="inherit" />,
      component: Logout,
      noCollapse: true,
      showLoggedIn: false,
      withoutLogin: false,
    }
  ];

export default routes;
