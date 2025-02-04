import { Box, Breadcrumbs, Typography, Link } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const Breadcrumb = () => {
  const location = useLocation();
  // Separamos la ruta y eliminamos los segmentos vacíos
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
        {/* Enlace al Home siempre presente */}
        <Link
          component={RouterLink}
          to="/clientes"
          sx={{
            textDecoration: "none",
            color: "text.secondary",
            display: "flex",
            alignItems: "center",
            transition: "color 0.3s ease",
            "&:hover": { color: "primary.main" },
          }}
        >
          Inicio
        </Link>

        {/* Generamos dinámicamente los links a partir de la ruta */}
        {pathnames.map((value, index) => {
          // Reconstruimos la ruta acumulada para cada segmento
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          
          // En el último elemento solo mostramos el texto en negrita
          return isLast ? (
            <Typography
              key={to}
              color="text.primary"
              sx={{ fontWeight: "bold", fontSize: "0.875rem" }}
            >
              {value}
            </Typography>
          ) : (
            <Link
              key={to}
              component={RouterLink}
              to={to}
              sx={{
                textDecoration: "none",
                color: "text.secondary",
                display: "flex",
                alignItems: "center",
                transition: "color 0.3s ease",
                "&:hover": { color: "primary.main" },
              }}
            >
              {value}
            </Link>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
};

export default Breadcrumb;