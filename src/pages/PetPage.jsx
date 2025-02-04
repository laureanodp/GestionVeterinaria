import { useState, useCallback, useEffect } from 'react';
import {
  Box,
  Grid,
  IconButton,
  TextField,
  Button,
  Avatar,
  Autocomplete,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PetCard from "../components/CardsComponents/PetCard";
import PaginationComponent from "../components/PaginationComponent/PaginationComponent";
import ModalForm from "../components/ModalComponent/ModalFormComponent";
import useModal from '../hooks/useModal';
import { useOutletContext } from "react-router-dom";
import { useMascotas } from '../hooks/useMascotas';
import { useClientes } from '../hooks/useClientes';

const initialModalData = {
  nombre: '',
  especie: '',
  raza: '',
  edad: '',
  imageUrl: null,
  cliente_id: '',
};

const PetList = () => {
  const { searchQuery } = useOutletContext();
  const { mascotas, loading, error, obtenerMascotas, agregarMascota, actualizarMascota, eliminarMascota } = useMascotas();
  const { clientes, loading: loadingClientes, error: errorClientes, getClientes } = useClientes();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

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
    setModalData, // Importante: usamos setModalData directamente del hook
  } = useModal(initialModalData);

  useEffect(() => {
    obtenerMascotas();
    getClientes();
  }, []);

  // Modificamos para preparar los datos antes de abrir el modal
  const openModal = useCallback((pet, isDelete = false) => {
    if (pet) {
      // Preparamos los datos antes de abrir el modal
      const preparedData = {
        ...pet,
        // Si el cliente_id es un objeto, extraemos su _id
        cliente_id: pet.cliente_id?._id || pet.cliente_id
      };
      handleModal(preparedData, isDelete);
    } else {
      handleModal();
    }
  }, [handleModal]);

  const onConfirm = useCallback(async (data, { isDeleteMode, isEditMode }) => {
    try {
      if (isDeleteMode) {
        await eliminarMascota(data._id);
      } else if (isEditMode) {
        // Creamos una copia limpia de los datos
        const updatedData = {
          _id: data._id,
          nombre: data.nombre,
          especie: data.especie,
          raza: data.raza,
          edad: data.edad,
          cliente_id: data.cliente_id,
          imageUrl: data.imageUrl
        };

        // Si hay una nueva imagen, la incluimos
        if (data.image) {
          updatedData.image = data.image;
        }

        await actualizarMascota(data._id, updatedData);
      } else {
        await agregarMascota(data);
      }
      
      obtenerMascotas(); // Actualizamos la lista después de cualquier operación
    } catch (error) {
      console.error('Error en la operación:', error);
    }
  }, [eliminarMascota, actualizarMascota, agregarMascota, obtenerMascotas]);

  const handleClienteChange = (event, value) => {
    setModalData(prev => ({
      ...prev,
      cliente_id: value ? value._id : ''
    }));
  };

  const filteredPets = mascotas.filter(pet =>
    pet.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedPets = filteredPets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Box
          sx={{
            boxShadow: 3,
            p: 3,
            borderRadius: 2,
            backgroundColor: "background.paper",
          }}
        >
          <Grid container spacing={3}>
            {paginatedPets.map((pet) => (
              <Grid item xs={12} sm={6} md={4} key={pet._id}>
                <PetCard
                  pet={pet}
                  onClick={() => console.log(pet)}
                  onEdit={() => openModal(pet)} // Usamos openModal en lugar de handleModal
                  onDelete={() => openModal(pet, true)}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        <PaginationComponent
          count={Math.ceil(filteredPets.length / itemsPerPage)}
          page={currentPage}
          onChange={(event, page) => setCurrentPage(page)}
        />
      </Box>

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
        onClick={() => openModal()}
      >
        <AddIcon sx={{ fontSize: { xs: 32, md: 40 } }} />
      </IconButton>

      <ModalForm
        open={modalOpen}
        handleClose={handleCloseModal}
        handleConfirm={() => handleConfirmModal(onConfirm)}
        title={
          isDeleteMode
            ? 'Eliminar Mascota'
            : isEditMode
            ? 'Editar Mascota'
            : 'Crear Mascota'
        }
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
            {!isEditMode && (
              <Autocomplete
                options={clientes}
                getOptionLabel={(client) => client.nombre}
                onChange={handleClienteChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Buscar cliente"
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                )}
              />
            )}
          </Box>
        )}
      </ModalForm>
    </>
  );
};

export default PetList;
