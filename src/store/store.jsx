import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userSlice';
import clientesReducer from './slice/clientesSlice'
import mascotasReducer from './slice/mascotasSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    clientes: clientesReducer,
    mascotas: mascotasReducer,
  },
});
export default store;
