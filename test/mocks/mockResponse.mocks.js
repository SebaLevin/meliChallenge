export const mockResponseTests = {
    paging: {
        total: 1000,
        primary_results: 100,
        offset: 10,
        limit: 20
    },
    filters: [
        {
            name: "Categorías",
            values: [
                {
                    path_from_root: [
                        {
                            name: "testCategory1",
                        },
                        {
                            name: "testCategory2",
                        },
                        {
                            name: "testCategory3",
                        }
                    ]
                }
            ]
        }

    ],
    results: [
        {
            id: "testId",
            title: "testTitle",
            currency_id: 'ARS',
            price: 10,
            decimals: 2,
            thumbnail: "testPictureURL",
            condition: 'new',
            shipping: {
                free_shipping: true
            }

        },

    ]
}

export const mockResponseServiceTests = {
    paging: {

        total: 1000,
        primary_results: 100,
        offset: 10,
        limit: 20
    },
    categories: [

        "testCategory1",
        "testCategory2",
        "testCategory3"
    ],

    items: [
        {
            id: "testId",
            title: "testTitle",
            price: {
                currency: "ARS",
                ammount: 10,
                decimals: 2
            },
            picture: "testPictureURL",
            condition: 'new',
            free_shipping: true
        },

    ]
}