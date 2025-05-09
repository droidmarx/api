export default async function handler(req, res) {
  const apiUrl = "https://api.painelcliente.com/renew_client/PANELCLIENT_AD73H-4XRDW-5TW60-1D0ZG";
  const secretKey = "4e22fff5f896bb07f2e01e47e5061b80";

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method === "POST") {
    const { username, month } = req.body;

    if (!username || !month) {
      return res.status(400).json({ error: "Parâmetros 'username' e 'month' são obrigatórios." });
    }

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          secret: secretKey,
          username,
          month
        })
      });

      const data = await response.json();
      res.status(200).json(data);

    } catch (error) {
      res.status(500).json({ error: "Erro ao renovar cliente", details: error.message });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
}