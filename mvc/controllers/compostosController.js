const path = require('path')
const CompostosDAO = require('../../DAO/compostosDAO')
const UsuarioDAO = require('../../DAO/usuarioDAO')
const GrupoDAO = require('../../DAO/gruposDAO')

const usuarioDAO = new UsuarioDAO();
const grupoDAO = new GrupoDAO();

function checkAdmin(req, res, next) {
    const tipo = req.session.user.tipo;
    
    if (tipo === 'admin') {
        next();
    } else {
        res.status(403).send('Acesso negado');
    }
}

module.exports= (app) =>{
app.use(checkAdmin)
    app.get("/compostos", async (req, res) => {
        
        const compostosDAO = new CompostosDAO();
        res.setHeader("Access-Control-Allow-Origin","*")

        res.status(201).json(await compostosDAO.consultarComposto())

    })
    app.get("/composto", async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin","*")
        lista_usuario = await usuarioDAO.consultarUsuario();
        lista_grupo = await grupoDAO.consultarGrupos();
        res.render('composto/composto',{usuarios:lista_usuario,grupos:lista_grupo})
    })
    app.post("/registrarcomposto",(req,res) =>{
        const compostosDAO = new CompostosDAO();
        res.setHeader("Acess-Control-Allow-Origin","*")
        const {txtnome, txtformula,txtestrutura,txtgrupo,txtusuario} = req.body;
        compostosDAO.registrarComposto(txtnome, txtformula,txtestrutura,txtgrupo,txtusuario)
        res.redirect('/composto/lista');
    })
    app.get("/composto/lista", async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin","*")
        const compostoDAO = new CompostosDAO();
        lista_grupos= await compostoDAO.consultarComposto();
        res.render('composto/lista',{compostos:lista_grupos})
    })
    app.delete("/composto/apagar/:id", async (req,res) =>{
        const compostoDAO = new CompostosDAO()  ;
        res.setHeader("Access-Control-Allow-Origin","*")
    
        res.json(await compostoDAO.apagarComposto(req.params.id))

    })
    app.get("/composto/alterar/:id", async (req, res) => {
        const compostoDAO = new CompostosDAO() 
        const dtcomposto = await compostoDAO.consultarCompostoId(req.params.id)
        lista_usuario = await usuarioDAO.consultarUsuario();
        lista_grupo = await grupoDAO.consultarGrupos();

        res.render("composto/upgrupo", { composto: dtcomposto,usuarios:lista_usuario,grupos:lista_grupo})
    })
    app.put("/composto/alterar", async (req, res) => {
        const compostoDAO = new CompostosDAO() ;
        res.setHeader("Access-Control-Allow-Origin","*")

        //Destructuring
        const {nome, formula,estrutura,grupo,criador,id } = req.body

        const r = await compostoDAO.atualizarComposto(id,nome, formula,estrutura,grupo,criador)

        res.redirect('/composto/lista');

    })
}