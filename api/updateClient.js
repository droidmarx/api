export default async function handler(req, res) {
        // Permitir apenas requisições POST
        if (req.method !== "POST") {
                return res.status(405).json({ error: "Método não permitido" });
        }
        
        const apiUrl = "https://api.painelcliente.com/update_client/PANELCLIENT_AD73H-4XRDW-5TW60-1D0ZG";
        const { secret, username, password, idbouquet, notes } = req.body;
        
        // Verificar se os parâmetros obrigatórios estão presentes
        if (!secret || !username) {
                return res.status(400).json({ error: "Parâmetros obrigatórios faltando" });
        }
        
        // Construção dinâmica dos dados, removendo valores `undefined`
        const data = { secret, username };
        if (password) data.password = password;
        if (idbouquet) data.idbouquet = idbouquet;
        if (notes) data.notes = notes;
        
        try {
                // Enviando a requisição para a API externa
                const response = await fetch(apiUrl, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(data),
                });
                
                // Verificando se a resposta da API externa é válida
                if (!response.ok) {
                        const errorData = await response.json();
                        return res.status(response.status).json({ error: "Erro na API externa", details: errorData });
                }
                
                const result = await response.json();
                
                // Verificando se a API externa retornou sucesso
                if (result.result) {
                        return res.status(200).json({ message: result.data.mens });
                } else {
                        return res.status(500).json({ error: "Erro ao atualizar cliente", details: result });
                }
        } catch (error) {
                return res.status(500).json({ error: "Erro interno", details: error.message });
        }
}