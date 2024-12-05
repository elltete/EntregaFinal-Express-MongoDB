
## SERIES API

Servicio WEB que permite acceder a informacion sobre Series de televivion.
La aplicacion permite consultar todas las series disponibles en la base de datos, acceder a una serie especifica segun su ID, crear una nueva serie, actualizar sus datos y eliminar una serie especifica. Todas las operaciones esta autenticas, solo usuarios logueados y autenticados pueden ejecutarlas.
Tambien permite la creacion de usuarios y logueo.

Los datos se persisten una una base de datos MongoDB, la cual se encuentra en la nube (**se compartira por separado los datos del cluster, usuario y nombre de la base de datos**).

## Middlewares

    - Routers
    - Autenticacion: proceso de verificacion de usuarios

## Librerias utilizadas

    - Express: Framework web
    - Bcryptjs: Algoritmo de hash que se usa para almacenar y codificar contraseñas
    - Mongoose: Permite interactuar con una base de datos MongoDB
    - Jsonwebtoken: permite transmitir de forma segura información, creacion de token
    - Cors: mecanismo de seguridad que permite a los navegadores web interactuar con recursos de otros dominios
    - Helmet: proteccion de la API de vulnerabilidades web en encabezados HTTP
    - Joi: validación de datos antes de ser persistidos en la base de datos
        user.Username: string() alphanum() min(5) max(10) required()
        user.Password: string() min(8) max(20) required()
        serie.title: string() min(3) max(50) required(),
        serie.genre: array() items(string() min(3) max(10) required()) required(),
        serie.year: number() integer() min(1900) max(actualYear) required(),
        serie.seasons: number() integer() min(1) max(40) required(),
        serie.rating: number() min(0) max(10) required(),

## Link repositorio GitHub: 
    ```
        https://github.com/elltete/EntregaFinal-Express-MongoDB.git
    ```

## Documentacion en Postman:
    ```
       https://documenter.getpostman.com/view/20059865/2sAYBYhB1Y
    ```


## Endpoints:

-  **Series**

   -  `GET /api/series`: Lista todas las series.
   -  `GET /api/series/:id`: lista una serie segun su ID.
   -  `POST /api/series`: Crea una nueva serie.
   -  `PATCH /api/series/:id`: Actualizar una serie existente.
   -  `DELETE /api/series/:id`: Eliminar un presupuesto.   

-  **Usuarios**

   -  `POST /api/user/register`: Registro de un nuevo usuario.
   -  `POST /api/user/login`: Login de un usuario. 



### Consigna TP Final - Desarrollo de API con Express y MongoDB

Objetivo: Desarrollar una API RESTful utilizando Express con conexión a una base de datos MongoDB. La API debe permitir la gestión de una entidad elegida por cada alumno, con las operaciones básicas de CRUD (Crear, Leer, Actualizar, Eliminar), autenticación de usuarios mediante JWT, y validación de datos.

Requisitos:
1. Configuración de la Base de Datos:
    - Conectar la API a una base de datos MongoDB.
    - La base de datos debe contener una colección para almacenar los usuarios, con los siguientes campos:
        * username: String único.
        * password: String (debe ser hasheada antes de guardarse en la base
de datos).

2. Autenticación con JWT:
    - Los usuarios deben poder registrarse e iniciar sesión utilizando su username y password.
    - Al registrarse, la contraseña debe ser hasheada antes de almacenarse en la base de datos.
    - Al iniciar sesión, el servidor debe emitir un JWT que el usuario podrá usar para acceder a las rutas protegidas de la API.
    - La autenticación debe estar protegida por un middleware de verificación de JWT.

3. Operaciones CRUD:
    - Implementar las siguientes rutas para la entidad que el alumno elija administrar:
        * POST /api/[recurso]: Crear un nuevo recurso.
        * GET /api/[recurso]: Obtener todos los recursos.
        * OPCIONAL: GET /api/[recurso]/:id: Obtener un recurso específico por ID.
        * PUT /api/[recurso]/:id: Actualizar un recurso por ID.
        * DELETE /api/[recurso]/:id: Eliminar un recurso por ID.

4. Variables de Entorno:
    - Utilizar variables de entorno para almacenar información sensible, como la clave secreta para la firma de los JWT y las credenciales de la base de datos MongoDB.
    - Usar un archivo .env para configurar estas variables.
    - No debe almacenarse información sensible directamente en el código fuente.

5. Validación de Datos:
    - OPCIONAL: Los datos recibidos a través de las solicitudes deben ser validados antes de ser procesados o almacenados. Puedes utilizar una librería como Joi o express-validator para realizar estas validaciones.

6. Manejo de Errores:
    - La API debe devolver respuestas adecuadas para cada tipo de error, utilizando los códigos de estado HTTP correctos y mensajes claros para los usuarios.
    - OPCIONAL: Implementar un middleware de manejo de errores para capturar y gestionar cualquier error inesperado.

7. Seguridad:
    - OPCIONAL: Asegurar la API utilizando cabeceras de seguridad con la librería helmet.
    - Proteger las rutas sensibles utilizando middleware de autenticación para verificar los JWT en las cabeceras de autorización.

8. Documentación de la API:
    - OPCIONAL: Documentar la API utilizando herramientas como Swagger o Postman, especificando los puntos finales, métodos, parámetros y ejemplos de respuestas.

Evaluación:
    - La correcta implementación de las operaciones CRUD.
    - El uso adecuado de JWT para la autenticación de usuarios.
    - La protección de rutas con middleware de autenticación.
    - El uso adecuado de variables de entorno para configuraciones sensibles.
    - La validación y manejo de errores de las entradas de los usuarios.
    - La seguridad de la API y su documentación.