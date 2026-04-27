import { db } from "./configMysql.js"

const getUsers = async () => {
  const q = `SELECT * FROM users`
  const [response] = await db.query(q)
  return response
}

const createUser = async (username, email, password) => {
  // VALIDAR
  if (!username || !email || !password) {
    return "Data invalida, necesitas enviar username, email y password para registrar un usuario."
  }

  // VALIDAR SI EL USUARIO EXISTE
  const query = `SELECT * FROM users WHERE email=?`
  const [response1] = await db.query(query,email)
  if (response1.length > 0){
    return "El usuario ya existe"
  } 

  // VALIDAR SI EL CORREO TERMINA EN @GMAIL.COM
  if (!email.endsWith("@gmail.com")) {
    return "El correo electrónico debería terminar en gmail.com"
  }

  // VALIDAR SI LA CONTRASEÑA TIENE AL MENOS 8 CARACTERES
  if (password.length < 8) {
    return "La contraseña debe tener al menos 8 caracteres"
  }  

  const q = `INSERT INTO users (id, username, email, password) VALUES (?,?,?,?)`

  const [response] = await db.query(q, [crypto.randomUUID(), username, email, password])

  if (response.serverStatus === 2) {
    return "Usuario creado con éxito."
  }
}

const updateUser = async (id, updates) => {
  // VALIDAR SI USUARIO INGRESA ID
  if (!id) {
        return "ID requerido"
    }
  
  const query = `SELECT * FROM users WHERE id=?`
  const [response1] = await db.query(query,id)

  // VALIDAR SI EL USUARIO EXISTE
  if (response1.length === 0){
    return "Usuario no encontrado"
  }

  const q = `UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?`
  let {username, email, password} = updates;
  
  // VALIDAR SI EL USUARIO INGRESA UN CAMPO VACIO O NINGUN VALOR, EN ESE CASO SE MANTIENE EL VALOR ANTERIOR
  if(username==null || username==""){ 
    username = response1[0].username
  }
  if(email==null || email=="" ){
    email = response1[0].email
  }
  if(password==null || password==""){
    password = response1[0].password
  }

  // VALIDAR SI EL CORREO TERMINA EN @GMAIL.COM
    if (!email.endsWith("@gmail.com")) {
    return "El correo electrónico debería terminar en gmail.com"
  }
  // VALIDAR SI LA CONTRASEÑA TIENE AL MENOS 8 CARACTERES
  if (password.length < 8) {
    return "La contraseña debe tener al menos 8 caracteres"
  }

   const [response] = await db.query(q, [username, email, password, id])

    return "Usuario actualizado exitosamente";
}

const deleteUser = async (id) => {
    const q = ` DELETE from users WHERE id = ?;`
    const [response] = await db.query(q, [id]);
    
    // VALIDAR SI EL USUARIO EXISTE
    if (response.affectedRows === 0) {
        return "Usuario no encontrado"
    }
    // VALIDAR SI EL USUARIO FUE ELIMINADO
    if (response.serverStatus === 2) {
        return "Usuario eliminado"
    }
}

export { getUsers, createUser, updateUser, deleteUser }