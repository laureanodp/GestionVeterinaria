import { useState, useCallback, useEffect } from 'react';
import {
  Box,
  Grid,
  IconButton,
  TextField,
  Button,
  Avatar,
  Typography,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PetCard from "../components/CardsComponents/PetCard";
import ModalForm from "../components/ModalComponent/ModalFormComponent";
import PaginationComponent from "../components/PaginationComponent/PaginationComponent";
import useModal from '../hooks/useModal';
import { useOutletContext, useParams } from "react-router-dom";
import { useMascotas } from '../hooks/useMascotas';
import { useClientes } from '../hooks/useClientes';

// Datos iniciales para el modal (para mascotas)
const initialModalData = {
  nombre: '',
  especie: '',
  raza: '',
  edad: '',
  imageUrl: null,
};

const ClientProfile = () => {
  const { id: clientId } = useParams();
  const { searchQuery } = useOutletContext();

  // Usar hooks de Redux para obtener clientes y mascotas
  const { clientes, loading: loadingClientes, error: errorClientes, getClienteById } = useClientes();
  const { mascotas, loading: loadingMascotas, error: errorMascotas,  obtenerMascotasPorCliente, agregarMascota, actualizarMascota, eliminarMascota } = useMascotas();

  // Estado para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Usamos el custom hook para gestionar el modal
  const {
    modalOpen,
    modalData,
    isDeleteMode,
    isEditMode,
    previewImage,
    handleModal,
    handleCloseModal,
    handleConfirmModal,
    handleInputChange,
    handleImageUpload,
  } = useModal(initialModalData);

  // Obtener el cliente y sus mascotas al cargar el componente
  useEffect(() => {
    getClienteById(clientId); // Obtener el cliente por ID
     obtenerMascotasPorCliente(clientId); // Obtener las mascotas del cliente
  }, []);

  // Filtrar mascotas según el query de búsqueda
  const filteredPets = mascotas.filter(pet =>
    pet.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Mascotas paginadas (a partir de las filtradas)
  const paginatedPets = filteredPets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Obtener el cliente actual
  const client = clientes.find(client => client._id === clientId);

  // Callback que se ejecuta al confirmar el modal
  const onConfirm = useCallback(async (data, { isDeleteMode, isEditMode }) => {
    if (isDeleteMode) {
      // Lógica para eliminar la mascota
      await eliminarMascota(data._id);
    } else if (isEditMode) {
      // Lógica para editar la mascota
      console.log(data)
      await actualizarMascota(data._id, data);
     
    } else {
      // Lógica para crear una nueva mascota
      await agregarMascota({ ...data, cliente_id: clientId });
    }
    handleCloseModal();
  }, [eliminarMascota, actualizarMascota, agregarMascota, handleCloseModal, clientId]);

  return (
    <>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Grid container spacing={3}>
          {/* Columna izquierda: Perfil del cliente */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="h5" sx={{ mb: 3 }}>
                Perfil del Cliente
              </Typography>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                sx={{ mb: 3 }}
              >
                <Avatar
                  src={client?.imageUrl}
                  alt={client?.nombre}
                  sx={{ width: 100, height: 100, mb: 2 }}
                />
                <Typography variant="h6">{client?.nombre}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {client?.email}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Teléfono: {client?.telefono}
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Columna derecha: Mascotas asociadas */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="h5" sx={{ mb: 3 }}>
                Mascotas de {client?.nombre}
              </Typography>
              <Grid container spacing={3}>
                {paginatedPets.map((pet) => (
                  <Grid item xs={12} sm={6} key={pet._id}>
                    <PetCard
                      pet={pet}
                      onClick={() => console.log(`Navegar a detalles de ${pet.nombre}`)}
                      onEdit={() => handleModal(pet)}
                      onDelete={() => handleModal(pet, true)}
                    />
                  </Grid>
                ))}
              </Grid>
              {/* Paginador */}
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <PaginationComponent
                  count={Math.ceil(filteredPets.length / itemsPerPage)}
                  page={currentPage}
                  onChange={(event, page) => setCurrentPage(page)}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Botón flotante para abrir el modal en modo creación */}
      <IconButton
        sx={{
          position: "fixed",
          bottom: { xs: 32, md: 48 },
          right: { xs: 16, md: 32 },
          color: "#ffffff",
          bgcolor: "primary.main",
          width: { xs: 60, md: 72 },
          height: { xs: 60, md: 72 },
          "&:hover": { bgcolor: "primary.dark" },
          borderRadius: "50%",
        }}
        onClick={() => handleModal()}
      >
        <AddIcon sx={{ fontSize: { xs: 32, md: 40 } }} />
      </IconButton>

      {/* Modal para registrar/editar mascotas */}
      <ModalForm
        open={modalOpen}
        handleClose={handleCloseModal}
        handleConfirm={() => handleConfirmModal(onConfirm)}
        title={isDeleteMode ? 'Eliminar Mascota' : isEditMode ? 'Editar Mascota' : 'Registrar Mascota'}
      >
        {isDeleteMode ? (
          <Box>
            <p>
              ¿Estás seguro de que quieres eliminar la mascota:{" "}
              {modalData?.nombre}?
            </p>
          </Box>
        ) : (
          <Box>
            {/* Avatar y botón para subir imagen */}
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              sx={{ mb: 2 }}
            >
              <Avatar
              src={previewImage || modalData?.imageUrl}
              alt="Avatar"
              sx={{
                width: 100,
                height: 100,
                marginBottom: '16px',
              }}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
              id="image-upload"
              name="image"
            />
            <label htmlFor="image-upload">
              <Button variant="contained" component="span">
                Subir Imagen
              </Button>
            </label>
          </Box>
          <TextField
            label="Nombre"
            name="nombre"
            value={modalData?.nombre || ''}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Especie"
            name="especie"
            value={modalData?.especie || ''}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Raza"
            name="raza"
            value={modalData?.raza || ''}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Edad"
            name="edad"
            value={modalData?.edad || ''}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
          />
        </Box>
      )}
    </ModalForm>
  </>
);
};

 export default ClientProfile;
