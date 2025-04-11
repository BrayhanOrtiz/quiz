import express from 'express'
import sql from './db.js'

const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// INSERTAR DATOS PARA LAS DIFERENTES TABLAS:
// Crear registro en la tabla persona
app.post('/api/guardarPersona', async (req, res) => {
    const { nombre, apellido1, apellido2, dni } = req.body
    try {
      const result = await sql`
        INSERT INTO Persona (nombre, apellido1, apellido2, dni)
        VALUES (${nombre}, ${apellido1}, ${apellido2}, ${dni})
        RETURNING *`
      
      res.status(201).json({
        message: 'Guardado correctamente',
        result
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        message: 'Error al guardar',
        details: error
      })
    }

  })
// Crear registro en la tabla coche
  app.post('/api/guardarCarro', async (req, res) => {
    const { matricula, marca, modelo, caballos, persona_id } = req.body
  
    try {
      const result = await sql`
        INSERT INTO coche (matricula, nombre, modelo, caballos, persona_id)
        VALUES (${matricula}, ${marca}, ${modelo}, ${caballos}, ${persona_id})
        RETURNING *;
      `
      res.status(201).json({
        message: 'Guardado correctamente',
        result
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        message: 'Error al guardar',
        details: error
      })
    }
  })
  

  // Obtener la conexion a base de datos
app.get('/api/test-db', async (req, res) => {
    try {
      const result = await sql`SELECT NOW()`
      res.status(200).json({
        message: 'Conexión a la base de datos exitosa 🎉',
        hora: result[0].now
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        message: 'Error de conexión a la base de datos 😓',
        error
      })
    }
  })
  

app.listen(PORT, () => {
  console.log(`Servidor Corriendo en http://localhost:${PORT}`) 
})