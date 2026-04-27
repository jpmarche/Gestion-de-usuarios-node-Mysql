# 🗄️ Gestor de Usuarios MySQL (CLI)

Una aplicación de consola (CLI) construida con Node.js para gestionar usuarios en una base de datos MySQL de forma rápida y sencilla.

## 🚀 Instalación y Configuración

Sigue estos pasos para poner en marcha el proyecto en tu máquina local:

1. **Clona el repositorio** o descarga los archivos del proyecto.
2. **Instala las dependencias** necesarias ejecutando en tu terminal:
   ```bash
   npm install
   ```
3. **Configura tu base de datos**: Asegúrate de tener tu servidor MySQL activo y los datos de conexión correctamente cargados en tu archivo `configMysql.js`.

---

## 💻 Cómo conectarse y usar el programa

Para ejecutar el programa, debes abrir la terminal en la carpeta raíz del proyecto y usar el comando `node` seguido del nombre del archivo principal (`index.js`), la operación a realizar seguida de los parámetros requeridos.

La estructura general del comando es:
```bash
node index.js <operacion> <parametros...>
```

---

## 🛠️ Operaciones Disponibles

El sistema soporta 4 operaciones principales que se detallan a continuación:

### 1. Consultar todos los usuarios (`get`)
Muestra la lista completa de usuarios registrados en la base de datos.
```bash
node index.js get
```

### 2. Agregar un nuevo usuario (`add`)
Registra un nuevo usuario. Requiere nombre de usuario, correo y contraseña.
```bash
node index.js add "nombreUsuario" "correo@gmail.com" "miPassword123"
```

### 3. Actualizar un usuario existente (`update`)
Modifica los datos de un usuario existente buscando a través de su ID.
```bash
node index.js update "id_del_usuario" "nuevoNombre" "nuevo@gmail.com" "nuevaPassword"
```

### 4. Eliminar un usuario (`delete`)
Borra de forma permanente un usuario a través de su ID.
```bash
node index.js delete "id_del_usuario"
```

---

## ⚙️ ¿Cómo funciona internamente?

1. **Lectura de parámetros:** El programa utiliza `process.argv` para capturar lo que escribes en la consola.
2. **Prueba de Conexión:** Antes de hacer nada, intenta conectar con MySQL. Si falla, detiene el proceso inmediatamente.
3. **Selector (Switch):** Evalúa el primer parámetro que pasaste (`get`, `add`, `update`, `delete`) y llama a la función correspondiente importada desde `controllers.js`.
4. **Cierre:** Muestra el resultado visual en pantalla y finaliza el proceso de consola automáticamente tras 2 segundos.

