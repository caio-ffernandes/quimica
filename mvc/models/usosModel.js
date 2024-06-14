class Usos{
    #id
    get id() {
        return this.#id
    }
    set id(value) {
        this.#id = value
    }

    #composto
    get composto() {
        return this.#composto
    }
    set composto(value) {
        this.#composto = value
    }
    #descricao
    get descricao() {
        return this.#descricao
    }
    set descricao(value) {
        this.#descricao = value
    }
   
    constructor(id, composto, descricao){
        this.#id = id
        this.#composto = composto
        this.#descricao = descricao
    }
    toJson(){
        return {
            "id": this.#id,
            "composto": this.#composto,
            "descricao": this.#descricao,
        }
    }
}
module.exports= Usos