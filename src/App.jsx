// App.js
import { Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";
import Login from "./pages/LogInPage";
import Signup from "./pages/RegisterPage";
import Home from "./pages/Home";
import PetList from "./pages/PetPage";
import ClientProfile from "./pages/ClientProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./utils/ProtectedRoute";
import PublicRoute from "./utils/PublicRoute";

const App = () => {
  return (
    <Routes>
      {/* Rutas sin protección (Login y Signup) */}
      <Route element={<AuthLayout />}>
          <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
      </Route>

      {/* Rutas dentro del sistema */}
      <Route element={<AppLayout />}>
           <Route path="/clientes" element={<ProtectedRoute><Home /></ProtectedRoute> } />
           <Route path="/mascotas" element={<ProtectedRoute><PetList/></ProtectedRoute>} />
           <Route path="/clientes/:id" element={<ProtectedRoute><ClientProfile/></ProtectedRoute>} />
      </Route>

      {/* Página 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;

