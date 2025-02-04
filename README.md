# Gestión Veterinaria

Este es un sistema de gestión para una veterinaria desarrollado con React y Redux Toolkit en el frontend, y una API en Node.js con Express y MongoDB en el backend. Permite administrar clientes y mascotas, incluyendo la carga de imágenes mediante Multer y autenticación con middleware.

## Características

- **Frontend**: React con Redux Toolkit y React Router Dom.
- **Backend**: Node.js con Express y MongoDB.
- **Estado Global**: Manejo con Redux Toolkit.
- **Autenticación**: Implementada con middleware en el backend.
- **Carga de Imágenes**: Utiliza Multer para la gestión de archivos.
- **Consultas de Datos**: Hooks personalizados para obtener clientes y mascotas en la página PetList.
- **Protección de Rutas**: Implementación de rutas públicas y protegidas.
- **Gestión de Clientes y Mascotas**: CRUD completo para clientes y mascotas.

## Estructura del Sistema

El sistema está organizado en las siguientes carpetas dentro de `src/`:

- `components/` → Componentes reutilizables de la aplicación.
- `hooks/` → Hooks personalizados para la obtención de datos y lógica de negocio.
- `layouts/` → Diseños generales utilizados en el sistema.
- `pages/` → Páginas principales de la aplicación.
- `store/` → Configuración de Redux Toolkit para el manejo del estado global.
- `themes/` → Configuración de temas y estilos.
- `utils/` → Utilidades y funciones auxiliares.
- `app.js` y `main.js` → Configuración principal de la aplicación.

## Estructura de Rutas

El sistema gestiona las rutas mediante `react-router-dom`, estableciendo autenticación y permisos de acceso:

### Rutas Públicas

- `/` → Página de Login
- `/signup` → Página de Registro

### Rutas Protegidas (Requieren Autenticación)

- `/clientes` → Página principal de clientes, permite visualizar, buscar, crear, editar y eliminar clientes.
- `/clientes/:id` → Perfil de un cliente, muestra su información personal y la lista de mascotas asociadas. Desde aquí se pueden gestionar las mascotas (crear, editar, eliminar).
- `/mascotas` → Listado general de todas las mascotas, donde también se puede realizar el CRUD completo.

### Página de Error

- `*` → Página 404 en caso de ruta inexistente.

## Instalación y Configuración

### Requisitos

- Node.js instalado en el sistema
- MongoDB en ejecución

### Clonar el Repositorio


git clone https://github.com/laureanodp/GestionVeterinaria
cd gestionveterinaria

Instalación de Dependencias
Ejecutar en la raíz del proyecto: npm install

Configuración del Entorno
Crear un archivo .env en la raíz del proyecto con las siguientes variables:
VITE_API_URL="Con string de conexion a la API"

Ejecutar el Proyecto
Modo Desarrollo: npm run dev

Construcción para Producción
npm run build
npm run preview

Uso
Acceder a la aplicación en http://localhost:5173

Crear, visualizar, buscar, editar y eliminar clientes desde la interfaz.

Acceder al perfil de cada cliente para ver su información detallada y gestionar sus mascotas.

Gestionar la lista general de mascotas con todas las funcionalidades CRUD.

Contribución
Si deseas contribuir a este proyecto, sigue estos pasos:

Haz un fork del repositorio.

Crea una nueva rama (git checkout -b feature/nueva-funcionalidad).

Realiza los cambios y confirma (git commit -m 'Agrega nueva funcionalidad').

Sube los cambios (git push origin feature/nueva-funcionalidad).

Abre un Pull Request.

Licencia
Este proyecto está bajo la licencia MIT.