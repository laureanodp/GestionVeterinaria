import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Grid,
  useMediaQuery,
  useTheme,
  MenuItem,
  Menu,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import logo from "../../assets/logo.png";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { alpha } from "@mui/material";
import { useColorMode } from "../../themes/tema";
import {useAuth} from "../../hooks/useAuth"
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": { backgroundColor: alpha(theme.palette.common.white, 0.25) },
  width: "100%",
  [theme.breakpoints.up("sm")]: { width: "auto", marginLeft: theme.spacing(1) },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, `calc(1em + ${theme.spacing(4)})`),
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": { width: "24ch" },
    },
  },
}));

const AppBarComponent = ({ onMenuClick, showMenu = true, showSearch = true, showAccount = true, onSearch }) => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { toggleColorMode } = useColorMode(); // Hook para cambiar el tema

  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl)

  const toggleSearch = () => setIsSearchActive(!isSearchActive);
  const handleSearchChange = (e) => {
   const value = e.target.value;
   setSearchValue(value);
   if (onSearch) {
     onSearch(value);
   }
  };


 const handleAcountMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAcountClose = () => {
    setAnchorEl(null);
  };

  const handleLogout =   () => {
    logout();
    handleAcountClose();
     // eslint-disable-next-line no-self-assign
     window.location.href = window.location.href;
  };





  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container alignItems="center" justifyContent="space-between">
          {/* Menú y Logo */}
          <Grid item display="flex" alignItems="center">
            {showMenu && (
              <IconButton edge="start" color="inherit" onClick={onMenuClick}>
                <MenuIcon />
              </IconButton>
              
            )}
            {/* Logo siempre visible */}
            <Box
              component="img"
              src={logo}
              alt="Logo Veterinaria"
              sx={{ height: 40, width: 40, borderRadius: "50%", mx: 1.5 }}
            />
            {!isSmallScreen && <Typography variant="h6">Veterinaria</Typography>}
          </Grid>

          {/* Campo de búsqueda */}
          {(isSearchActive || !isSmallScreen) && showSearch && (
            <Grid item xs={isSearchActive ? true : "auto"}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase placeholder="Buscar..." onChange={handleSearchChange} inputProps={{ "aria-label": "search" }} />
              </Search>
            </Grid>
          )}

          {/* Botones secundarios */}
          <Grid item>
            <Grid container alignItems="center" spacing={1}>
              {/* Ícono de búsqueda en modo responsive */}
              {isSmallScreen && showSearch && (
                <Grid item>
                  <IconButton color="inherit" onClick={toggleSearch}>
                    {isSearchActive ? <CloseIcon /> : <SearchIcon />}
                  </IconButton>
                </Grid>
              )}
              {/* Botón para cambiar tema (siempre visible) */}
              {!(isSmallScreen && showAccount) && (
              <Grid item>
                <IconButton onClick={toggleColorMode} color="inherit">
                  {theme.palette.mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
                </IconButton>
              </Grid>
              )}
              {/* Ícono de cuenta */}
              {!isSmallScreen && showAccount && (
                <Grid item>
                  <IconButton color="inherit" onClick={handleAcountMenu}>
                    <AccountCircle />
                  </IconButton>
                  <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom', 
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleAcountClose}
                  sx={{mt:1}}
                >
                  <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
                </Menu>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;