// src/store/slice/clientesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios'; // Asegúrate de tener configurado axios con la URL base y token (si aplica)

// Obtener todos los clientes del usuario autenticado
export const fetchClientes = createAsyncThunk(
  'clientes/fetchClientes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/clientes');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Obtener un cliente por su ID
export const fetchClienteById = createAsyncThunk(
  'clientes/fetchClienteById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/clientes/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Crear un nuevo cliente
export const createCliente = createAsyncThunk(
  'clientes/createCliente',
  async (clientData, { rejectWithValue }) => {
    try {
      // Si se envía una imagen u otros datos mixtos, usamos FormData
      const formData = new FormData();
      Object.keys(clientData).forEach((key) => {
        formData.append(key, clientData[key]);
      });

      const response = await axios.post('/clientes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Actualizar un cliente existente
export const updateCliente = createAsyncThunk(
  'clientes/updateCliente',
  async ({ id, clientData }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      Object.keys(clientData).forEach((key) => {
        formData.append(key, clientData[key]);
      });

      const response = await axios.put(`/clientes/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Eliminar un cliente
export const deleteCliente = createAsyncThunk(
  'clientes/deleteCliente',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/clientes/${id}`);
      // Devolvemos el id eliminado para actualizar el estado
      return { id, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const clientesSlice = createSlice({
  name: 'clientes',
  initialState: {
    clientes: [],
    cliente: null, // Cliente seleccionado o detallado
    loading: false,
    error: null
  },
  reducers: {
    // Reducer para limpiar el cliente seleccionado
    clearCliente: (state) => {
      state.cliente = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // fetchClientes
      .addCase(fetchClientes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClientes.fulfilled, (state, action) => {
        state.loading = false;
        state.clientes = action.payload;
      })
      .addCase(fetchClientes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error || 'Error al obtener los clientes';
      })
      // fetchClienteById
      .addCase(fetchClienteById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClienteById.fulfilled, (state, action) => {
        state.loading = false;
        state.cliente = action.payload;
      })
      .addCase(fetchClienteById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error || 'Error al obtener el cliente';
      })
      // createCliente
      .addCase(createCliente.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCliente.fulfilled, (state, action) => {
        state.loading = false;
        // Agregamos el cliente creado al arreglo
        state.clientes.push(action.payload);
      })
      .addCase(createCliente.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error || 'Error al crear el cliente';
      })
      // updateCliente
      .addCase(updateCliente.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCliente.fulfilled, (state, action) => {
        state.loading = false;
        // Actualizamos el cliente en el arreglo
        state.clientes = state.clientes.map((cliente) =>
          cliente._id === action.payload._id ? action.payload : cliente
        );
        // Si el cliente actualizado es el seleccionado, lo actualizamos también
        if (state.cliente && state.cliente._id === action.payload._id) {
          state.cliente = action.payload;
        }
      })
      .addCase(updateCliente.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error || 'Error al actualizar el cliente';
      })
      // deleteCliente
      .addCase(deleteCliente.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCliente.fulfilled, (state, action) => {
        state.loading = false;
        // Filtramos el cliente eliminado del arreglo
        state.clientes = state.clientes.filter(
          (cliente) => cliente._id !== action.payload.id
        );
      })
      .addCase(deleteCliente.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error || 'Error al eliminar el cliente';
      });
  }
});

export const { clearCliente } = clientesSlice.actions;
export default clientesSlice.reducer;
