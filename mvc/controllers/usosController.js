const path = require('path')
const UsosDAO = require('../../DAO/usosDAO')
const CompostosDAO = require('../../DAO/compostosDAO')

const compostosDAO = new CompostosDAO();

module.exports= (app) =>{
    app.get("/usos", async (req, res) => {
        
        const usosDAO = new UsosDAO();
        res.setHeader("Access-Control-Allow-Origin","*")

        res.status(201).json(await usosDAO.consultarUsos())

    })
    app.get("/uso", async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin","*")
        lista_composto= await compostosDAO.consultarComposto();
        res.render('usos/usos',{compostos:lista_composto})
    })
    app.get("/uso/lista", async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin","*")
        const usosDAO= new UsosDAO();
        lista_usos= await usosDAO.consultarUsos();
        res.render('usos/lista',{usos:lista_usos})
    })
    app.post("/registrarusos",(req,res) =>{
        const usosDAO = new UsosDAO();
        res.setHeader("Acess-Control-Allow-Origin","*")
        const {txtcomposto, txtdesc} = req.body;

        usosDAO.registrarUsos(txtcomposto, txtdesc)
        
        res.redirect('/uso/lista');
    })
    app.delete("/uso/apagar/:id", async (req,res) =>{
        const usosDAO = new UsosDAO()  ;
        res.setHeader("Access-Control-Allow-Origin","*")
    
        res.json(await usosDAO.apagarUso(req.params.id))

    })
    app.get("/uso/alterar/:id", async (req, res) => {
        const usosDAO = new UsosDAO() 
        lista_composto= await compostosDAO.consultarComposto();
        const dtuso = await usosDAO.consultarUsosId(req.params.id)

        res.render("usos/upusos", { uso: dtuso ,compostos:lista_composto})
    })
    app.put("/uso/alterar", async (req, res) => {
        const usosDAO = new UsosDAO() ;
        res.setHeader("Access-Control-Allow-Origin","*")

        //Destructuring
        const {composto, descricao,id } = req.body

        const r = await usosDAO.atualizarUso(composto, descricao,id)

        res.redirect('/uso/lista');

    })
}