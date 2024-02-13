
export class SpecificProductController {

  constructor(specificProductService) {
    this.specificProductService = specificProductService
  }
  getProduct() {
    return async (req, res) => {
      const { id } = req.params;

      try {
        const data = await this.specificProductService.execute(id);
      
        res.json(data);

      } catch (error) {
        console.error('Error fetching data:', error);

        if (error.message.includes("404")) {
         return  res.status(404).json({ message: 'Product not found' });
        }
         return res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  }

}