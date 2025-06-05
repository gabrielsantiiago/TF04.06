# Projeto de Escalabilidade e Otimização em NoSQL

## 1. Modelagem de Dados

Utilizaremos o **MongoDB**, pois ele oferece:
- **Flexibilidade de esquema**: permite que cada documento seja armazenado com uma estrutura variável, facilitando ajustes conforme o sistema evolui.
- **Agilidade nas consultas**: a representação natural de dados em formato JSON torna as operações de consulta mais simples e diretas.

## 2. Estratégia de Escalabilidade

### Escalabilidade Horizontal
Utilizaremos a escalabilidade horizontal devido a:
- **Alta disponibilidade**: melhora o tempo de resposta em ambientes com alta leitura e escrita.
- **Distribuição de cargas**: permite que a demanda seja compartilhada entre múltiplos servidores.

### Estratégia de Sharding – Geográfica
- **Chave de partição:** `origem.estado`  
  Como as entregas geralmente ocorrem em regiões específicas, dividir os dados por estado direciona as consultas para o shard daquela área, reduzindo a latência e evitando que um único servidor seja sobrecarregado.

## 3. Consulta para Buscar Entregas com Status "em trânsito" para um Determinado Cliente

Consulta para Buscar Entregas com Status "em trânsito" para um Determinado Cliente
 db.entregas.find({
  id_cliente: "CLI-0001",
  status: "em trânsito"
})
 Irei otimizar a consulta exemplo:
db.entregas.createIndex({ id_cliente: 1, status: 1 })
Esse indice permite que o MongoDB filtre rapidamente documementos pela combinação de id_cliente e status.
Para projeto em camposdb.entregas.find(
  { id_cliente: "CLI-0001", status: "em trânsito" },
  { id_entrega: 1, origem: 1, destino: 1, _id: 0 }
)
Utilizamos para espesificar os campos necessarios na projeção, a consulta retorna menos dados, que reduz tempo de resposta e a carga da rede

E o explain mostra como o mongoDB esta processando a consulta

 ## 4 - Monitoramento e Métricas

Monitoraria latência, taxa de erros e uso de CPU/memória/I/O para detectar gargalos.

Se um shard se sobrecarregar (hot shard), migro chunks para shards menos carregados via rebalanceamento.

Essa estratégia mantém desempenho consistente, reduz latência e garante escalabilidade contínua.