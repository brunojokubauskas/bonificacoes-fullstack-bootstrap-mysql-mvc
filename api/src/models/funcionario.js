class Funcionario {
  constructor(i) {
    this.matricula = i.matricula;
    this.nomeCompleto = i.nomeCompleto;
    this.dataAdmissao = i.dataAdmissao;
    this.salario = i.salario;
    this.dataPagto = i.dataPagto;
    this.desempenho = i.desempenho;
    this.bonificacao = this.calcBonificacao();
  }

  // Retorna a string de consulta SQL para inserir um novo funcionário no banco de dados
  create() {
    return `INSERT INTO funcionario VALUE(DEFAULT, "${this.nomeCompleto}", "${this.dataAdmissao}",  ${this.salario}, "${this.dataPagto}",  ${this.desempenho}, ${this.bonificacao})`;
  }

  // Retorna a string de consulta SQL para ler todos os funcionários do banco de dados
  read() {
    return `SELECT * FROM funcionario`;
  }

  // Retorna a string de consulta SQL para atualizar as informações de um funcionário no banco de dados
  update() {
    return `UPDATE funcionario SET nome_completo = "${this.nomeCompleto}", data_admissao = "${this.dataAdmissao}", salario = ${this.salario}, data_pagto = "${this.dataPagto}", desempenho = ${this.desempenho}, bonificacao = ${this.bonificacao} WHERE matricula = ${this.matricula}`;
  }

  // Retorna a string de consulta SQL para excluir um funcionário do banco de dados
  del() {
    return `DELETE FROM funcionario WHERE matricula = ${this.matricula}`;
  }

  // Retorna o número de anos trabalhados pelo funcionário
  anosTrabalhados() {
    let date1 = new Date(this.dataAdmissao);
    let date2 = new Date();

    let diferencaEmMilissegundos = Math.abs(date2.getTime() - date1.getTime());

    let diferencaEmAnos = Math.floor(
      diferencaEmMilissegundos / (365.25 * 24 * 60 * 60 * 1000)
    );

    return diferencaEmAnos;
  }

  // Calcula a bonificação do funcionário
  calcBonificacao() {
    return this.salario * 0.02 * this.anosTrabalhados() * this.desempenho;
  }
}

module.exports = Funcionario;

// Factory Method
function criarFuncionario(i) {
  return new Funcionario(i);
}

module.exports = {
  criarFuncionario
};
