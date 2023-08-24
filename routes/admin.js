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

router.post("/categorias/nova", (req, res) => {

    var erros = []

    if(!req.body.name || req.body.name == undefined || req.body.name == null) {
        erros.push({texto: "nome inválido"})
    }
    if(!req.body.slug || req.body.slug == undefined || req.body.slug == null) {
        erros.push({texto: "slug inválido"})
    }
    if(erros.length > 0) {
        res.render("admin/addcategorias", {erros: erros})
    } else {
        const novaCategoria = {
            nome: req.body.name,  //fazem referencia ao atributo name do input
            slug: req.body.slug
        }
        new Categoria(novaCategoria).save().then(() => {
            req.flash("success_msg", "Categoria criada com sucesso")
            res.redirect("/admin/categorias");
        }).catch((err) => {
            req.flash("error_msg", "Erro ao salvar categoria")
            console.log("Erro" + err);
        })
    }

 
})
router.get('/categorias', (req, res) => {
    res.send("página de categorias")
})
module.exports = router