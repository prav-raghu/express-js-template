export class Swagger {
    static options = {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "Express JS Template",
                version: "0.0.1",
                description: "Express JS Template",
                license: {
                    name: "MIT",
                    url: "https://spdx.org/licenses/MIT.html",
                },
                contact: {
                    name: "Prav",
                    url: "https://prav.com",
                    email: "pravir.raghu@gmail.com",
                },
            },
            servers: [
                {
                    url: "http://localhost:3000/books",
                },
            ],
        },
        apis: ["./routes/books.js"],
    };
}
