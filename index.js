const express = require("express")
const exphbs = require("express-handlebars")
const mysql = require("mysql2")

const app = express()

// Definindo Handlebars como template
app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")

// pasta de arquivos estáticos como CSS, imagens
app.use(express.static("public"))

// Trabalhar com dados no formato json
app.use(express.urlencoded({
    extended: true
}))

app.use(express.json)

// Rotas
app.get("/", (request, response) => {
    response.render("home")
})

app.get("/register", (request, response) => {
    response.render("register")
})

app.post("/register/save", (request, response) => {
    const { title, pageqty } = request.body // Desestruturação

    const query = `
    INSERT INTO books (title, pageqty)
    VALUES ('${title}', '${pageqty}')
    `

    conn.query(query, (error) => {
        if (error) {
            console.log(error)
            return
        }

        response.redirect("/")
    })
})

// Conexão com o MySQL
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "nodemysql",
    port: 3307
})

conn.connect((error) => {
    if (error) {
        console.log(error)
        return
    }

    console.log("Conectado ao MySQL!")

    app.listen(3000, () => {
        console.log("Servidor rodando na porta 3000!")
    })
})