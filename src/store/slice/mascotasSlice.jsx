//mascotasSlice
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

// Obtener todas las mascotas
export const fetchMascotas = createAsyncThunk(
  'mascotas/fetchMascotas',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/mascotas');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Obtener mascotas por cliente
export const fetchMascotasPorCliente = createAsyncThunk(
  'mascotas/fetchMascotasPorCliente',
  async (clienteId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/mascotas/cliente/${clienteId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Agregar una mascota
export const addMascota = createAsyncThunk(
  'mascotas/addMascota',
  async (mascotaData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      Object.keys(mascotaData).forEach((key) => {
        formData.append(key, mascotaData[key]);
      });

      const response = await axios.post('/mascotas', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Actualizar una mascota
export const updateMascota = createAsyncThunk(
  'mascotas/updateMascota',
  async ({ id, mascotaData }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      Object.keys(mascotaData).forEach((key) => {
        formData.append(key, mascotaData[key]);
      });

      const response = await axios.put(`/mascotas/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Eliminar una mascota
export const deleteMascota = createAsyncThunk(
  'mascotas/deleteMascota',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/mascotas/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const mascotasSlice = createSlice({
  name: 'mascotas',
  initialState: {
    mascotas: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMascotas.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMascotas.fulfilled, (state, action) => {
        state.loading = false;
        state.mascotas = action.payload;
      })
      .addCase(fetchMascotas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMascotasPorCliente.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMascotasPorCliente.fulfilled, (state, action) => {
        state.loading = false;
        state.mascotas = action.payload;
      })
      .addCase(fetchMascotasPorCliente.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addMascota.pending, (state) => {
        state.loading = true;
      })
      .addCase(addMascota.fulfilled, (state, action) => {
        state.loading = false;
        state.mascotas.push(action.payload);
      })
      .addCase(addMascota.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateMascota.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateMascota.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.mascotas.findIndex(m => m._id === action.payload._id);
        if (index !== -1) {
          state.mascotas[index] = action.payload;
        }
      })
      .addCase(updateMascota.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteMascota.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteMascota.fulfilled, (state, action) => {
        state.loading = false;
        state.mascotas = state.mascotas.filter(m => m._id !== action.payload);
      })
      .addCase(deleteMascota.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default mascotasSlice.reducer;
