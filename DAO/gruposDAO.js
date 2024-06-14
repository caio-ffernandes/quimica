const Grupos = require ("../mvc/models/gruposModels");
const Database = require ("../repository/database");

class GruposDAO {
    #conexao
    constructor(){
        this.#conexao= new Database();
    }
    async consultarGrupos(){
        const lista_grupos = []
        const grupos = await this.#conexao.selecionarGrupos()

        if (grupos) {
            for (const grupo of grupos) {
                const objgrupo = new Grupos()
                objgrupo.id = grupo.id
                objgrupo.nome = grupo.nome
                objgrupo.descricao = grupo.descricao
                
                lista_grupos.push(objgrupo.toJson())
            }
        }

        return lista_grupos
    }
    async consultarGruposId(id) {
    
        const grupos = await this.#conexao.selecionarGruposId(id)
              
        const objgrupo = new Grupos()
         objgrupo.id = grupos[0].id
         objgrupo.nome = grupos[0].nome
         objgrupo.descricao = grupos[0].descricao
       
      
    
        return objgrupo.toJson()
    }
    async registrarGrupos(nome, descricao){
    
        const grupos = new Grupos()
    
        grupos.nome = nome
        grupos.descricao = descricao

        this.#conexao.insertGrupos( grupos.nome,grupos.descricao)
    }
    async atualizarGrupos(id,nome,descricao){
    
        const grupos = new Grupos()
    
        grupos.id = id
        grupos.nome = nome
        grupos.descricao = descricao
        
        const dt = await this.#conexao.updateGrupos(grupos.id,grupos.nome,grupos.descricao)
        return dt
    }
    async apagarGrupos(id){
        const dados =  await this.#conexao.deleteGrupos(id)
        return dados
       }
}

module.exports = GruposDAO