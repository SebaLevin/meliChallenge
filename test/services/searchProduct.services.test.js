import { ProductsService } from "../../src/services/products.services.js";
import { mockResponseServiceTests, mockResponseTests } from "../mocks/mockResponse.mocks";

const axios = { get: jest.fn()}


describe('FetchProduct', () => {
    let fetchProduct;
  
    beforeEach(() => {
      fetchProduct = new ProductsService(axios);
    });
  
      it('should make a GET request to the correct URL with the correct parameters', async () => {
        const query = { q: 'test', limit: 10, offset: 110, sort: 'price_asc' };
        const pathParameter = 'test-site-id';
        const expectedUrl = `https://api.mercadolibre.com/sites/${pathParameter}/search?q=test&limit=10&offset=110&sort=price_asc`;
  
        axios.get.mockReturnValue({data: mockResponseTests});
  
        const response = await fetchProduct.execute(query, pathParameter);
  
        expect(axios.get).toHaveBeenCalledWith(expectedUrl);
        expect(response).toEqual(mockResponseServiceTests);
      });

      it('should make a GET request to the correct URL with the defautl parameters', async () => {
        const query = { q: 'test' };
        const pathParameter = 'test-site-id';
        const expectedUrl = `https://api.mercadolibre.com/sites/${pathParameter}/search?q=test&limit=10&offset=0&sort=price_asc`;
  
        axios.get.mockReturnValue({data: mockResponseTests});
  
        const response = await fetchProduct.execute(query, pathParameter);
  
        expect(axios.get).toHaveBeenCalledWith(expectedUrl);
        expect(response).toEqual(mockResponseServiceTests);
      });
  
      it('should handle errors gracefully', async () => {
        const query = { q: 'test', limit: 10, offset: 0, sort: 'price_asc' };
        const pathParameter = 'test-site-id';
        const expectedUrl = `https://api.mercadolibre.com/sites/${pathParameter}/search?q=test&limit=10&offset=0&sort=price_asc`;
        const errorMessage = 'test error';
  
        axios.get.mockRejectedValue({ message: errorMessage });
  
        try {
          await fetchProduct.execute(query, pathParameter);
        } catch (error) {
          expect(error.message).toEqual(errorMessage);
        }
      });
    });