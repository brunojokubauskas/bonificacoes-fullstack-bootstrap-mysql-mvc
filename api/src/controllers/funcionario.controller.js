const con = require('../database/conn');
const Funcionario = require('../models/Funcionario');

// Cria um novo funcionário
const createFuncionario = (req, res) => {
  const funcionario = new Funcionario(req.body); // Cria uma instância da classe Funcionario com os dados do corpo da requisição

  con.query(funcionario.create(), function (err, result) {
    if (err) {
      return res.render('erro', { err: err }); // Renderiza a página de erro em caso de erro na consulta SQL
    }

    res.redirect('/funcionario/listar'); // Redireciona para a rota de listagem de funcionários
  });
};

// Lê os dados de todos os funcionários
const readFuncionario = (req, res) => {
  const funcionario = new Funcionario(req.body); // Cria uma instância da classe Funcionario com os dados do corpo da requisição

  con.query(funcionario.read(), function (err, result) {
    if (err) {
      return res.render('erro', { err: err }); // Renderiza a página de erro em caso de erro na consulta SQL
    }

    res.render('index', { titulo: 'Bonificações', dados: result }); // Renderiza a página index com os dados dos funcionários
  });
};

// Obtém um funcionário pelo nome
const getByName = (req, res) => {
  const { nomeCompleto } = req.query;

  const q = `SELECT * FROM funcionario WHERE nome_completo = '${nomeCompleto}'`; // Monta a consulta SQL para obter o funcionário pelo nome
  con.query(q, (err, result) => {
    if (err) {
      return res.status(404).send('Erro:' + err); // Retorna um erro 404 caso ocorra um erro na consulta SQL
    }

    res.status(200).json(result); // Retorna o resultado da consulta em formato JSON
  });
};

// Atualiza um funcionário
const updateFuncionario = (req, res) => {
  const funcionario = new Funcionario(req.body); // Cria uma instância da classe Funcionario com os dados do corpo da requisição

  con.query(funcionario.update(), function (err, result) {
    if (err) {
      return res.render('erro', { err: err }); // Renderiza a página de erro em caso de erro na consulta SQL
    }

    if (result.affectedRows > 0) {
      res.redirect('/funcionario/listar'); // Redireciona para a rota de listagem de funcionários caso algum registro seja afetado
    } else {
      return res.render('erro', { err: 'Nenhum registro afetado.' }); // Renderiza a página de erro caso nenhum registro seja afetado
    }
  });
};

// Exclui um funcionário
const delFuncionario = (req, res) => {
  const funcionario = new Funcionario(req.params); // Cria uma instância da classe Funcionario com os parâmetros da requisição

  con.query(funcionario.del(), function (err, result) {
    if (err) {
      return res.render('erro', { err: err }); // Renderiza a página de erro em caso de erro na consulta SQL
    }

    if (result.affectedRows > 0) {
      res.redirect('/funcionario/listar'); // Redireciona para a rota de listagem de funcionários caso algum registro seja afetado
    } else {
      return res.render('erro', { err: 'Nenhum registro afetado.' }); // Renderiza a página de erro caso nenhum registro seja afetado
    }
  });
};

module.exports = {
  createFuncionario,
  readFuncionario,
  getByName,
  updateFuncionario,
  delFuncionario,
};
