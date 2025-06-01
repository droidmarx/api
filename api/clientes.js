export default async function handler(req, res) {
  const apiUrl = "https://api.painelcliente.com/get_clients_all/PANELCLIENT_AD73H-4XRDW-5TW60-1D0ZG";
  const secretKey = "d0d9eff4f629d8c06d5ba9bc864669ff";

  // Habilitar CORS
  res.setHeader("Access-Control-Allow-Origin", "*"); // Libera todas as origens
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS"); // Permite métodos
  res.setHeader("Access-Control-Allow-Headers", "Content-Type"); // Permite headers específicos

  // Se o método for OPTIONS (pré-flight), apenas retorne 200 sem processar mais nada
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "POST") {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          secret: secretKey,
          page: 1,
          limit: 400
        })
      });

      const data = await response.json();
      res.status(200).json(data); // Envia os dados da API para o frontend

    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar clientes", details: error.message });
    }
  } else {
    // Se o método não for POST, retorna um erro 405 (Method Not Allowed)
    res.status(405).json({ error: "Método não permitido" });
  }
}