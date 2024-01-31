const express = require('express');
const app = express();
const port = 3000; 


const despesas = [
  { id: 1, descricao: 'Almoço de trabalho', valor: 20.50, data: '2024-01-30' },
  { id: 2, descricao: 'Combustível', valor: 40.00, data: '2024-01-29' },
];

// Rota GET para obter todas as despesas
app.get('/', (req, res) => {
  res.json(despesas);
});

// Rota GET para obter despesas por categoria
app.get('/', (req, res) => {
  const categoria = req.params.categoria;
  const despesasPorCategoria = despesas.filter(despesa => despesa.categoria === categoria);
  res.json(despesasPorCategoria);
});

// Rota GET para obter resumo mensal de despesas
app.get('/', (req, res) => {
  const ano = parseInt(req.params.ano);
  const mes = parseInt(req.params.mes);

  const despesasNoMes = despesas.filter(despesa => {
    const data = new Date(despesa.data);
    return data.getFullYear() === ano && data.getMonth() + 1 === mes;
  const totalDespesas = despesasNoMes.reduce((total, despesa) => total + despesa.valor, 0);

  const despesasPorCategoria = {};
  despesasNoMes.forEach(despesa => {
    if (!despesasPorCategoria[despesa.categoria]) {
      despesasPorCategoria[despesa.categoria] = 0;
    }
    despesasPorCategoria[despesa.categoria] += despesa.valor;
  });

  res.json({
    ano,
    mes,
    total_despesas: totalDespesas,
    despesas_por_categoria: despesasPorCategoria,
  });
});

app.listen(port, () => {
  console.log(`Servidor tá on http://localhost:${port}`);
})});
