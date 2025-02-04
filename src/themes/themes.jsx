// themes.js
import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#72ad75", // Verde principal (AppBar y botones)
    },
    secondary: {
      main: "#ffab07", // Amarillo vibrante para acentos y botones secundarios
    },
    background: {
      default: "#f5f5f5", // Fondo general claro
      paper: "#ffffff", // Cartas y modales
    },
    text: {
      primary: "#333333", // Texto principal en negro suave
      secondary: "#0e8d94", // Azul verdoso para resaltar información
    },
    link: {
      main: "#0e8d94", // Links en azul verdoso para buena visibilidad
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#0e8d94",
          "&:hover": { textDecoration: "underline" },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#72ad75", // Verde principal en la barra de navegación
          color: "#ffffff",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: "#72ad75",
          color: "#ffffff",
          "&:hover": { backgroundColor: "#5e9a60" },
    
        },
      },
    },
    MuiPagination: {
  styleOverrides: {
    root: {
      "& .MuiPaginationItem-page.Mui-selected": {
        color: "#ffffff", // Cambia el color de la página seleccionada a blanco
      },
    },
  },
}
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#0e8d94", // Azul verdoso para AppBar y botones principales
    },
    secondary: {
      main: "#e9d558", // Amarillo suave como acento
    },
    background: {
      default: "#1e1e1e", // Fondo oscuro principal
      paper: "#25292e", // Superficie secundaria en un tono gris oscuro
    },
    text: {
      primary: "#e0e0e0", // Texto principal en gris claro
      secondary: "#e9d558", // Texto de acento en amarillo suave
    },
    link: {
      main: "#e9d558", // Links en amarillo para que destaquen
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#e9d558",
          "&:hover": { textDecoration: "underline" },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#0e8d94", // Azul verdoso para AppBar en modo oscuro
          color: "#ffffff",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: "#0e8d94",
          "&:hover": { backgroundColor: "#0c7c83" },
        },
      },
    },
  },
});

