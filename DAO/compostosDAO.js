const Composto = require ("../mvc/models/compostosModel");
const Database = require ("../repository/database");

class CompostoDAO {
    #conexao
    constructor(){
        this.#conexao= new Database();
    }
    async consultarComposto(){
        const lista_compostos = []
        const compostos = await this.#conexao.selecionarCompostos()

        if (compostos) {
            for (const composto of compostos) {
                const objcomposto = new Composto()
                objcomposto.id = composto.id
                objcomposto.nome = composto.nome
                objcomposto.formula = composto.formula_molecular
                objcomposto.estrutura = composto.estrutura_molecular
                objcomposto.grupo = composto.grupo_funcional_id
                objcomposto.criador=composto.criado_por
                objcomposto.data = composto.criado_em
                
                lista_compostos.push(objcomposto.toJson())
            }
        }

        return lista_compostos
    }
    async consultarCompostoId(id) {
    
        const composto = await this.#conexao.selecionarCompostosId(id)
              
        const objcomposto = new Composto()
            objcomposto.id = composto[0].id
            objcomposto.nome = composto[0].nome
            objcomposto.formula = composto[0].formula_molecular
            objcomposto.estrutura = composto[0].estrutura_molecular
            objcomposto.grupo = composto[0].grupo_funcional_id
            objcomposto.criador=composto[0].criado_por
            objcomposto.data = composto[0].criado_em
       
      
    
        return objcomposto.toJson()
    }
    async registrarComposto(nome, formula,estrutura,grupo,criador){
    
        const composto = new Composto()
    
        composto.nome = nome
        composto.formula = formula
        composto.estrutura = estrutura
        composto.grupo = grupo
        composto.criador=criador
       

        this.#conexao.insertCompostos(composto.nome,composto.formula,composto.estrutura,composto.grupo,composto.criador)
    }
    async atualizarComposto(id,nome, formula,estrutura,grupo,criador){
    
        const composto = new Composto()
    
        composto.id = id
        composto.nome = nome
        composto.formula = formula
        composto.estrutura = estrutura
        composto.grupo = grupo
        composto.criador=criador
        
        const dt = await this.#conexao.updateCompostos(composto.id,composto.nome,composto.formula,composto.estrutura,composto.grupo,composto.criador)
        return dt
    }
    async apagarComposto(id) {
        const resultado = await this.#conexao.deleteCompostos(id);
        return resultado;
    }
}

module.exports = CompostoDAO