import SQLite from "react-native-sqlite-storage"

SQLite.DEBUG(true)
SQLite.enablePromise(true)

const database_name = "casadacostura.db"
const database_version = "1.0"
const database_displayname = "Gerenciamento Casa Costura"
const database_size = 100000

export default class Database {

    //--------------------------------------------CONEXÃO----------------------------------------------
    // ABRIR CONEXÃO
    Conectar() {
        let db
        return new Promise((resolve) => {
            console.log("Checando a integridade do plugin ...")
            SQLite.echoTest().then(() => {
                console.log("Integridade Ok ...")
                console.log("Abrindo Banco de Dados ...")
                SQLite.openDatabase(database_name, database_version, database_displayname, database_size).then(DB => {
                    db = DB
                    console.log("Banco de dados Aberto")
                    db.executeSql('SELECT 1 FROM Produto LIMIT 1').then(() => {
                        console.log("O banco de dados está pronto ... Executando Consulta SQL ...")
                    }).catch((error) => {
                        console.log("Erro Recebido: ", error)
                        console.log("O Banco de dados não está pronto ... Criando Dados")
                        db.transaction((tx) => {
                            tx.executeSql('CREATE TABLE IF NOT EXISTS Produto (id INTEGER PRIMARY KEY AUTOINCREMENT, Categoria VARCHAR(30), Nome VARCHAR(50), Descricao VARCHAR(100), Tamanho VARCHAR(50), Valor VARCHAR(10), Unidade VARCHAR(10), Quantidade VARCHAR(10), Imagem TEXT )')
                        }).then(() => {
                            console.log("Tabela criada com Sucesso")
                        }).catch(error => {
                            console.log(error)
                        })
                    })
                    db.executeSql('SELECT 1 FROM Venda LIMIT 1').then(() => {
                        console.log("O banco de dados está pronto ... Executando Consulta SQL ...")
                    }).catch((error) => {
                        console.log("Erro Recebido: ", error)
                        console.log("O Banco de dados não está pronto ... Criando Dados")
                        db.transaction((tx) => {
                            tx.executeSql('CREATE TABLE IF NOT EXISTS Venda (id INTEGER PRIMARY KEY AUTOINCREMENT, Nome VARCHAR(50), Valor VARCHAR(10), Quantidade VARCHAR(10), ValorTotal VARCHAR(10), Data VARCHAR(10) )')
                        }).then(() => {
                            console.log("Tabela criada com Sucesso")
                        }).catch(error => {
                            console.log(error)
                        })
                    })
                    db.executeSql('SELECT 1 FROM Costura LIMIT 1').then(() => {
                        console.log("O banco de dados está pronto ... Executando Consulta SQL ...")
                    }).catch((error) => {
                        console.log("Erro Recebido: ", error)
                        console.log("O Banco de dados não está pronto ... Criando Dados")
                        db.transaction((tx) => {
                            tx.executeSql('CREATE TABLE IF NOT EXISTS Costura (id INTEGER PRIMARY KEY AUTOINCREMENT, Resumo VARCHAR(100), NomeCliente VARCHAR(50), Telefone VARCHAR(20), Descricao VARCHAR(100), Valor VARCHAR(10), DataEntrega VARCHAR(10), Pago VARCHAR(10), Entregue VARCHAR(10) )')
                        }).then(() => {
                            console.log("Tabela criada com Sucesso")
                        }).catch(error => {
                            console.log(error)
                        })
                    })
                    db.executeSql('SELECT 1 FROM Resumo LIMIT 1').then(() => {
                        console.log("O banco de dados está pronto ... Executando Consulta SQL ...")
                    }).catch((error) => {
                        console.log("Erro Recebido: ", error)
                        console.log("O Banco de dados não está pronto ... Criando Dados")
                        db.transaction((tx) => {
                            tx.executeSql('CREATE TABLE IF NOT EXISTS Resumo (id INTEGER PRIMARY KEY AUTOINCREMENT, Mes VARCHAR(20), Quantidade INT(9), Valor VARCHAR(10) )')
                        }).then(() => {
                            console.log("Tabela criada com Sucesso")
                        }).catch(error => {
                            console.log(error)
                        })
                    })
                    resolve(db)
                }).catch(error => {
                    console.log(error)
                })
            }).catch(error => {
                console.log("echoTest Falhou - plugin não funcional")
            })
        })
    }
    // FECHAR CONEXÃO
    Desconectar(db) {
        if (db) {
            console.log("Fechando Banco de Dados")
            db.close().then(status => {
                console.log("Banco de dados Desconectado!!")
            }).catch(error => {
                this.errorCB(error)
            })
        } else {
            console.log("A conexão com o banco não está aberta")
        }
    }
    //--------------------------------------------PRODUTO----------------------------------------------
    InserirProduto(produto) {
        return new Promise((resolve) => {
            this.Conectar().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('INSERT INTO Produto(Categoria, Nome, Descricao, Tamanho, Valor, Unidade, Quantidade, Imagem) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [produto.Categoria, produto.Nome, produto.Descricao, produto.Tamanho, produto.Valor, produto.Unidade, produto.Quantidade, produto.Imagem]).then(([tx, results]) => {
                        resolve(results)
                    })
                }).then((result) => {
                    this.Desconectar(db)
                }).catch((err) => {
                    console.log(err)
                })
            }).catch((err) => {
                console.log(err)
            })
        })
    }
    ListarProdutos() {
        return new Promise((resolve) => {
            const listaProdutos = []
            this.Conectar().then((db) => {
                db.transaction((tx) => {
                    //Query SQL para listar os dados da tabela   
                    tx.executeSql('SELECT * FROM Produto', []).then(([tx, results]) => {
                        console.log("Consulta completa")
                        var len = results.rows.length
                        for (let i = 0; i < len; i++) {
                            let row = results.rows.item(i)
                            const { id, Categoria, Nome, Descricao, Tamanho, Valor, Unidade, Quantidade, Imagem } = row
                            listaProdutos.push({ id, Categoria, Nome, Descricao, Tamanho, Valor, Unidade, Quantidade, Imagem })
                        }
                        resolve(listaProdutos)
                    })
                }).then((result) => {
                    this.Desconectar(db)
                }).catch((err) => {
                    console.log(err)
                })
            }).catch((err) => {
                console.log(err)
            })
        })
    }
    DeletarProduto(id) {
        return new Promise((resolve) => {
            this.Conectar().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('DELETE FROM Produto WHERE id = ?', [id]).then(([tx, results]) => {
                        console.log(results)
                        resolve(results)
                    })
                }).then((result) => {
                    this.Desconectar(db)
                }).catch((err) => {
                    console.log(err)
                })
            }).catch((err) => {
                console.log(err)
            })
        })
    }    
    ListarNomeProdutos() {
        return new Promise((resolve) => {
            const listaNomeProdutos = []
            this.Conectar().then((db) => {
                db.transaction((tx) => {
                    //Query SQL para listar os dados da tabela   
                    tx.executeSql('SELECT FROM Produto WHERE Nome = ?', []).then(([tx, results]) => {
                        console.log("Consulta completa")
                        let row = results.rows.item(i)
                        const Nome = row
                        listaNomeProdutos.push(Nome)
                        resolve(listaNomeProdutos)
                    })
                }).then((result) => {
                    this.Desconectar(db)
                }).catch((err) => {
                    console.log(err)
                })
            }).catch((err) => {
                console.log(err)
            })
        })
    }
    AtualizarProdutoCategoria(id,Categoria) {
        return new Promise((resolve) => {
            this.Conectar().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql("UPDATE Produto SET Categoria = ? WHERE id = ?", [Categoria, id]).then(([tx, results]) => {
                        resolve(results)
                    })
                }).then((result) => {
                    this.Desconectar(db)
                }).catch((err) => {
                    console.log(err)
                })
            }).catch((err) => {
                console.log(err)
            })
        })
    }
    AtualizarProdutoNome(id,Nome) {
        return new Promise((resolve) => {
            this.Conectar().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql("UPDATE Produto SET Nome = ? WHERE id = ?", [Nome, id]).then(([tx, results]) => {
                        resolve(results)
                    })
                }).then((result) => {
                    this.Desconectar(db)
                }).catch((err) => {
                    console.log(err)
                })
            }).catch((err) => {
                console.log(err)
            })
        })
    }
    AtualizarProdutoDescricao(id,Descricao) {
        return new Promise((resolve) => {
            this.Conectar().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql("UPDATE Produto SET Descricao = ? WHERE id = ?", [Descricao, id]).then(([tx, results]) => {
                        resolve(results)
                    })
                }).then((result) => {
                    this.Desconectar(db)
                }).catch((err) => {
                    console.log(err)
                })
            }).catch((err) => {
                console.log(err)
            })
        })
    }
    AtualizarProdutoTamanho(id,Tamanho) {
        return new Promise((resolve) => {
            this.Conectar().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql("UPDATE Produto SET Tamanho = ? WHERE id = ?", [Tamanho, id]).then(([tx, results]) => {
                        resolve(results)
                    })
                }).then((result) => {
                    this.Desconectar(db)
                }).catch((err) => {
                    console.log(err)
                })
            }).catch((err) => {
                console.log(err)
            })
        })
    }
    AtualizarProdutoValor(id,Valor) {
        return new Promise((resolve) => {
            this.Conectar().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql("UPDATE Produto SET Valor = ? WHERE id = ?", [Valor, id]).then(([tx, results]) => {
                        resolve(results)
                    })
                }).then((result) => {
                    this.Desconectar(db)
                }).catch((err) => {
                    console.log(err)
                })
            }).catch((err) => {
                console.log(err)
            })
        })
    }
    AtualizarProdutoUnidade(id,Unidade) {
        return new Promise((resolve) => {
            this.Conectar().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql("UPDATE Produto SET Unidade = ? WHERE id = ?", [Unidade, id]).then(([tx, results]) => {
                        resolve(results)
                    })
                }).then((result) => {
                    this.Desconectar(db)
                }).catch((err) => {
                    console.log(err)
                })
            }).catch((err) => {
                console.log(err)
            })
        })
    }
    AtualizarProdutoQuantidade(id,Quantidade) {
        return new Promise((resolve) => {
            this.Conectar().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql("UPDATE Produto SET Quantidade = ? WHERE id = ?", [Quantidade, id]).then(([tx, results]) => {
                        resolve(results)
                    })
                }).then((result) => {
                    this.Desconectar(db)
                }).catch((err) => {
                    console.log(err)
                })
            }).catch((err) => {
                console.log(err)
            })
        })
    }
    AtualizarProdutoImagem(id,Imagem) {
        return new Promise((resolve) => {
            this.Conectar().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql("UPDATE Produto SET Imagem = ? WHERE id = ?", [Imagem, id]).then(([tx, results]) => {
                        resolve(results)
                    })
                }).then((result) => {
                    this.Desconectar(db)
                }).catch((err) => {
                    console.log(err)
                })
            }).catch((err) => {
                console.log(err)
            })
        })
    }
    //--------------------------------------------VENDA----------------------------------------------
    InserirVenda(venda) {
        return new Promise((resolve) => {
            this.Conectar().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('INSERT INTO Venda(Nome, Valor, Quantidade, ValorTotal, Data) VALUES (?, ?, ?, ?, ?)', [venda.Nome, venda.Valor, venda.Quantidade, venda.ValorTotal, venda.Data]).then(([tx, results]) => {
                        resolve(results)
                    })
                }).then((result) => {
                    this.Desconectar(db)
                }).catch((err) => {
                    console.log(err)
                })
            }).catch((err) => {
                console.log(err)
            })
        })
    }
    ListarVendas() {
        return new Promise((resolve) => {
            const listaVendas = []
            this.Conectar().then((db) => {
                db.transaction((tx) => {
                    //Query SQL para listar os dados da tabela   
                    tx.executeSql('SELECT * FROM Venda', []).then(([tx, results]) => {
                        console.log("Consulta completa")
                        var len = results.rows.length
                        for (let i = 0; i < len; i++) {
                            let row = results.rows.item(i)
                            const { id, Nome, Valor, Quantidade, ValorTotal, Data } = row
                            listaVendas.push({ id, Nome, Valor, Quantidade, ValorTotal, Data })
                        }
                        resolve(listaVendas)
                    })
                }).then((result) => {
                    this.Desconectar(db)
                }).catch((err) => {
                    console.log(err)
                })
            }).catch((err) => {
                console.log(err)
            })
        })
    }    
    DeletarVenda(id) {  
        return new Promise((resolve) => {    
            this.Conectar().then((db) => {      
                db.transaction((tx) => {    
                    tx.executeSql('DELETE FROM Venda WHERE id = ?', [id]).then(([tx, results]) => {          
                        console.log(results)       
                        resolve(results)    
                    })    
                }).then((result) => {        
                    this.Desconectar(db)     
                }).catch((err) => {        
                    console.log(err)      
                })    
            }).catch((err) => {      
                console.log(err)    
            })  
        })
    }    
    AtualizarVendaNome(id,Nome){
        return new Promise((resolve) => {    
            this.Conectar().then((db) => {      
                db.transaction((tx) => {       
                    tx.executeSql("UPDATE Venda SET Nome = ? WHERE id = ?", [Nome, id]).then(([tx, results]) => {          
                    resolve(results)      
                })    
            }).then((result) => {        
                  this.Desconectar(db)     
                }).catch((err) => {        
                  console.log(err)     
                }) 
            }).catch((err) => {     
                console.log(err)  
            })
        })
    }
    AtualizarVendaValor(id,Valor){
        return new Promise((resolve) => {    
            this.Conectar().then((db) => {      
                db.transaction((tx) => {       
                    tx.executeSql("UPDATE Venda SET Valor = ? WHERE id = ?", [Valor, id]).then(([tx, results]) => {          
                    resolve(results)      
                })    
            }).then((result) => {        
                  this.Desconectar(db)      
                }).catch((err) => {        
                  console.log(err)     
                }) 
            }).catch((err) => {     
                console.log(err)  
            })
        })
    }
    AtualizarVendaQuantidade(id,Quantidade){
        return new Promise((resolve) => {    
            this.Conectar().then((db) => {      
                db.transaction((tx) => {       
                    tx.executeSql("UPDATE Venda SET Quantidade = ? WHERE id = ?", [Quantidade, id]).then(([tx, results]) => {          
                    resolve(results)      
                })    
            }).then((result) => {        
                  this.Desconectar(db)     
                }).catch((err) => {        
                  console.log(err)     
                }) 
            }).catch((err) => {     
                console.log(err)  
            })
        })
    }
    AtualizarVendaData(id,Data){
        return new Promise((resolve) => {    
            this.Conectar().then((db) => {      
                db.transaction((tx) => {       
                    tx.executeSql("UPDATE Venda SET Data = ? WHERE id = ?", [Data, id]).then(([tx, results]) => {          
                    resolve(results)      
                })    
            }).then((result) => {        
                  this.Desconectar(db)      
                }).catch((err) => {        
                  console.log(err)     
                }) 
            }).catch((err) => {     
                console.log(err)  
            })
        })
    }
    //--------------------------------------------COSTURA----------------------------------------------
    InserirCostura(costura) {
        return new Promise((resolve) => {
            this.Conectar().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('INSERT INTO Costura(Resumo, NomeCliente, Telefone, Descricao, Valor, DataEntrega, Pago, Entregue) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [costura.Resumo, costura.NomeCliente, costura.Telefone, costura.Descricao, costura.Valor, costura.DataEntrega, costura.Pago, costura.Entregue]).then(([tx, results]) => {
                        resolve(results)
                    })
                }).then((result) => {
                    this.Desconectar(db)
                }).catch((err) => {
                    console.log(err)
                })
            }).catch((err) => {
                console.log(err)
            })
        })
    }
    ListarCosturas() {
        return new Promise((resolve) => {
            const listaCosturas = []
            this.Conectar().then((db) => {
                db.transaction((tx) => {
                    //Query SQL para listar os dados da tabela   
                    tx.executeSql('SELECT * FROM Costura', []).then(([tx, results]) => {
                        console.log("Consulta completa")
                        var len = results.rows.length
                        for (let i = 0; i < len; i++) {
                            let row = results.rows.item(i)
                            const { id, Resumo, NomeCliente, Telefone, Descricao, Valor, DataEntrega, Pago, Entregue } = row
                            listaCosturas.push({ id, Resumo, NomeCliente, Telefone, Descricao, Valor, DataEntrega, Pago, Entregue })
                        }
                        resolve(listaCosturas)
                    })
                }).then((result) => {
                    this.Desconectar(db)
                }).catch((err) => {
                    console.log(err)
                })
            }).catch((err) => {
                console.log(err)
            })
        })
    }
    DeletarCostura(id) {
        return new Promise((resolve) => {
            this.Conectar().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('DELETE FROM Costura WHERE id = ?', [id]).then(([tx, results]) => {
                        console.log(results)
                        resolve(results)
                    })
                }).then((result) => {
                    this.Desconectar(db)
                }).catch((err) => {
                    console.log(err)
                })
            }).catch((err) => {
                console.log(err)
            })
        })
    }
    AtualizarCosturaResumo(id,Resumo){
        return new Promise((resolve) => {    
            this.Conectar().then((db) => {      
                db.transaction((tx) => {       
                    tx.executeSql("UPDATE Costura SET Resumo = ? WHERE id = ?", [Resumo, id]).then(([tx, results]) => {          
                    resolve(results)      
                })    
            }).then((result) => {        
                  this.Desconectar(db)     
                }).catch((err) => {        
                  console.log(err)     
                }) 
            }).catch((err) => {     
                console.log(err)  
            })
        })
    }
    AtualizarCosturaNome(id,NomeCliente){
        return new Promise((resolve) => {    
            this.Conectar().then((db) => {      
                db.transaction((tx) => {       
                    tx.executeSql("UPDATE Costura SET Nome = ? WHERE id = ?", [NomeCliente, id]).then(([tx, results]) => {          
                    resolve(results)      
                })    
            }).then((result) => {        
                  this.Desconectar(db)     
                }).catch((err) => {        
                  console.log(err)     
                }) 
            }).catch((err) => {     
                console.log(err)  
            })
        })
    }
    AtualizarCosturaTelefone(id,Telefone){
        return new Promise((resolve) => {    
            this.Conectar().then((db) => {      
                db.transaction((tx) => {       
                    tx.executeSql("UPDATE Costura SET Telefone = ? WHERE id = ?", [Telefone, id]).then(([tx, results]) => {          
                    resolve(results)      
                })    
            }).then((result) => {        
                  this.Desconectar(db)     
                }).catch((err) => {        
                  console.log(err)     
                }) 
            }).catch((err) => {     
                console.log(err)  
            })
        })
    }
    AtualizarCosturaDescricao(id,Descricao){
        return new Promise((resolve) => {    
            this.Conectar().then((db) => {      
                db.transaction((tx) => {       
                    tx.executeSql("UPDATE Costura SET Descricao = ? WHERE id = ?", [Descricao, id]).then(([tx, results]) => {          
                    resolve(results)      
                })    
            }).then((result) => {        
                  this.Desconectar(db)      
                }).catch((err) => {        
                  console.log(err)     
                }) 
            }).catch((err) => {     
                console.log(err)  
            })
        })
    }
    AtualizarCosturaValor(id,Valor){
        return new Promise((resolve) => {    
            this.Conectar().then((db) => {      
                db.transaction((tx) => {       
                    tx.executeSql("UPDATE Costura SET Valor = ? WHERE id = ?", [Valor, id]).then(([tx, results]) => {          
                    resolve(results)      
                })    
            }).then((result) => {        
                  this.Desconectar(db)      
                }).catch((err) => {        
                  console.log(err)     
                }) 
            }).catch((err) => {     
                console.log(err)  
            })
        })
    }
    AtualizarCosturaPago(id,Pago){
        return new Promise((resolve) => {    
            this.Conectar().then((db) => {      
                db.transaction((tx) => {       
                    tx.executeSql("UPDATE Costura SET Pago = ? WHERE id = ?", [Pago, id]).then(([tx, results]) => {          
                    resolve(results)      
                })    
            }).then((result) => {        
                  this.Desconectar(db)     
                }).catch((err) => {        
                  console.log(err)     
                }) 
            }).catch((err) => {     
                console.log(err)  
            })
        })
    }
    AtualizarCosturaEntregue(id,Entregue){
        return new Promise((resolve) => {    
            this.Conectar().then((db) => {      
                db.transaction((tx) => {       
                    tx.executeSql("UPDATE Costura SET Entregue = ? WHERE id = ?", [Entregue, id]).then(([tx, results]) => {          
                    resolve(results)      
                })    
            }).then((result) => {        
                  this.Desconectar(db)     
                }).catch((err) => {        
                  console.log(err)     
                }) 
            }).catch((err) => {     
                console.log(err)  
            })
        })
    }
    AtualizarCosturaData(id,Data){
        return new Promise((resolve) => {    
            this.Conectar().then((db) => {      
                db.transaction((tx) => {       
                    tx.executeSql("UPDATE Costura SET Data = ? WHERE id = ?", [Data, id]).then(([tx, results]) => {          
                    resolve(results)      
                })    
            }).then((result) => {        
                  this.Desconectar(db)      
                }).catch((err) => {        
                  console.log(err)     
                }) 
            }).catch((err) => {     
                console.log(err)  
            })
        })
    }
    //--------------------------------------------RESUMO----------------------------------------------
    InserirResumo(resumo) {
        return new Promise((resolve) => {
            this.Conectar().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('INSERT INTO Resumo(Mes, Quantidade, Valor) VALUES (?, ?, ?)', [resumo.Mes, resumo.Quantidade, resumo.Valor]).then(([tx, results]) => {
                        resolve(results)
                    })
                }).then((result) => {
                    this.Desconectar(db)
                }).catch((err) => {
                    console.log(err)
                })
            }).catch((err) => {
                console.log(err)
            })
        })
    }
    ListarResumo() {
        return new Promise((resolve) => {
            const listaResumo = []
            this.Conectar().then((db) => {
                db.transaction((tx) => {
                    //Query SQL para listar os dados da tabela   
                    tx.executeSql('SELECT * FROM Resumo', []).then(([tx, results]) => {
                        console.log("Consulta completa")
                        var len = results.rows.length
                        for (let i = 0; i < len; i++) {
                            let row = results.rows.item(i)
                            const { id, Mes, Quantidade, Valor } = row
                            listaResumo.push({ id, Mes, Quantidade, Valor })
                        }
                        resolve(listaResumo)
                    })
                }).then((result) => {
                    this.Desconectar(db)
                }).catch((err) => {
                    console.log(err)
                })
            }).catch((err) => {
                console.log(err)
            })
        })
    }
}