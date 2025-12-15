# Guía de Deploy - Frontend React

## 🚀 Opciones de Despliegue

### 1. Vercel (Recomendado)

#### Configuración
```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel
```

#### Variables de Entorno en Vercel
```
VITE_API_AUTH_URL=https://tu-auth-service.railway.app
VITE_API_VENTAS_URL=https://tu-ventas-service.railway.app
```

### 2. Netlify

#### Configuración `netlify.toml`
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### Deploy
```bash
# Instalar Netlify CLI
npm i -g netlify-cli

# Login y deploy
netlify login
netlify deploy --prod
```

### 3. Railway

```bash
# El build se ejecuta automáticamente
# Configurar en dashboard:
# - Build Command: npm run build
# - Start Command: npm run preview
```

### 4. GitHub Pages

#### Configurar `vite.config.ts`
```typescript
export default defineConfig({
  base: '/nombre-repo/',
  // ...
})
```

#### GitHub Actions `.github/workflows/deploy.yml`
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## 📦 Build de Producción

### Comandos
```bash
# Instalar dependencias
npm install

# Build de producción
npm run build

# Preview local del build
npm run preview
```

### Output
```
dist/
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
├── index.html
└── img/
```

## ⚙️ Variables de Entorno

### Archivo `.env.production`
```env
VITE_API_AUTH_URL=https://auth-service-production.railway.app
VITE_API_VENTAS_URL=https://ventas-service-production.railway.app
VITE_APP_NAME=Tienda App
```

### Archivo `.env.development`
```env
VITE_API_AUTH_URL=http://localhost:8080
VITE_API_VENTAS_URL=http://localhost:8081
VITE_APP_NAME=Tienda App (Dev)
```

### Uso en código
```typescript
const authUrl = import.meta.env.VITE_API_AUTH_URL;
const ventasUrl = import.meta.env.VITE_API_VENTAS_URL;
```

## 🔧 Configuración de CORS

Asegurarse que los backends permitan el dominio del frontend:

```java
// En los microservicios backend
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOrigins(
                        "https://tu-frontend.vercel.app",
                        "https://tu-frontend.netlify.app"
                    )
                    .allowedMethods("*");
            }
        };
    }
}
```

## 📋 Checklist Pre-Deploy

- [ ] Variables de entorno configuradas
- [ ] URLs de API apuntando a producción
- [ ] Build exitoso sin errores
- [ ] Tests pasando
- [ ] CORS configurado en backends
- [ ] Favicon y meta tags actualizados
- [ ] Analytics configurado (opcional)

## 🐛 Troubleshooting

### Error: Rutas no funcionan (404)
Agregar redirecciones para SPA en el servidor.

### Error: CORS
Verificar configuración de CORS en backends.

### Error: Variables de entorno undefined
Asegurar prefijo `VITE_` y rebuild después de cambios.
