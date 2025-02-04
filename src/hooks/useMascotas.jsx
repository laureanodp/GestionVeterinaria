//useMascotas
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchMascotas,
  fetchMascotasPorCliente,
  addMascota,
  updateMascota,
  deleteMascota
} from '../store/slice/mascotasSlice';

export const useMascotas = () => {
  const dispatch = useDispatch();
  const { mascotas, loading, error } = useSelector(state => state.mascotas);

  const obtenerMascotas = () => {
    dispatch(fetchMascotas());
  };

  const obtenerMascotasPorCliente = (clienteId) => {
    dispatch(fetchMascotasPorCliente(clienteId));
  };

  const agregarMascota = async (mascotaData) => {
    await dispatch(addMascota(mascotaData));
  };

  const actualizarMascota = async (id, mascotaData) => {
    await dispatch(updateMascota({ id, mascotaData }));
  };

  const eliminarMascota = async (id) => {
    await dispatch(deleteMascota(id));
  };

  return {
    mascotas,
    loading,
    error,
    obtenerMascotas,
    obtenerMascotasPorCliente,
    agregarMascota,
    actualizarMascota,
    eliminarMascota,
  };
};
