const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Categoria")
const Categoria = mongoose.model("categorias")

router.get('/', (req, res) => {
    res.render("admin/index")
})

router.get('/posts', (req, res) => {
    res.send("página de posts")
})
router.get('/categorias', (req, res) => {
    res.render("admin/categorias")
})
router.get('/categorias/add', (req, res) => {
    res.render("admin/addcategorias")
})
router.post("/cadegorias/nova", (req, res) => {
    const novaCategoria = {
        nome: req.body.nome,  //fazem referencia ao atributo name do input
        slug: req.body.slug
    }
    new Categoria(novaCategoria).save().then(() => {
        console.log("Categoria salva com sucesso");
    }).catch((err) => {
        console.log("Erro" + err);
    })
})
router.get('/categorias', (req, res) => {
    res.send("página de categorias")
})
module.exports = router