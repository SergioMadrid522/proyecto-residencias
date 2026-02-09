Para instalar todas las dependencias

```bash
npm install
```

# Stack

1. Aplicación Full-Stack usando Next.js con React.js + TypeScript

- Next.js v16.1.5

2. BD.

- PostgreSQL v17

3. Graficas.

- Recharts

4. ORM

- Prisma v6.2.1

# Roles:

1. **Admin**: Gestión de proyectos, usuarios y visualización de KPIs globales.

2. **Tester (QA)**: Responsable del ciclo de reporte y validación de correcciones.
   (Puede ver todo el ciclo del reporte y validar las correcciones hechas por el dev).

3. **Developer**: Gestión de resolución de incidencias y carga de evidencia técnica.
   (Puede ver los reporte de las corecciones y cargar evidencia de que ya fue arreglado)

# Flujo del proyecto.

1. Aplicación full-stack usando Next.js.
   - **Frontend**: Una interfaz rápida y moderna donde el usuario reporta un bug. 
   - **IA (Gemini)**: Cuando el usuario escribe el error, la API de Gemini analiza el texto y dice: "Esto es una severidad CRÍTICA" automáticamente (esto será implementado después, primero será manual).
   - **Backend**: Recibe la información y la guarda de forma segura en PostgreSQL. 
   - **Dashboard**: Muestra gráficas de cuántos bugs se han resuelto (MTTR) para optimizar el equipo.

2. Layout Visual
   - **Sidebar Menu**: Navegación para los Proyectos, Tickets y Reportes. 
   - **KPI Cards**: Rectángulos superiores que digan "Bugs Activos", "Tiempo de Respuesta", etc.
   - **Main View**: Una tabla profesional o un tablero tipo Kanban (como Jira) para mover los tickets de estado.

# Estructura de carpetas.

- **/public**. contiene imagenes que no se utilizarán en el código.
- **/src**. Contiene los archivos de la app.
  - **/app**. Contiene las distintas páginas de la aplicación.
    - **/api**. Contiene las rutas del backend.
      - **/users**. Contiene el APIs de los usuarios
  - **/components**. contiene los archivos bases de las páginas como header, footer, etc.
  - **/types**. Contiene los tipos para renderizar los datos de manera segura.
- **/utils**. Contiene funciones reutilizables.
