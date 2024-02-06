
export class SpecificProductController {

  constructor(specificProductService) {
    this.specificProductService = specificProductService
  }
  getProduct() {
    return async (req, res) => {
      const { id } = req.params;

      try {
        const data = await this.specificProductService.execute(id);

        if (!data) {
          return res.status(404).json({ message: 'Product not found' });
        }
        res.json(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  }

}