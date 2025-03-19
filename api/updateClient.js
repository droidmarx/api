// pages/api/updateClient.js

export default async function handler(req, res) {
    // Verificar se o método da requisição é POST
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método não permitido" });
    }

    const apiUrl = "https://api.painelcliente.com/update_client/PANELCLIENT_AD73H-4XRDW-5TW60-1D0ZG"; // URL para atualização
    const { secret, username, password, idbouquet, notes } = req.body; // Extraindo os parâmetros da requisição

    if (!secret || !username) {
        return res.status(400).json({ error: "Parâmetros obrigatórios faltando" });
    }

    // Estrutura para os dados a serem enviados
    const data = {
        secret,
        username,
        password,
        idbouquet,
        notes
    };

    try {
        // Enviar a requisição POST para a API de atualização
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        // Verificar se a resposta foi bem-sucedida
        if (response.status === 200 && result.result) {
            return res.status(200).json({ message: result.data.mens });  // Retorna a mensagem de sucesso
        } else {
            return res.status(500).json({ error: "Erro ao atualizar cliente", details: result });
        }
    } catch (error) {
        // Erro na requisição
        return res.status(500).json({ error: "Erro interno", details: error.message });
    }
}