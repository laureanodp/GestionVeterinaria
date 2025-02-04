import { useState, useCallback } from "react";
import {
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Avatar,
  Box,
  Button,
  ListItemIcon,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ClientCard = ({ client, onClick, onEdit, onDelete }) => {
  const [menuState, setMenuState] = useState({ anchorEl: null, open: false });
  const [cardState, setCardState] = useState({ isHovered: false, isSelecting: false });

  const handleMenu = useCallback((anchorEl = null) => {
    setMenuState({ anchorEl, open: Boolean(anchorEl) });
  }, []);

  const handleCardState = useCallback((updates) => {
    setCardState((prev) => ({ ...prev, ...updates }));
  }, []);

  const handleMouseDown = useCallback((event) => {
    // Si es clic derecho, no hacer nada
    if (event.button === 2) return;

    const startPos = { x: event.clientX, y: event.clientY };
    const timeoutId = setTimeout(() => {
      handleCardState({ isSelecting: true, isHovered: false });
    }, 200);

    const handleMouseUp = (upEvent) => {
      clearTimeout(timeoutId);
      const moveDistance = Math.hypot(
        upEvent.clientX - startPos.x,
        upEvent.clientY - startPos.y
      );

      if (moveDistance < 5) {
        handleCardState({ isSelecting: false, isHovered: true });
      }
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mouseup", handleMouseUp);
  }, [handleCardState]);

  const handleContextMenu = useCallback(() => {
    
    handleCardState({ isHovered: false }); // Desactivar el hover
  }, [handleCardState]);

  const menuActions = {
    edit: () => {
      onEdit(client);
      handleMenu();
    },
    delete: () => {
      onDelete(client._id);
      handleMenu();
    },
  };

  const styleConfig = {
    card: {
      marginBottom: "16px",
      cursor: "pointer",
      position: "relative",
      backgroundColor: cardState.isHovered ? "#f5f5f5" : "inherit",
      transition: "background-color 0.3s ease",
    },
    menuButton: {
      position: "absolute",
      top: 8,
      right: 8,
      width: 40,
      height: 40,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "transparent",
      zIndex: 2,
    },
    content: {
      position: "relative",
      width: "100%",
      height: "100%",
      zIndex: 1,
    },
    avatar: {
      width: 56,
      height: 56,
      marginRight: 16,
      backgroundColor: client.imageUrl ? "transparent" : "#0e8d94",
    },
    profileButton: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 1,
    },
  };

  return (
    <Card
      style={styleConfig.card}
      onContextMenu={handleContextMenu} // Manejar clic derecho
    >
      <Box
        style={styleConfig.menuButton}
        onMouseEnter={() => handleCardState({ isHovered: false })}
      >
        <IconButton onClick={(e) => handleMenu(e.currentTarget)}>
          <MoreVertIcon />
        </IconButton>
      </Box>

      <Box
        style={styleConfig.content}
        onMouseEnter={() => !cardState.isSelecting && handleCardState({ isHovered: true })}
        onMouseLeave={() => handleCardState({ isHovered: false })}
        onMouseDown={handleMouseDown}
        onMouseUp={() => setTimeout(() => handleCardState({ isSelecting: false }), 0)}
      >
        <CardContent style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            alt={client.nombre}
            src={client.imageUrl}
            style={styleConfig.avatar}
          >
            {!client.imageUrl && client.nombre?.charAt(0).toUpperCase()}
          </Avatar>

          <div style={{ flex: 1 }}>
            <Typography variant="h6">{client.nombre}</Typography>
            <Typography variant="body2" color="textSecondary">
              Teléfono: {client.telefono}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Email: {client.email}
            </Typography>
          </div>
        </CardContent>
      </Box>

      {cardState.isHovered && !cardState.isSelecting && (
        <Box style={styleConfig.profileButton}>
          <Button
            variant="contained"
            color="primary"
            onMouseEnter={() => handleCardState({ isHovered: true })}
            onClick={onClick}
          >
            Visitar perfil
          </Button>
        </Box>
      )}

      <Menu
        anchorEl={menuState.anchorEl}
        open={menuState.open}
        onClose={() => handleMenu()}
        PaperProps={{ style: { marginTop: 8, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" } }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={menuActions.edit}>
          <ListItemIcon>
            <EditIcon fontSize="small" sx={{ color: "info.main" }} />
          </ListItemIcon>
          <Typography variant="body2">Editar</Typography>
        </MenuItem>
        <MenuItem onClick={menuActions.delete}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" sx={{ color: "error.main" }} />
          </ListItemIcon>
          <Typography variant="body2">Eliminar</Typography>
        </MenuItem>
      </Menu>
    </Card>
  );
};

export default ClientCard;


//client card-predefinitiva
// import { useState, useCallback } from "react";
// import {
//   Card,
//   CardContent,
//   IconButton,
//   Menu,
//   MenuItem,
//   Typography,
//   Avatar,
//   Box,
//   Button,
//   ListItemIcon,
// } from "@mui/material";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";

// const ClientCard = ({ client, onClick, onEdit, onDelete }) => {
//   const [menuState, setMenuState] = useState({ anchorEl: null, open: false });
//   const [cardState, setCardState] = useState({ isHovered: false, isSelecting: false });
  
//   const handleMenu = useCallback((anchorEl = null) => {
//     setMenuState({ anchorEl, open: Boolean(anchorEl) });
//   }, []);

//   const handleCardState = useCallback((updates) => {
//     setCardState(prev => ({ ...prev, ...updates }));
//   }, []);

//   const handleMouseDown = useCallback((event) => {
//     const startPos = { x: event.clientX, y: event.clientY };
//     const timeoutId = setTimeout(() => {
//       handleCardState({ isSelecting: true, isHovered: false });
//     }, 200);

//     const handleMouseUp = (upEvent) => {
//       clearTimeout(timeoutId);
//       const moveDistance = Math.hypot(
//         upEvent.clientX - startPos.x,
//         upEvent.clientY - startPos.y
//       );
      
//       if (moveDistance < 5) {
//         handleCardState({ isSelecting: false, isHovered: true });
//       }
//       document.removeEventListener('mouseup', handleMouseUp);
//     };

//     document.addEventListener('mouseup', handleMouseUp);
//   }, []);

//   const menuActions = {
//     edit: () => {
//       onEdit(client);
//       handleMenu();
//     },
//     delete: () => {
//       onDelete(client._id);
//       handleMenu();
//     }
//   };

//   const styleConfig = {
//     card: {
//       marginBottom: "16px",
//       cursor: "pointer",
//       position: "relative",
//       backgroundColor: cardState.isHovered ? "#f5f5f5" : "inherit",
//       transition: "background-color 0.3s ease",
//     },
//     menuButton: {
//       position: "absolute",
//       top: 8,
//       right: 8,
//       width: 40,
//       height: 40,
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       backgroundColor: "transparent",
//       zIndex: 2,
//     },
//     content: {
//       position: "relative",
//       width: "100%",
//       height: "100%",
//       zIndex: 1,
//     },
//     avatar: {
//       width: 56,
//       height: 56,
//       marginRight: 16,
//       backgroundColor: client.fotoPerfil ? "transparent" : "#0e8d94",
//     },
//     profileButton: {
//       position: "absolute",
//       top: "50%",
//       left: "50%",
//       transform: "translate(-50%, -50%)",
//       zIndex: 1,
//     }
//   };

//   return (
//     <Card style={styleConfig.card}>
//       <Box 
//         style={styleConfig.menuButton}
//         onMouseEnter={() => handleCardState({ isHovered: false })}
//       >
//         <IconButton onClick={(e) => handleMenu(e.currentTarget)}>
//           <MoreVertIcon />
//         </IconButton>
//       </Box>

//       <Box
//         style={styleConfig.content}
//         onMouseEnter={() => handleCardState({ isHovered: true })}
//         onMouseLeave={() => handleCardState({ isHovered: false })}
//         onMouseDown={handleMouseDown}
//         onMouseUp={() => setTimeout(() => handleCardState({ isSelecting: false }), 0)}
//       >
//         <CardContent style={{ display: "flex", alignItems: "center" }}>
//           <Avatar
//             alt={client.nombre}
//             src={client.fotoPerfil}
//             style={styleConfig.avatar}
//           >
//             {!client.fotoPerfil && client.nombre?.charAt(0).toUpperCase()}
//           </Avatar>

//           <div style={{ flex: 1 }}>
//             <Typography variant="h6">{client.nombre}</Typography>
//             <Typography variant="body2" color="textSecondary">
//               Teléfono: {client.telefono}
//             </Typography>
//             <Typography variant="body2" color="textSecondary">
//               Email: {client.email}
//             </Typography>
//           </div>
//         </CardContent>
//       </Box>

//       {cardState.isHovered && !cardState.isSelecting && (
//         <Box style={styleConfig.profileButton}>
//           <Button
//             variant="contained"
//             color="primary"
//             onMouseEnter={() => handleCardState({ isHovered: true })}
//             onClick={onClick}
//           >
//             Visitar perfil
//           </Button>
//         </Box>
//       )}

//       <Menu
//         anchorEl={menuState.anchorEl}
//         open={menuState.open}
//         onClose={() => handleMenu()}
//         PaperProps={{ style: { marginTop: 8, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}}
//         anchorOrigin={{ vertical: "top", horizontal: "right" }}
//         transformOrigin={{ vertical: "top", horizontal: "right" }}
//       >
//         <MenuItem onClick={menuActions.edit}>
//           <ListItemIcon>
//             <EditIcon fontSize="small" sx={{ color: "info.main" }}/>
//           </ListItemIcon>
//           <Typography variant="body2">Editar</Typography>
//         </MenuItem>
//         <MenuItem onClick={menuActions.delete}>
//           <ListItemIcon>
//             <DeleteIcon fontSize="small" sx={{ color: "error.main" }} />
//           </ListItemIcon>
//           <Typography variant="body2">Eliminar</Typography>
//         </MenuItem>
//       </Menu>
//     </Card>
//   );
// };

// export default ClientCard;