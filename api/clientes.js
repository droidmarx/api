export default async function handler(req, res) {
        if (req.method !== "POST") {
                return res.status(405).json({ error: "Método não permitido" });
        }
        
        const baseUrl = "https://api.painelcliente.com";
        const token = "PANELCLIENT_AD73H-4XRDW-5TW60-1D0ZG";
        const secretKey = "4e22fff5f896bb07f2e01e47e5061b80";
        
        let apiUrl;
        switch (req.body.action) {
                case "listClients":
                        apiUrl = `${baseUrl}/get_clients_all/${token}`;
                        break;
                case "createTest":
                        apiUrl = `${baseUrl}/trial_create/${token}`;
                        break;
                case "renewClient":
                        apiUrl = `${baseUrl}/renew_client/${token}`;
                        break;
                case "updateClient":
                        apiUrl = `${baseUrl}/update_client/${token}`;
                        break;
                default:
                        return res.status(400).json({ error: "Ação não reconhecida" });
        }
        
        try {
                const response = await fetch(apiUrl, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                                secret: secretKey,
                                ...req.body.data // Inclui dados adicionais passados na requisição
                        })!
                });
                
                const data = await response.json();
                res.setHeader("Access-Control-Allow-Origin", "*"); // Libera CORS
                res.status(200).json(data);
        } catch (error) {
                res.status(500).json({ error: "Erro ao processar requisição", details: error.message });
        }
}