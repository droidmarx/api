export default async function handler(req, res) {
    // Libera o CORS para permitir requisições externas
    res.setHeader("Access-Control-Allow-Origin", "*");

    // Verifica se o método é POST
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método não permitido" });
    }

    // Chave secreta e URL base da API do painel
    const secretKey = "4e22fff5f896bb07f2e01e47e5061b80";
    const baseApiUrl = "https://api.painelcliente.com";

    // Pega a ação enviada no corpo da requisição
    const { action, clienteId, username, expDate, maxConnections, bouquet } = req.body;

    let apiUrl = "";
    let body = { secret: secretKey };

    try {
        switch (action) {
            case "listarClientes":
                apiUrl = `${baseApiUrl}/get_clients_all/PANELCLIENT_AD73H-4XRDW-5TW60-1D0ZG`;
                body.page = 1;
                body.limit = 400;
                break;

            case "obterBouquet":
                apiUrl = `${baseApiUrl}/get_client_bouquet/${clienteId}`;
                break;

            case "criarTeste":
                apiUrl = `${baseApiUrl}/create_test/PANELCLIENT_AD73H-4XRDW-5TW60-1D0ZG`;
                body.username = username;
                body.exp_date = expDate;
                body.max_connections = maxConnections;
                break;

            case "criarCliente":
                apiUrl = `${baseApiUrl}/create_client/PANELCLIENT_AD73H-4XRDW-5TW60-1D0ZG`;
                body.username = username;
                body.exp_date = expDate;
                body.max_connections = maxConnections;
                body.bouquet = bouquet;
                break;

            case "atualizarCliente":
                apiUrl = `${baseApiUrl}/update_client/${clienteId}`;
                if (username) body.username = username;
                if (expDate) body.exp_date = expDate;
                if (maxConnections) body.max_connections = maxConnections;
                if (bouquet) body.bouquet = bouquet;
                break;

            case "renovarCliente":
                apiUrl = `${baseApiUrl}/renew_client/${clienteId}`;
                body.exp_date = expDate; // Nova data de expiração
                break;

            default:
                return res.status(400).json({ error: "Ação inválida" });
        }

        // Faz a requisição para a API externa
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: "Erro na requisição", details: error.message });
    }
}