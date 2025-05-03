# 📫 API Postman Collection - Proyecto [Tu Proyecto]

Este documento te guiará para **descargar y utilizar** la colección de Postman y las pruebas preconfiguradas para esta API. Además, se detalla la existencia de un usuario administrador ya creado de forma automática al iniciar la aplicación.

---

## ✅ Requisitos Previos

- Tener **Postman** instalado. Puedes descargarlo aquí: [https://www.postman.com/downloads/](https://www.postman.com/downloads/)
- Asegúrate que tu proyecto backend esté corriendo (ejemplo: `npm run dev` o `node index.js`).

---

## 🚀 Pasos para Descargar y Abrir la Collection

1. **Descarga la Collection:**

   - Encuentra el archivo llamado algo como:  
     ```
     [NombreDeTuProyecto]-postman-collection.json
     ```
   - Descárgalo en tu computadora.

2. **Importa en Postman:**

   - Abre Postman.
   - Haz clic en el botón **"Import"** (arriba a la izquierda).
   - Selecciona la opción **"File"** y busca el archivo `.json` descargado.
   - Haz clic en **"Import"**.

3. **Listo:**
   
   - Ahora verás la colección en tu espacio de trabajo.
   - Dentro encontrarás las diferentes peticiones ya organizadas (auth, usuarios, etc).

---

## 🔐 Datos Quemados (Admin por Defecto)

Al iniciar tu aplicación por primera vez, **se crea automáticamente un usuario administrador** con las siguientes credenciales:

- **Correo:** `admin@gmail.com`
- **Contraseña:** `Admin98!`
- **Rol:** `ADMIN_ROLE`

> 📢 Este usuario es creado si no existe ya en la base de datos. Así que puedes usar estas credenciales para iniciar sesión desde Postman y obtener tu token de autenticación.

---

## ⚠️ Notas Importantes

- Asegúrate que tu **base de datos** esté conectada correctamente antes de probar la colección.
- No compartas públicamente estas credenciales de admin en producción.

---

## 💪 Soporte

Si tienes problemas para importar o ejecutar las peticiones, contacta a [Tu Nombre] o abre un issue en el repositorio.
