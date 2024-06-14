const mysql = require("mysql2")

class Database{

    #connection 

    constructor(){
        this.#connection = mysql.createPool({
            host: "localhost",
            user:"root",
            password:"",
            database:"quimica_organica"
        }).promise()
    }
   
    async selecionarCompostos(){
        const compostosData = await this.#connection.query("select * from compostos;")
        return compostosData[0]
     } 
     async selecionarCompostosId(id) {
        const compostosData = await this.#connection.query("select * from compostos where id ="+id)
        return compostosData[0]
    }
     async insertCompostos(nome,formula,estrutura,grupo,criador){
        const retorno = await this.#connection.execute(`
        insert into compostos (nome,formula_molecular,estrutura_molecular,grupo_funcional_id,criado_por,criado_em)
             
            values ('${nome}','${formula}','${estrutura}','${grupo}','${criador}',NOW())
        `)
    }
    async deleteCompostos(id){
        const sql = `
        delete from compostos
        where id= ${id}
        `
        const dt = await this.#connection.execute(sql)
        return dt[0]
    }
    async updateCompostos(id, nome, formula, estrutura, grupo, criador) {
        const sql = `UPDATE compostos
        SET nome = "${nome}",
        formula_molecular = "${formula}",
        estrutura_molecular = "${estrutura}",
        grupo_funcional_id = "${grupo}",
        criado_por = "${criador}",
        criado_em = NOW()
        WHERE id = ${id}`;
        
        const dtbs = await this.#connection.execute(sql);
        return dtbs[0];
    }
    

    async selecionarGrupos(){
        const gruposData = await this.#connection.query("select * from grupos_funcionais;")
        return gruposData[0]
     }
     async selecionarGruposId(id) {
        const gruposData = await this.#connection.query("select * from grupos_funcionais where id ="+id)
        return gruposData[0]
    }

     async insertGrupos(nome,descricao){
        const retorno = await this.#connection.execute(`
        insert into grupos_funcionais (nome, descricao)
             
            values ('${nome}','${descricao}')
        `)
    }

    async deleteGrupos(id){
        const sql = `
        delete from grupos_funcionais
        where id= ${id}
        `
        const dt = await this.#connection.execute(sql)
        return dt[0]
    }
    async updateGrupos(nome,descricao,id) {
        const sql = `   UPDATE grupos_funcionais
        SET nome = "${nome}",
        descricao = "${descricao}"
        WHERE id = ${id};
      `;
      
        const dtbs = await this.#connection.execute(sql)
        return dtbs[0]
      }


    async selecionarUsuario(){
       const usuariosData = await this.#connection.query("select * from usuarios;")
       return usuariosData[0]
    }
    async selecionarUsuarioId(id) {
        const usuariosData = await this.#connection.query("select * from usuarios where id ="+id)
        return usuariosData[0]
    }
    
    async insertUsuario(nome,email,senha,tipo){
        const retorno = await this.#connection.execute(`
        insert into usuarios (nome, email,senha,tipo,criado_em)
             
            values ('${nome}','${email}','${senha}','${tipo}',NOW())
        `)
    }
    async deleteUsuarios(id){
        const sql = `
        delete from usuarios
        where id= ${id}
        `
        const dt = await this.#connection.execute(sql)
        return dt[0]
    }
    async updateUsuarios(nome,email,senha,tipo,id) {
        const sql = `   UPDATE usuarios
        SET nome = "${nome}",
        email = "${email}",
        senha = "${senha}",
        tipo = "${tipo}",
        criado_em = NOW()
        WHERE id = ${id};
      `;
      
        const dtbs = await this.#connection.execute(sql)
        return dtbs[0]
      }

    async selecionarPropriedades(){
        const propriedadesData = await this.#connection.query("select * from propriedades;")
        return propriedadesData[0]
     } 
    async selecionarPropriedadesId(id) {
        const propriedadesData = await this.#connection.query("select * from propriedades where id ="+id)
        return propriedadesData[0]
    }
    async insertPropriedades(composto,nome,valor){
        const retorno = await this.#connection.execute(`
        insert into propriedades (composto_id, propriedade_nome,propriedade_valor)
             
            values ('${composto}','${nome}','${valor}')
        `)
    }
    async deletePropriedades(id){
        const sql = `
        delete from propriedades
        where id= ${id}
        `
        const dt = await this.#connection.execute(sql)
        return dt[0]
    }
    async updatePropriedades(composto,nome,valor,id) {
        const sql = `   UPDATE propriedades
        SET composto_id = "${composto}",
        propriedade_nome = "${nome}",
        propriedade_valor = "${valor}"
        WHERE id = ${id};
      `;
      
        const dtbs = await this.#connection.execute(sql)
        return dtbs[0]
      }
    async selecionarUsos(){
        const usosData = await this.#connection.query("select * from usos;")
        return usosData[0]
     }
    async selecionarUsosId(id) {
        const usosData = await this.#connection.query("select * from usos where id ="+id)
        return usosData[0]
      }
    async insertUsos(composto,descricao){
        const retorno = await this.#connection.execute(`
        insert into usos (composto_id,uso_descricao)
             
            values ('${composto}','${descricao}')
        `)
    }
    async deleteUsos(id){
        const sql = `
        delete from usos
        where id= ${id}
        `
        const dt = await this.#connection.execute(sql)
        return dt[0]
    }
    async updateUso(composto,descricao,id) {
        const sql = `   UPDATE usos
        SET composto_id = "${composto}",
        uso_descricao = "${descricao}"
        WHERE id = ${id};
      `;
      
        const dtbs = await this.#connection.execute(sql)
        return dtbs[0]
      }
async verificarLogin(email, senha) {
    try {
       
        const sql = 'SELECT tipo FROM usuarios WHERE email = ? AND senha = ?';
        const [rows, fields] = await this.#connection.execute(sql, [email, senha]);
       
        return rows;
    } catch (error) {
      
        console.error('Erro ao verificar login:', error);
        throw error;
    }
}
}

module.exports = Database