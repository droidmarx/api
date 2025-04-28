export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { endpoint, body } = req.body; // Recebe o endpoint e o corpo da requisição

  const apiUrl = `https://api.painelcliente.com/${endpoint}/PANELCLIENT_AD73H-4XRDW-5TW60-1D0ZG`;
  const secretKey = "4e22fff5f896bb07f2e01e47e5061b80"; // Sua chave secreta

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: secretKey, ...body }) // Passa os dados para a API PainelCliente
    });

    const data = await response.json();
    res.setHeader("Access-Control-Allow-Origin", "*"); // Libera CORS
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar dados", details: error.message });
  }
}