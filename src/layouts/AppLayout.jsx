import { useState } from "react";
import { Box } from "@mui/material";
import AppBarComponent from "../components/AppBarComponents/AppBarComponent";
import DrawerComponent from "../components/AppBarComponents/DrawerComponent";
import Breadcrumb from "../components/AppBarComponents/Breadcrumb";
import { Outlet} from "react-router-dom";
import Footer from '../components/FootersComponents/FooterComponent';

const AppLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
 
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBarComponent onMenuClick={toggleDrawer} onSearch={setSearchQuery} />
      <DrawerComponent open={drawerOpen} onClose={toggleDrawer} />
      <Breadcrumb  />
        <Outlet context={{ searchQuery }}/>
        <Footer />
    </Box>
    
  );
};

export default AppLayout;
