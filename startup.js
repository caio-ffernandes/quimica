const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const banco = require('./repository/database');
const session = require("express-session");
const crypto = require("crypto");
const consign = require("consign");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs')
const db = new banco();
const UsuariosDAO= require("./DAO/usuarioDAO")
app.use(express.static('mvc/views/public'))
app.get("/logar", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.sendFile(path.resolve(__dirname, "./mvc/views/ctrldev", "login.html"));
});


app.get("/cadastrar", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.sendFile(path.resolve(__dirname, "./mvc/views/ctrldev", "cadastro.html"));
});
app.post("/cadastrarusuarios",(req,res) =>{
    const usuariosDAO = new UsuariosDAO();
    res.setHeader("Acess-Control-Allow-Origin","*")
    const {txtnome,txtemail,txtsenha,txttipo} = req.body;

    usuariosDAO.registrarUsuario(txtnome,txtemail,txtsenha,txttipo)
    
    res.redirect('/login');
})

const generateRandomSecret = () => {
    return crypto.randomBytes(64).toString('hex');
}


app.use(session({
    secret:generateRandomSecret(),
    resave:false,
    saveUninitialized:true
}))
function verificarAutenticacao(req, res, next) {
 
    if (req.session.user && req.session.user.email && req.session.user.tipo) {
 
        next();
    } else {
 
        res.redirect('/logar');
    }
}
function checkAdmin(req, res, next) {
    const tipo = req.session.user.tipo;
    
    if (tipo === 'admin') {
        next();
    } else {
        res.status(403).send('Acesso negado');
    }
}

app.post('/login', async (req, res) => {
    const email = req.body.txtemail;
    const senha = req.body.txtsenha;
  
    // Consulta SQL para verificar o login usando método da classe Database
    try {
        const result = await db.verificarLogin(email, senha);
        if (result.length > 0) {
            // Se o login for bem-sucedido, redirecione para home.html
            req.session.user = {tipo: result[0].tipo, email: email };
            console.log(result[0].tipo)
            res.redirect('/home');
             
        } else {
            // Se o login falhar, redirecione para error.html
           
            res.redirect('/error');
        }
    } catch (error) {
        console.error('Erro ao verificar o login:', error);
        res.redirect('/error');
    }
});
app.get("/home", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
        res.render('home',{userEmail: req.session.user.email});
      
        
    
});
app.get("/error", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.sendFile(path.resolve(__dirname, "./mvc/views/ctrldev", "error.html"));
});
app.get("/logout", (req, res) => {
    
    req.session.destroy((err) => {
        if (err) {
            console.error('Erro ao destruir a sessão:', err);
            res.redirect('/error');
        } else {
            
            res.send('<script>alert("Você saiu com sucesso!"); window.location.href = "/admin";</script>');
        }
    });
});
app.use(verificarAutenticacao)

app.get("/caio", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.sendFile(path.resolve(__dirname, "./mvc/views/ctrldev", "caio.html"));
});

app.set('views','mvc/views/ctrldev')
app.use(express.static('mvc/views/public'))
consign()
.include("mvc/controllers")
.into(app)
app.listen(3001, () => console.log("Online Server at port 3001"))
module.exports = app