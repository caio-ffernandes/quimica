class Composto{
    #id
    get id() {
        return this.#id
    }
    set id(value) {
        this.#id = value
    }

    #nome
    get nome() {
        return this.#nome
    }
    set nome(value) {
        this.#nome = value
    }
    #formula
    get formula() {
        return this.#formula
    }
    set formula(value) {
        this.#formula = value
    }
    #estrutura
    get estrutura() {
        return this.#estrutura
    }
    set estrutura(value) {
        this.#estrutura = value
    }
    #grupo
    get grupo() {
        return this.#grupo
    }
    set grupo(value) {
        this.#grupo = value
    }
    #criador
    get criador() {
        return this.#criador
    }
    set criador(value) {
        this.#criador = value
    }
    #data
    get data() {
        return this.#data
    }
    set data(value) {
        this.#data = value
    }
   
   
    constructor(id, nome, formula,estrutura,grupo,criador,data){
        this.#id = id
        this.#nome = nome
        this.#formula = formula
        this.#estrutura = estrutura
        this.#grupo = grupo
        this.#criador= criador
        this.#data = data
    }
    toJson(){
        return {
            "id": this.#id,
            "nome": this.#nome,
            "formula": this.#formula,
            "estrutura": this.#estrutura,
            "grupo": this.#grupo,
            "criador": this.#criador,
            "data": this.#data
        }
    }
}
module.exports= Composto