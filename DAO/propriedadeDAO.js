const Propriedades = require ("../mvc/models/propriedadesModel");
const Database = require ("../repository/database");

class PropriedadeDAO {
    #conexao
    constructor(){
        this.#conexao= new Database();
    }
    async consultarPropriedade(){
        const lista_propriedade = []
        const propriedades = await this.#conexao.selecionarPropriedades()

        if (propriedades) {
            for (const propriedade of propriedades) {
                const objpropriedade = new Propriedades()
                objpropriedade.id = propriedade.id
                objpropriedade.composto = propriedade.composto_id
                objpropriedade.nome = propriedade.propriedade_nome
                objpropriedade.valor = propriedade.propriedade_valor
                
                lista_propriedade.push(objpropriedade.toJson())
            }
        }

        return lista_propriedade
    }
    async consultarPropriedadeId(id) {
    
        const propriedade = await this.#conexao.selecionarPropriedadesId(id)
              
        const objpropriedade = new Propriedades()
    
        objpropriedade.id = propriedade[0].id
        objpropriedade.composto = propriedade[0].composto_id
        objpropriedade.nome = propriedade[0].propriedade_nome
        objpropriedade.valor = propriedade[0].propriedade_valor
       
      
    
        return objpropriedade.toJson()
    }
    async registrarPropriedade(composto, nome,valor){
    
        const propriedades = new Propriedades()
    
        propriedades.composto = composto
        propriedades.nome = nome
        propriedades.valor = valor

        this.#conexao.insertPropriedades(propriedades.composto,propriedades.nome,propriedades.valor)
    }
    async atualizarPropriedade(id,composto,nome,valor){
    
        const propriedades = new Propriedades()
    
    
        propriedades.id = id
        propriedades.composto = composto
        propriedades.nome = nome
        propriedades.valor = valor
        
        const dt = await this.#conexao.updatePropriedades( propriedades.id,propriedades.composto,propriedades.nome,propriedades.valor)
        return dt
    }
    async apagarPropriedade(id) {
        const resultado = await this.#conexao.deletePropriedades(id);
        return resultado;
    }
}

module.exports = PropriedadeDAO