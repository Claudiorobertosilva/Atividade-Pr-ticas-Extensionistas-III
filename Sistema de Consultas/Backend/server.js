const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("API funcionando");
});



app.get("/pacientes", (req, res) => {

    db.query(
        "SELECT * FROM pacientes",
        (erro, resultado) => {

            if (erro) {
                return res.status(500).json(erro);
            }

            res.json(resultado);

        }
    );

});

app.post("/pacientes", (req, res) => {

    const {
        nome,
        cpf,
        telefone,
        email,
        data_nascimento
    } = req.body;

    db.query(
        "INSERT INTO pacientes (nome, cpf, telefone, email, data_nascimento) VALUES (?, ?, ?, ?, ?)",
        [nome, cpf, telefone, email, data_nascimento],
        (erro, resultado) => {

            if (erro) {
                return res.status(500).json(erro);
            }

            res.json({
                mensagem: "Paciente cadastrado com sucesso!",
                id: resultado.insertId
            });

        }
    );

});

app.put("/pacientes/:id", (req, res) => {

    const { id } = req.params;

    const {
        nome,
        cpf,
        telefone,
        email,
        data_nascimento
    } = req.body;

    db.query(
        "UPDATE pacientes SET nome=?, cpf=?, telefone=?, email=?, data_nascimento=? WHERE id=?",
        [nome, cpf, telefone, email, data_nascimento, id],
        (erro) => {

            if (erro) {
                return res.status(500).json(erro);
            }

            res.json({
                mensagem: "Paciente atualizado com sucesso!"
            });

        }
    );

});

app.delete("/pacientes/:id", (req, res) => {

    const { id } = req.params;

    db.query(
        "DELETE FROM pacientes WHERE id=?",
        [id],
        (erro) => {

            if (erro) {
                return res.status(500).json(erro);
            }

            res.json({
                mensagem: "Paciente excluído com sucesso!"
            });

        }
    );

});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});