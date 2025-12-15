# 🛒 Sistema de Gestión de Tienda - Frontend

## 📖 Descripción

Frontend de aplicación e-commerce desarrollado con React 19 y TypeScript. Incluye catálogo de productos, carrito de compras, sistema de autenticación y panel de administración.

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js 18+
- npm o yarn

### Instalación
```bash
# Clonar repositorio
git clone <repo-url>
cd SistemaGestionTienda-FrontEnd-React

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📜 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia servidor de desarrollo |
| `npm run build` | Genera build de producción |
| `npm run preview` | Preview del build de producción |
| `npm run lint` | Ejecuta ESLint |
| `npm run test` | Ejecuta tests con Vitest |

## 🏗️ Tecnologías

- **React 19** - UI Framework
- **TypeScript 5.9** - Tipado estático
- **Vite 7** - Build tool
- **React Router 7** - Enrutamiento
- **Axios** - Cliente HTTP
- **Bootstrap 5** - Estilos CSS
- **Vitest** - Testing

## 📁 Estructura del Proyecto

```
src/
├── app/          # Router y layout
├── components/   # Componentes reutilizables
├── pages/        # Páginas/Vistas
├── shared/       # Código compartido (API, hooks, types)
├── widgets/      # Widgets de UI
└── styles/       # Estilos globales
```

## 🔐 Autenticación

El sistema usa JWT para autenticación:
- Login/Register mediante Auth Service
- Tokens almacenados en localStorage
- Rutas protegidas para panel de administración

## 📚 Documentación Adicional

- [Arquitectura](./ARCHITECTURE.md)
- [API Endpoints](./API.md)
- [Guía de Deploy](./DEPLOY.md)

## 🔗 Servicios Backend

Este frontend consume dos microservicios:
- **Auth Service** - Autenticación y gestión de usuarios
- **Ventas Service** - Productos, categorías y ventas

## 📄 Licencia

MIT
