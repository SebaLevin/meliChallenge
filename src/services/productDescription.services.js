export class ProductDescriptionService {

    constructor(axios) {
        this.axios = axios;
    }

    async execute(itemId) {
        const id = itemId;

        let description = '';
    
        const base_url = `https://api.mercadolibre.com/items/${id}/description`;
    
        try {
            const response = await this.axios.get(`${base_url}`);
        
            description = response.data.plain_text;
        } catch (error) {
            throw new Error(error.message);
        }
        return description;
    }
}