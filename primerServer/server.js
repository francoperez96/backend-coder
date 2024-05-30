const express = require("express");

const app = express();

const PORT = 5000;

app.get("/", (require, response) => {
    // response.send("Mi primer saludo con express");
    response.json({
        nombre: "Franco",
        apellido: "Perez",
    });
});

app.get("/saludo/:tipo/:sueldo", (req, res) => {
    console.log(req);

    const { tipo , sueldo } = req.params; 

    if(isNaN(sueldo)) {
        res.send("No es un nuemero valido");
        return;
    }

    res.send(`Hola ${tipo}! Tu sueldo es de ${sueldo}`);	
});

app.get("/producto", (req , res) => {

    const { nombre, precio } = req.query;

    console.log(req.query);
    console.log(nombre, precio);

    const productos = [
    {    id: 1,
        nombre: "Mouse",
        precio: 100,
    },
    {    id: 2,
        nombre: "Teclado",
        precio: 200,
    },
    {    id: 3,
        nombre: "Monitor",
        precio: 300,
    },
    {    id: 4,
        nombre: "CPU",
        precio: 400,
    },
    ]

    res.json(productos);
});



app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});