// Home.js
import { useState, useCallback, useEffect } from 'react';
import { Box, Grid, IconButton, TextField, Button, Avatar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, useOutletContext } from "react-router-dom";
import ClientCard from "../components/CardsComponents/ClientCard";
import PaginationComponent from "../components/PaginationComponent/PaginationComponent";
import ModalForm from "../components/ModalComponent/ModalFormComponent";
import useModal from '../hooks/useModal';
import { useClientes } from '../hooks/useClientes';

// Datos iniciales para el modal (para clientes)
const initialModalData = {
  nombre: '',
  telefono: '',
  email: '',
  fotoPerfil: null, // Nota: este campo se corresponde con la imagen que se maneja en el modal
};

const Home = () => {
  // Obtenemos el query de búsqueda desde el outlet (o donde lo manejes)
  const { searchQuery } = useOutletContext();
  const navigate = useNavigate();

  // Utilizamos el custom hook para el modal
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

  // Utilizamos el hook de clientes que integra Redux
  const { clientes, loading, error, getClientes, addCliente, editCliente, removeCliente } = useClientes();

  // Al montar el componente, obtenemos los clientes desde la API
  useEffect(() => {
    getClientes();
  }, []);

  // onConfirm se ejecuta cuando se confirma el modal.
  // Dependiendo del modo, se realiza la acción correspondiente (crear, editar o eliminar).
  const onConfirm = useCallback((data, { isDeleteMode, isEditMode }) => {
    if (isDeleteMode) {
      removeCliente(data._id);
    } else if (isEditMode) {
      // Para la edición, se asume que el objeto `data` contiene el _id y los nuevos campos.
      editCliente(data._id, data);
    } else {
      addCliente(data);
    }
  }, [removeCliente, editCliente, addCliente]);

  // Filtrar clientes según el query de búsqueda
  const filteredClients = clientes.filter(client =>
    client.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Paginación: se definen la página actual y la cantidad de items por página
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const paginatedClients = filteredClients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

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
          {/* Se muestra un mensaje de carga o error según el estado */}
          {loading ? (
            <p>Cargando...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <Grid container spacing={3}>
              {paginatedClients.map((client) => (
                <Grid item xs={12} sm={6} md={4} key={client._id}>
                  <ClientCard
                    client={client}
                    onClick={() => navigate(`/clientes/${client._id}`)}
                    onEdit={() => handleModal(client)}
                    onDelete={() => handleModal(client, true)}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
        <PaginationComponent
          count={Math.ceil(filteredClients.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
        />
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

      {/* Modal para crear, editar o eliminar clientes */}
      <ModalForm
        open={modalOpen}
        handleClose={handleCloseModal}
        handleConfirm={() => handleConfirmModal(onConfirm)}
        title={
          isDeleteMode
            ? 'Eliminar Cliente'
            : isEditMode
            ? 'Editar Cliente'
            : 'Crear Cliente'
        }
      >
        {isDeleteMode ? (
          <Box>
            <p>
              ¿Estás seguro de que quieres eliminar el cliente:{" "}
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
                id="image"
                name="image"
              />
              <label htmlFor="image">
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
              label="Teléfono"
              name="telefono"
              value={modalData?.telefono || ''}
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Email"
              name="email"
              value={modalData?.email || ''}
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

export default Home;

// // Home.js
// import { useState, useCallback } from 'react';
// import { Box, Grid, IconButton, TextField, Button, Avatar } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import ClientCard from "../components/CardsComponents/ClientCard";
// import PaginationComponent from "../components/PaginationComponent/PaginationComponent";
// import ModalForm from "../components/ModalComponent/ModalFormComponent";
// import mockData from "../mocks/usersMock.json";
// import useModal from '../hooks/useModal'; 
// import { useOutletContext, useNavigate } from "react-router-dom";

// // Datos iniciales para el modal (para clientes)
// const initialModalData = {
//   nombre: '',
//   telefono: '',
//   email: '',
//   fotoPerfil: null,
// };

// const Home = () => {
//   // Estado para los clientes y paginación
//   const { searchQuery } = useOutletContext();
//   const [clients, setClients] = useState(mockData);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 9;
//   const navigate = useNavigate();
//   // Usamos el custom hook para gestionar el modal
//   const {
//     modalOpen,
//     modalData,
//     isDeleteMode,
//     isEditMode,
//     previewImage,
//     handleModal,
//     handleCloseModal,
//     handleConfirmModal,
//     handleInputChange,
//     handleImageUpload,
//   } = useModal(initialModalData);

//   // Handler para la paginación
//   const handlePageChange = (event, page) => {
//     setCurrentPage(page);
//   };

//   // Callback que se ejecuta al confirmar el modal
//   const onConfirm = useCallback((data, { isDeleteMode, isEditMode }) => {
//     if (isDeleteMode) {
//       // Lógica para eliminar el cliente
//       console.log('Eliminar cliente', data);
//       // Ejemplo:  setClients(prev => prev.filter(client => client._id !== data._id));
//     } else if (isEditMode) {
//       // Lógica para editar el cliente
//       console.log('Editar cliente', data);
//       // Ejemplo: setClients(prev => prev.map(client => client._id === data._id ? data : client));
//     } else {
//       // Lógica para crear un nuevo cliente
//       console.log('Crear cliente', data);
//       // Ejemplo: setClients(prev => [...prev, { ...data, _id: Date.now().toString() }]);
//     }
//   }, []);


//     // Filtrar clientes según el query de búsqueda
//   const filteredClients = clients.filter(client =>
//     client.nombre.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Clientes paginados (a partir de los filtrados)
//   const paginatedClients = filteredClients.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   return (
    
//     <>
//       <Box sx={{ flexGrow: 1, p: 3 }}>
//         <Box
//           sx={{
//             boxShadow: 3,
//             p: 3,
//             borderRadius: 2,
//             backgroundColor: "background.paper",
//           }}
//         >
//           <Grid container spacing={3}>
//             {paginatedClients.map((client) => (
//               <Grid item xs={12} sm={6} md={4} key={client._id}>
//                 <ClientCard
//                   client={client}
//                   onClick={() => navigate(`/clientes/${client._id}`)}
//                   onEdit={() => handleModal(client)}
//                   onDelete={() => handleModal(client, true)}
//                 />
//               </Grid>
//             ))}
//           </Grid>
//         </Box>
//         <PaginationComponent
//           count={Math.ceil(filteredClients.length / itemsPerPage)}
//           page={currentPage}
//           onChange={handlePageChange}
//         />
//       </Box>

//       {/* Botón flotante para abrir el modal en modo creación */}
//       <IconButton
//         sx={{
//           position: "fixed",
//           bottom: { xs: 32, md: 48 },
//           right: { xs: 16, md: 32 },
//           color: "#ffffff",
//           bgcolor: "primary.main",
//           width: { xs: 60, md: 72 },
//           height: { xs: 60, md: 72 },
//           "&:hover": { bgcolor: "primary.dark" },
//           borderRadius: "50%",
//         }}
//         onClick={() => handleModal()} 
//       >
//         <AddIcon sx={{ fontSize: { xs: 32, md: 40 } }} />
//       </IconButton>

//       {/* Modal */}
//       <ModalForm
//         open={modalOpen}
//         handleClose={handleCloseModal}
//         // Se pasa el callback onConfirm al custom hook
//         handleConfirm={() => handleConfirmModal(onConfirm)}
//         title={
//           isDeleteMode
//             ? 'Eliminar Cliente'
//             : isEditMode
//             ? 'Editar Cliente'
//             : 'Crear Cliente'
//         }
//       >
//         {isDeleteMode ? (
//           <Box>
//             <p>
//               ¿Estás seguro de que quieres eliminar el cliente:{" "}
//               {modalData?.nombre}?
//             </p>
//           </Box>
//         ) : (
//           <Box>
//             {/* Avatar y botón para subir imagen */}
//             <Box
//               display="flex"
//               flexDirection="column"
//               alignItems="center"
//               justifyContent="center"
//               sx={{ mb: 2 }}
//             >
//               <Avatar
//                 src={previewImage || modalData?.fotoPerfil}
//                 alt="Avatar"
//                 sx={{
//                   width: 100,
//                   height: 100,
//                   marginBottom: '16px',
//                 }}
//               />
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageUpload}
//                 style={{ display: 'none' }}
//                 id="image-upload"
//                 name="fotoPerfil"
//               />
//               <label htmlFor="image-upload">
//                 <Button variant="contained" component="span">
//                   Subir Imagen
//                 </Button>
//               </label>
//             </Box>
//             <TextField
//               label="Nombre"
//               name="nombre"
//               value={modalData?.nombre || ''}
//               onChange={handleInputChange}
//               fullWidth
//               sx={{ mb: 2 }}
//             />
//             <TextField
//               label="Teléfono"
//               name="telefono"
//               value={modalData?.telefono || ''}
//               onChange={handleInputChange}
//               fullWidth
//               sx={{ mb: 2 }}
//             />
//             <TextField
//               label="Email"
//               name="email"
//               value={modalData?.email || ''}
//               onChange={handleInputChange}
//               fullWidth
//               sx={{ mb: 2 }}
//             />
//           </Box>
//         )}
//       </ModalForm>
//     </>
//   );
// };

// export default Home;