export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método não permitido" });
    }

    const apiUrl = "https://api.painelcliente.com/update_client/PANELCLIENT_AD73H-4XRDW-5TW60-1D0ZG";
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
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar clientes", details: error.message });
    }
}