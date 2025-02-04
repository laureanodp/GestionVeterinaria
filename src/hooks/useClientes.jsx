// src/hooks/useClientes.js
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchClientes,
  fetchClienteById,
  createCliente,
  updateCliente,
  deleteCliente,
  clearCliente
} from '../store/slice/clientesSlice';

export const useClientes = () => {
  const dispatch = useDispatch();
  const { clientes, cliente, loading, error } = useSelector((state) => state.clientes);

  // Obtener todos los clientes
  const getClientes = async () => {
    await dispatch(fetchClientes());
  };

  // Obtener un cliente por ID
  const getClienteById = async (id) => {
    await dispatch(fetchClienteById(id));
  };

  // Crear un cliente. clientData debe incluir los campos requeridos (nombre, telefono, email, y opcionalmente image si es FormData)
  const addCliente = async (clientData) => {
    await dispatch(createCliente(clientData));
  };

  // Actualizar un cliente
  const editCliente = async (id, clientData) => {
    await dispatch(updateCliente({ id, clientData }));
  };

  // Eliminar un cliente
  const removeCliente = async (id) => {
    await dispatch(deleteCliente(id));
  };

  // Limpiar el cliente seleccionado
  const clearSelectedCliente = () => {
    dispatch(clearCliente());
  };

  return {
    clientes,
    cliente,
    loading,
    error,
    getClientes,
    getClienteById,
    addCliente,
    editCliente,
    removeCliente,
    clearSelectedCliente
  };
};
