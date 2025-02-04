import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Grid,
  useMediaQuery,
  useTheme,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import PetsIcon from "@mui/icons-material/Pets"; 
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; 
import Brightness4Icon from "@mui/icons-material/Brightness4"; 
import Brightness7Icon from "@mui/icons-material/Brightness7"; 
import ExitToAppIcon from "@mui/icons-material/ExitToApp"; 
import logo from "../../assets/logo.png"; 
import { useColorMode } from "../../themes/tema"; 
import { useAuth } from "../../hooks/useAuth";

const drawerItems = [
  { label: "Clientes", icon: <PeopleIcon />, href: "/clientes" },
  { label: "Mascotas", icon: <PetsIcon />, href: "/mascotas" }, 
];

const DrawerComponent = ({ open, onClose }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { toggleColorMode } = useColorMode();
  const appBarHeight = isSmallScreen ? 56 : 64;
  const { user, logout } = useAuth();
  // Función para manejar el logout
  const handleLogout = () => {
    logout();
     // eslint-disable-next-line no-self-assign
     window.location.href = window.location.href;
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: 250, 
          height: "100%", 
          backgroundColor: "background.paper",
          top: 0,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {/* Parte superior del Drawer que emula el AppBar */}
      <Box
        sx={{
          backgroundColor: "primary.main", 
          color: "white",
          display: "flex",
          alignItems: "center",
          padding: "16px",
          height: appBarHeight, 
        }}
      >
        <IconButton
          onClick={onClose} 
          sx={{ color: "white" }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
          <Box
            component="img"
            src={logo}
            alt="Logo Veterinaria"
            sx={{ height: 40, width: 40, borderRadius: "50%", mx: 1.5 }}
          />
          <Typography variant="h6">Veterinaria</Typography>
        </Box>
      </Box>

      {/* Título "Listados" con divisor */}
      <Box sx={{ paddingX: 2, paddingTop: 3  }}>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "text.primary" }}>
          Listados
        </Typography>
        <Divider sx={{ my: 1 }} /> 
      </Box>

      <Box
        sx={{ overflowY: "auto", paddingLeft: 1, paddingBottom: 2, flexGrow: 1 }}
      >
        <List>
          {drawerItems.map((item, index) => (
            <ListItem
              button
              key={index}
              onClick={onClose}
              component={Link}
              to={item.href}
              sx={{
                color: "text.primary",
                "&:hover": {
                  backgroundColor: "action.hover",
                },
              }}
            >
              <ListItemIcon sx={{ color: "primary.main" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Parte inferior del Drawer (solo en modo responsive) */}
            {isSmallScreen && (
        <Box sx={{ paddingX: 2, paddingY: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "text.primary", mb: 1 }}>
            Configuración
          </Typography>
           <Divider sx={{ mb: 2 }} />
          <Grid container alignItems="center" spacing={2}>
            <Grid item sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton onClick={toggleColorMode} color="inherit">
                {theme.palette.mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
              </IconButton>
              <Typography variant="body2">Modo {theme.palette.mode === "light" ? "Oscuro" : "Claro"}</Typography>
            </Grid>
            <Grid item sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton onClick={handleLogout} color="inherit">
                <ExitToAppIcon />
              </IconButton>
              <Typography variant="body2">Cerrar sesión</Typography>
            </Grid>
          </Grid>
        </Box>
      )}
    </Drawer>
  );
};

export default DrawerComponent;