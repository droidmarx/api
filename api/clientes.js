export default async function handler(req, res) {
    const { URL, TOKEN } = req.query;

    if (req.method === "POST") {
        if (req.url.includes('trial_create')) {
            const { secret, username, password, idbouquet, notes } = req.body;
            
            if (!secret || !username || !password || !idbouquet) {
                return res.status(400).json({ error: "Parâmetros obrigatórios não fornecidos" });
            }

            const apiUrl = `https://api.painelcliente.com/${URL}/trial_create/${TOKEN}`;

            try {
                const response = await fetch(apiUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        secret,
                        username,
                        password,
                        idbouquet,
                        notes
                    })
                });

                const data = await response.json();
                res.setHeader("Access-Control-Allow-Origin", "*"); // Libera CORS
                return res.status(200).json(data);
            } catch (error) {
                return res.status(500).json({ error: "Erro ao criar trial", details: error.message });
            }
        } else {
            const apiUrl = "https://api.painelcliente.com/get_clients_all/PANELCLIENT_AD73H-4XRDW-5TW60-1D0ZG";
            const secretKey = "4e22fff5f896bb07f2e01e47e5061b80";

            try {
                const response = await fetch(apiUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        secret: secretKey,
                        page: 1,
                        limit: 400
                    })
                });

                const data = await response.json();
                res.setHeader("Access-Control-Allow-Origin", "*"); // Libera CORS
                return res.status(200).json(data);
            } catch (error) {
                return res.status(500).json({ error: "Erro ao buscar clientes", details: error.message });
            }
        }
    } else {
        return res.status(405).json({ error: "Método não permitido" });
    }
}