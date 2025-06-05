db.createCollection("entregas");

db.entregas.insertMany([
  {
    id_entrega: "ENT-0001",
    id_cliente: "CLI-0001",
    origem: { cidade: "São Paulo", estado: "SP" },
    destino: { cidade: "Rio de Janeiro", estado: "RJ" },
    status: "em trânsito",
    data_coleta: ISODate("2025-06-04T10:00:00Z"),
    data_entrega: ISODate("2025-06-05T18:00:00Z")
  }
]);

db.entregas.createIndex({ id_cliente: 1, status: 1 });