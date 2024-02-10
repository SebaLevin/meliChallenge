export class ProductsController {

  constructor(productsService) {
    this.productsService = productsService;
  }
  getProducts() {
    return async (req, res) => {
      const { siteId } = req.params;
      const {...query } = req.query;

      try {

        const data = await this.productsService.execute(query, siteId);

        res.status(200).send(data);
      } catch (error) {
        console.error('Error fetching data:', error);

        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  }
}