import { faker } from '@faker-js/faker';

export class SpecificProductService {

    constructor(axios, searchProductDescriptionService) {
        this.axios = axios;
        this.searchProductDescriptionService = searchProductDescriptionService;
    }
    async execute(pathParameter) {
        const id = pathParameter;

        const base_url = `https://api.mercadolibre.com/items/${id}`;
    
        try {
    
            const response = await this.axios.get(`${base_url}`);
           
            const data = response.data;
    
            const description = await this.searchProductDescriptionService.execute(id);
    
            const formatedResponse = {
                author: {
                    name: faker.person.firstName(),
                    lastname: faker.person.lastName()
                },
                id: data.id,
                title: data.title,
                price: {
                    currency: data.currency_id,
                    ammount: data.price,
                    decimals: 2,
                },
                picture: data.thumbnail,
                condition: data.condition,
                free_shipping: data.shipping.free_shipping,
                sold_quantity: faker.number.int(100),
                description: description
            }
            return formatedResponse;
    
        } catch (error) {
           throw new Error(error.message);
        }
    }
}