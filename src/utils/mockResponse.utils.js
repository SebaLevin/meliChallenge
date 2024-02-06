import { faker } from "@faker-js/faker"

export const mockResponse = {
    paging: {
        total: {
            total: faker.number.int(1000),
            primary_results: faker.number.int(100),
            offset: faker.number.int(10),
            limit: faker.number.int(20)
        }
    },
    categories: [
        faker.music.genre()
    ],
    items: [
        {
            id: faker.database.id,
            title: faker.lorem.lines(1),
            price: {
                currency: faker.commerce.price({max: 500}),
                ammount: faker.number.int(10),
                decimals: 2
            },
            picture: faker.image.url(),
            condition: 'new',
            free_shipping: faker.datatype.boolean()
        },
      
    ]
}