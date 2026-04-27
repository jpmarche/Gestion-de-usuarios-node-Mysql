 import { getUsers, createUser, updateUser, deleteUser } from "./controllers.js"
import {db} from "./configMysql.js"
const argv = process.argv
const params = argv.slice(2)
const operacion = params[0]
let resultado



const main = async () => {
  // PANTALLA DE BIENVENIDA
    console.clear()
  console.log("=========================================")
  console.log("       GESTOR DE USUARIOS MYSQL         ")
  console.log("=========================================")
  console.log(` Operación solicitada: [${operacion || "Ninguna"}]`)
  console.log("-----------------------------------------")

  // COMPROBAR CONEXION A LA BASE DE DATOS
try {
  const connection = await db.getConnection()
  console.log("Conexión a la base de datos exitosa")
  connection.release()
} catch (error) {
  console.error("Error al conectarse a la base de datos")
  process.exit(1)
} 
// SELECCIONAR OPERACION A REALIZAR
switch (operacion) {
  case "get":
    resultado = await getUsers()
    break
  case "add":
    resultado = await createUser(params[1], params[2], params[3])
    break
  case "update":
    resultado =  await updateUser(params[1],{username:params[2],email:params[3],password:params[4]})
    break
  case "delete":
    resultado = await deleteUser(params[1])
    break
  default:
    resultado = "Operación invalida."
}
console.log(resultado)
setTimeout(() => {
 process.exit(1)
 
}, 2000);
}
main()