# Documentación API - Frontend

## 🔌 Endpoints Consumidos

### Auth Service (Autenticación)

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "usuario@email.com",
  "password": "contraseña123"
}
```

**Response 200:**
```json
{
  "mensaje": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "usuario": {
    "id": 1,
    "nombre": "Juan",
    "apellido": "Pérez",
    "email": "usuario@email.com",
    "rol": "CLIENTE",
    "activo": true
  }
}
```

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "nombre": "Juan",
  "apellido": "Pérez",
  "email": "nuevo@email.com",
  "password": "contraseña123"
}
```

#### Usuarios (Admin)
```http
GET /api/usuarios
GET /api/usuarios/{id}
PUT /api/usuarios/{id}
DELETE /api/usuarios/{id}
```

---

### Ventas Service (Productos y Ventas)

#### Productos
```http
GET /api/productos                    # Listar todos
GET /api/productos/{id}               # Obtener por ID
GET /api/productos/activos            # Solo activos
GET /api/productos?categoriaId={id}   # Por categoría
GET /api/productos?search={texto}     # Buscar por nombre
POST /api/productos                   # Crear (Admin)
PUT /api/productos/{id}               # Actualizar (Admin)
DELETE /api/productos/{id}            # Eliminar (Admin)
```

#### Categorías
```http
GET /api/categorias
GET /api/categorias/{id}
POST /api/categorias
PUT /api/categorias/{id}
DELETE /api/categorias/{id}
```

#### Boletas (Ventas)
```http
GET /api/boletas                      # Listar todas
GET /api/boletas/{id}                 # Obtener por ID
GET /api/boletas?usuarioId={id}       # Por usuario
GET /api/boletas?desde={date}&hasta={date}  # Por rango de fechas
POST /api/boletas                     # Crear nueva venta
```

---

## 🔐 Autenticación

Todas las peticiones a endpoints protegidos requieren el header:

```http
Authorization: Bearer {jwt_token}
```

### Roles disponibles
- `ADMIN` - Acceso completo
- `VENDEDOR` - Gestión de ventas
- `CLIENTE` - Usuario normal

---

## 📊 Modelos de Datos

### Usuario
```typescript
interface Usuario {
  id: number;
  nombre: string;
  apellido?: string;
  email: string;
  rol: 'ADMIN' | 'VENDEDOR' | 'CLIENTE';
  activo: boolean;
}
```

### Producto
```typescript
interface Producto {
  id: number;
  nombre: string;
  descripcion?: string;
  codigoBarra?: string;
  precioVenta: number;
  stockActual: number;
  activo: boolean;
  categoria: Categoria;
  creadoEn: string;
  actualizadoEn: string;
}
```

### Categoría
```typescript
interface Categoria {
  id: number;
  nombre: string;
  descripcion?: string;
}
```

### Boleta
```typescript
interface Boleta {
  id: number;
  fechaHora: string;
  usuarioId: number;
  totalBruto: number;
  totalDescuento: number;
  totalNeto: number;
  metodoPago: 'EFECTIVO' | 'TARJETA' | 'TRANSFERENCIA' | 'MIXTO';
  detalles: DetalleBoleta[];
}

interface DetalleBoleta {
  id: number;
  productoId: number;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}
```

---

## ⚠️ Códigos de Error

| Código | Descripción |
|--------|-------------|
| 400 | Bad Request - Datos inválidos |
| 401 | Unauthorized - Token inválido o expirado |
| 403 | Forbidden - Sin permisos suficientes |
| 404 | Not Found - Recurso no encontrado |
| 500 | Internal Server Error |

---

## 🔄 Interceptores Axios

### Request Interceptor
Añade automáticamente el token JWT a todas las peticiones.

### Response Interceptor
- Maneja errores 401 globalmente
- Limpia datos de autenticación
- Redirige a login si el token expiró
