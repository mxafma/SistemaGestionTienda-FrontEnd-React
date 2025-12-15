# Arquitectura - Frontend React

## 📋 Descripción General

Sistema de gestión de tienda desarrollado con **React 19** + **TypeScript** + **Vite**. Aplicación SPA (Single Page Application) que consume APIs REST de microservicios backend.

## 🏗️ Stack Tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| React | 19.1.1 | Framework UI |
| TypeScript | 5.9.3 | Tipado estático |
| Vite | 7.1.7 | Build tool & Dev Server |
| React Router DOM | 7.9.5 | Enrutamiento SPA |
| Axios | 1.13.2 | Cliente HTTP |
| Bootstrap | 5.3.8 | Framework CSS |
| Vitest | 4.0.14 | Testing |

## 📁 Estructura de Carpetas

```
src/
├── app/                    # Configuración de la aplicación
│   ├── layout.tsx          # Layout principal
│   └── router.tsx          # Configuración de rutas
├── components/             # Componentes reutilizables
│   ├── BlogCard/           # Tarjetas de blog
│   ├── DeveloperCard/      # Tarjetas de desarrolladores
│   ├── Form/               # Componentes de formulario
│   ├── Logo/               # Componente de logo
│   ├── ProductCard/        # Tarjetas de producto
│   └── SectionTitle/       # Títulos de sección
├── data/                   # Datos estáticos (JSON)
├── entities/               # Entidades de dominio
│   └── cart/               # Lógica del carrito
├── pages/                  # Páginas/Vistas
│   ├── Admin/              # Panel de administración
│   ├── Blog/               # Página de blog
│   ├── Cart/               # Carrito de compras
│   ├── Contact/            # Página de contacto
│   ├── Home/               # Página principal
│   ├── Login/              # Inicio de sesión
│   ├── Nosotros/           # Página "Sobre nosotros"
│   ├── ProductDetail/      # Detalle de producto
│   ├── Products/           # Catálogo de productos
│   └── Register/           # Registro de usuario
├── shared/                 # Código compartido
│   ├── api/                # Cliente API (Axios)
│   ├── assets/             # Recursos compartidos
│   ├── hooks/              # Custom hooks
│   ├── types/              # Tipos TypeScript
│   ├── AuthContext.tsx     # Contexto de autenticación
│   └── ProtectedRoute.tsx  # Rutas protegidas
├── styles/                 # Estilos globales
│   └── global.css
└── widgets/                # Widgets de UI
    ├── CartWidget/         # Widget del carrito
    ├── DevelopersSection/  # Sección de desarrolladores
    ├── Footer/             # Pie de página
    ├── Header/             # Cabecera
    └── Hero/               # Banner principal
```

## 🔐 Sistema de Autenticación

### AuthContext
- Maneja estado de autenticación global
- Almacena token JWT en `localStorage`
- Proporciona funciones: `login()`, `logout()`, `hasRole()`, `isActive()`

### ProtectedRoute
- HOC para rutas que requieren autenticación
- Soporta verificación de roles (`ADMIN`, `CLIENTE`)
- Redirige a `/login` si no autenticado

### API Client (Axios)
- Interceptor de request: añade header `Authorization: Bearer {token}`
- Interceptor de response: maneja errores 401 (token expirado)
- Limpieza automática de datos de autenticación

## 🛣️ Rutas de la Aplicación

### Rutas Públicas
| Ruta | Componente | Descripción |
|------|------------|-------------|
| `/` | Home | Página principal |
| `/products` | Products | Catálogo de productos |
| `/product/:id` | ProductDetail | Detalle de producto |
| `/nosotros` | Nosotros | Información de la empresa |
| `/blog` | Blog | Artículos del blog |
| `/contact` | Contact | Formulario de contacto |
| `/login` | Login | Inicio de sesión |
| `/register` | Register | Registro de usuario |
| `/cart` | Cart | Carrito de compras |

### Rutas Protegidas (Admin)
| Ruta | Componente | Rol Requerido |
|------|------------|---------------|
| `/admin` | AdminDashboard | ADMIN |
| `/admin/productos` | ProductosPage | ADMIN |
| `/admin/usuarios` | UsuariosPage | ADMIN |
| `/admin/boletas` | BoletasPage | ADMIN |

## 🔗 Integración con Backend

### Microservicios Consumidos
1. **Auth Service** - Autenticación y usuarios
2. **Ventas Service** - Productos, categorías y boletas

### Flujo de Autenticación
```
1. Usuario ingresa credenciales
2. POST /api/auth/login → Auth Service
3. Recibe JWT token + datos usuario
4. Token almacenado en localStorage
5. Requests subsecuentes incluyen Bearer token
```

## 📊 Diagrama de Componentes

```
┌─────────────────────────────────────────────────────┐
│                    App (Router)                      │
├─────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────┐   │
│  │              AuthProvider                    │   │
│  │  ┌───────────────────────────────────────┐  │   │
│  │  │            Layout                      │  │   │
│  │  │  ┌─────────┐ ┌───────────┐ ┌───────┐ │  │   │
│  │  │  │ Header  │ │   Pages   │ │Footer │ │  │   │
│  │  │  └─────────┘ └───────────┘ └───────┘ │  │   │
│  │  └───────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```
