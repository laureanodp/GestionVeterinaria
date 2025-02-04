import { Box } from "@mui/material";
import AppBarComponent from "../components/AppBarComponents/AppBarComponent";
import { Outlet } from "react-router-dom";
import Footer from '../components/FootersComponents/FooterComponent';
const AuthLayout = () => {
  return (
   <Box sx={{ flexGrow: 1 }}>
    <Box>
      <AppBarComponent
          showSearch={false}
          showAccount={false}
          showMenu={false}
      />
      <Outlet  />
      
    </Box>
     <Footer />
     </Box>
  );
};

export default AuthLayout;