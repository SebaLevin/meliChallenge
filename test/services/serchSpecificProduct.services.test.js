
import { SpecificProductService } from '../../src/services/specificProduct.services.js';

describe('SpecificProduct', () => {
  it('should render the product details', async () => {
    const axios = {
      get: jest.fn().mockResolvedValue({
        data: {
          id: '1234',
          title: 'Product Title',
          price: 100,
          currency_id: 'USD',
          thumbnail: 'https://example.com/image.jpg',
          condition: 'new',
          shipping: {
            free_shipping: true,
          },
        },
      }),
    };

    const searchProductDescriptionService = {
      execute: jest.fn().mockResolvedValue('Product Description'),
    };

    const searchSpecificProduct = new SpecificProductService(axios, searchProductDescriptionService)

    const response = await searchSpecificProduct.execute('1234');

    expect(axios.get).toHaveBeenCalledWith('https://api.mercadolibre.com/items/1234');
    expect(searchProductDescriptionService.execute).toHaveBeenCalledWith('1234');
    expect(response).toHaveProperty('description');
    expect(response).toHaveProperty('author');
    expect(response).toHaveProperty('id');
    expect(response).toHaveProperty('title');
    expect(response).toHaveProperty('price');
    expect(response).toHaveProperty('picture');
    
  });

  it('should handle errors gracefully', async () => {
  
    const axios = {
      get: jest.fn().mockRejectedValue({ message: 'test error' }),
    };
    
    const errorMessage = 'test error';

     const searchProductDescriptionService = {
        execute: jest.fn().mockResolvedValue('Product Description'),
      };
  
      const searchSpecificProduct = new SpecificProductService(axios, searchProductDescriptionService);

    try {
        await searchSpecificProduct.execute('1234');
    } catch (error) {
      expect(error.message).toEqual(errorMessage);
    }
  });
});