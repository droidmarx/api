export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método não permitido" });
    }

    const apiUrl = "https://api.painelcliente.com/update_client/PANELCLIENT_AD73H-4XRDW-5TW60-1D0ZG";
    const { secret, username, password, idbouquet, notes } = req.body;

    if (!secret || !username) {
        return res.status(400).json({ error: "Parâmetros obrigatórios faltando" });
    }

    const data = { secret, username };
    if (password) data.password = password;
    if (idbouquet) data.idbouquet = idbouquet;
    if (notes) data.notes = notes;

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        // Verifica se a resposta é JSON
        const contentType = response.headers.get("content-type");
        let result;
        if (contentType && contentType.includes("application/json")) {
            result = await response.json();
        } else {
            result = await response.text(); // Captura erro em texto/HTML
        }

        if (!response.ok) {
            return res.status(response.status).json({ error: "Erro na API externa", details: result });
        }

        return res.status(200).json({ message: result?.data?.mens || "Atualização bem-sucedida" });

    } catch (error) {
        return res.status(500).json({ error: "Erro interno", details: error.message });
    }
}