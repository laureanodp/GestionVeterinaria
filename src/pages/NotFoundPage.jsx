import { Container, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import NotFoundIcon from "@mui/icons-material/ErrorOutline";

const NotFoundPage = () => {
  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 10 }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <NotFoundIcon sx={{ fontSize: 80, color: "error.main" }} />
        <Typography variant="h3" component="h1" gutterBottom>
          404 - Página no encontrada
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          La página que estás buscando no existe o ha sido movida.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/"
          sx={{ mt: 3 }}
        >
          Volver al inicio
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;