class Grupos{
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
    #descricao
    get descricao() {
        return this.#descricao
    }
    set descricao(value) {
        this.#descricao = value
    }
   
    constructor(id, nome, descricao){
        this.#id = id
        this.#nome = nome
        this.#descricao = descricao
    }
    toJson(){
        return {
            "id": this.#id,
            "nome": this.#nome,
            "descricao": this.#descricao,
        }
    }
}
module.exports= Grupos