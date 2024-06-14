class Usuario{
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
    #email
    get email() {
        return this.#email
    }
    set email(value) {
        this.#email = value
    }
    #senha
    get senha() {
        return this.#senha
    }
    set senha(value) {
        this.#senha = value
    }
    #tipo
    get tipo() {
        return this.#tipo
    }
    set tipo(value) {
        this.#tipo = value
    }
    #data
    get data() {
        return this.#data
    }
    set data(value) {
        this.#data = value
    }
    
   
    constructor(id, nome, email,senha,tipo,data){
        this.#id = id
        this.#nome = nome
        this.#email = email
        this.#senha = senha
        this.#tipo = tipo
        this.#data = data
       
    }
    toJson(){
        return {
            "id": this.#id,
            "nome": this.#nome,
            "email": this.#email,
            "senha": this.#senha,
            "tipo": this.#tipo,
            "data": this.#data,
        }
    }
}
module.exports= Usuario