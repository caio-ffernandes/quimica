const Usuario = require ("../mvc/models/usuarioModel");
const Database = require ("../repository/database");

class UsuarioDAO {
    #conexao
    constructor(){
        this.#conexao= new Database();
    }
    async consultarUsuario(){
        const lista_usuario = []
        const usuarios = await this.#conexao.selecionarUsuario()

        if (usuarios) {
            for (const usuario of usuarios) {
                const objusuario = new Usuario()
                objusuario.id = usuario.id
                objusuario.nome = usuario.nome
                objusuario.email = usuario.email
                objusuario.senha = usuario.senha
                objusuario.tipo = usuario.tipo
                objusuario.data = usuario.criado_em
                
                lista_usuario.push(objusuario.toJson())
            }
        }

        return lista_usuario
    }
    async consultarUsuarioId(id) {
    
        const usuario = await this.#conexao.selecionarUsuarioId(id)
              
        const objusuario = new Usuario()
    
        objusuario.id = usuario[0].id
        objusuario.nome = usuario[0].nome
        objusuario.email = usuario[0].email
        objusuario.senha = usuario[0].senha
        objusuario.tipo = usuario[0].tipo
        objusuario.data = usuario[0].criado_em
       
      
    
        return objusuario.toJson()
    }
    async registrarUsuario(nome, email,senha,tipo){
    
        const usuarios = new Usuario()
    
        usuarios.nome = nome
        usuarios.email = email
        usuarios.senha = senha
        usuarios.tipo = tipo

        this.#conexao.insertUsuario(usuarios.nome,usuarios.email,usuarios.senha,usuarios.tipo)
    }
    async atualizaUsuario(id,nome, email,senha,tipo){
    
        const usuarios = new Usuario()
    
        usuarios.id = id
        usuarios.nome = nome
        usuarios.email = email
        usuarios.senha = senha
        usuarios.tipo = tipo
        
        const dt = await this.#conexao.updateUsuarios(usuarios.id,usuarios.nome,usuarios.email,usuarios.senha,usuarios.tipo)
        return dt
    }
    async apagarUsuario(id) {
        const resultado = await this.#conexao.deleteUsuarios(id);
        return resultado;
    }
}

module.exports = UsuarioDAO