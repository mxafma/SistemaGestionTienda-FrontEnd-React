# Sistema de Gestión de Tienda - Arquitectura

Este proyecto es la migración del frontend de una tienda (productos, carrito, login, registro, contacto, blog y una parte de admin) a **React + Vite + TypeScript**, usando **Bootstrap** y **Atomic Design**, con una estructura **feature-based**.

El objetivo de esta arquitectura es:
1. Separar la lógica de dominio (productos, carrito, usuarios) de la UI.
2. Permitir que nuevas features (wishlist, cupones, dashboard admin) se puedan agregar sin romper lo existente.
3. Mantener componentes atómicos reutilizables.
4. Facilitar que una IA (Codex/Copilot) genere nuevos componentes respetando esta estructura.

---

## 1. Estructura de Carpetas

```txt
src/
  main.tsx
  App.tsx

  app/
    router.tsx        # definición de rutas
    providers.tsx     # contextos globales (cart, auth)
    layout.tsx        # layout general (Header, Footer, <Outlet />)

  shared/
    ui/
      atoms/          # componentes más simples, ligados a Bootstrap
      molecules/      # combinan atoms
      organisms/      # secciones completas
    lib/              # utilidades compartidas (formatCurrency, validators)
    hooks/            # hooks genéricos
    assets/           # imágenes, íconos
    types/            # tipos globales

  entities/
    product/          # dominio de productos
    cart/             # dominio de carrito
    user/             # dominio de usuarios/autenticación
    blog/             # dominio de artículos/noticias
    geo/              # regiones y comunas (si viene del proyecto original)

  features/
    products-list/    # listado, filtros, búsqueda
    product-detail/   # detalle de producto
    cart-manage/      # acciones sobre carrito (agregar, quitar, total)
    auth/             # login, registro
    contact/          # formulario de contacto
    admin-products/   # administración de productos
    admin-users/      # administración de usuarios

  widgets/
    Header/
    Footer/
    Hero/
    ShopSection/
    CartWidget/

  pages/
    Home/
    Products/
    ProductDetail/
    Cart/
    Login/
    Register/
    Contact/
    Blog/
    BlogDetail/
    Admin/

  styles/
    global.css
