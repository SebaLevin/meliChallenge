import { ProductDescriptionService } from '../../src/services/productDescription.services.js';

describe('ProductDescriptionService', () => {
    
      it('should return the description of the item', async () => {
        const id = 'test-item-id';
        const descriptionText = 'This is a test description';
  
        const axios = { get: jest.fn().mockResolvedValue({ data:{ plain_text: descriptionText }}) };
        
        let descriptionService = new ProductDescriptionService(axios);
  
        let description = await descriptionService.execute(id);
        
        expect(description).toEqual(descriptionText);
      });
  
      it('should return an error message if there is an error', async () => {
        const id = 'test-item-id';
        const errorMessage = 'There was an error retrieving the description';
          
        const axios = { get: jest.fn().mockRejectedValue({ message: errorMessage }) };
        
        let descriptionService = new ProductDescriptionService(axios);
  
        try {
          await descriptionService.execute(id);
        } catch (error) {
          expect(error.message).toBe(errorMessage);
        }
      });
    });
