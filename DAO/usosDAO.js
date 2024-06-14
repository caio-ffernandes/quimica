const Usos = require ("../mvc/models/usosModel");
const Database = require ("../repository/database");

class UsosDAO {
    #conexao
    constructor(){
        this.#conexao= new Database();
    }
    async consultarUsos(){
        const lista_usos = []
        const usos = await this.#conexao.selecionarUsos()

        if (usos) {
            for (const uso of usos) {
                const objusos = new Usos()
                objusos.id = uso.id
                objusos.composto = uso.composto_id
                objusos.descricao = uso.uso_descricao
                
                lista_usos.push(objusos.toJson())
            }
        }

        return lista_usos
    }
    async consultarUsosId(id) {
    
        const usos = await this.#conexao.selecionarUsosId(id)
              
        const objUso = new Usos()
    
        objUso.id=usos[0].id
        objUso.composto = usos[0].composto_id
        objUso.descricao=usos[0].uso_descricao
       
      
    
        return objUso.toJson()
    }
    async registrarUsos(composto, descricao){
    
        const usos = new Usos()
    
        usos.composto = composto
        usos.descricao = descricao

        this.#conexao.insertUsos(usos.composto,usos.descricao)
    }
    async atualizarUso(id,composto,descricao){
    
        const uso = new Usos()
    
        uso.id = id
        uso.composto = composto
        uso.descricao = descricao
        
        const dt = await this.#conexao.updateUso(uso.id,uso.composto,uso.descricao)
        return dt
    }
    async apagarUso(id){
        const dados =  await this.#conexao.deleteUsos(id)
        return dados
       }
    
}

module.exports = UsosDAO