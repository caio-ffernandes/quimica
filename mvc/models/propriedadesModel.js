class Propriedade{
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
    #nome
    get nome() {
        return this.#nome
    }
    set nome(value) {
        this.#nome = value
    }
    #valor
    get valor() {
        return this.#valor
    }
    set valor(value) {
        this.#valor = value
    }
    
   
    constructor(id, composto, nome,valor){
        this.#id = id
        this.#composto = composto
        this.#nome = nome
        this.#valor = valor
       
    }
    toJson(){
        return {
            "id": this.#id,
            "composto": this.#composto,
            "nome": this.#nome,
            "valor": this.#valor
        }
    }
}
module.exports= Propriedade