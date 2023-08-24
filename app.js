//módulos
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require("body-parser");
const { log } = require('handlebars');
const app = express();
const admin = require("./routes/admin")
const path = require("path") //para usar os arquivos statics
const mongoose = require("mongoose");
const session = require("express-session")
const flash = require("connect-flash")

//config
    //session
    app.use(session({
        secret: "cursodenode",
        resave: true,
        saveUninitialized: true
    }))
    app.use(flash())
    //midleware
    app.use((req, res, next) => {
        res.locals.success_msg = req.flash("success_msg")
        res.locals.error_,sg = req.flash("error_msg")
        next()
    })
    //boyparser
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    //handlebars
    app.engine('handlebars', handlebars.engine({defaultLayout: 'main',runtimeOptions: {
        allowProtoPropertiesByDefault: true,allowProtoMethodsByDefault: true,
        }
        }));
    app.set('view engine', 'handlebars');
    //mongoose
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://127.0.0.1:27017/blogapp', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Conectado");
    }).catch((err) => {
        console.log("Erro ao se conectar" + err);
    })
    //public
    app.use(express.static(path.join(__dirname, "public"))) //indicando qual pasta esta os statics

//rotas
app.use('/admin', admin) // '/admin/ um prefixo criado para acessar as rotas do arquivo admin

//outros
const PORT = 8081
app.listen(PORT, () => {
    console.log("Servidor rodando");
})