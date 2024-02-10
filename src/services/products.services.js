export class ProductsService {

    constructor(axios) {
      this.axios = axios;
    }
    async execute(query, pathParameter) {
    
      let searchTerm = query.q;
      let limit = query.limit ? query.limit : 10;
      let offset = query.offset ? query.offset : 0;
      let sort = query.sort ? query.sort : 'price_asc';
      let formatedResponse = {};
      const site_id = pathParameter;
      const searchParams = `&limit=${limit}&offset=${offset}&sort=${sort}`;
      const base_url = `https://api.mercadolibre.com/sites/${site_id}/search`;

      try {  
 
        const response = await this.axios.get(`${base_url}?q=${searchTerm}${searchParams}`);
        const data = response.data;
    
        const categories = this.#getCategories(data);
        const formattedItems = this.#itemsFormatter(data.results);
        formatedResponse = {
            paging: data.paging,
            categories: categories,
            items: formattedItems
        }
      } catch (error) {
       throw new Error(error.message);
      }
        return formatedResponse;
    }


    #getCategories(data) {

      const categories = []
    
      data.filters.forEach(filter => {
        if(filter.name === "Categorías") {
  
          filter.values.forEach(value => {
             value.path_from_root.forEach(category => {
              categories.push(category.name)
             })
          })
        }   
      });

      return categories;
    }
  
    #itemsFormatter(items) {
  
      const itemsWIthLessProps = items.map(item => ({
         id: item.id,
         title: item.title,
         price: {
          currency: item.currency_id,
          ammount: item.price,
          decimals: 2,
         },
         picture: item.thumbnail,
         condition: item.condition,
         free_shipping: item.shipping.free_shipping
      }));
  
      return itemsWIthLessProps;
    }
  }