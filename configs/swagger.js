import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options ={
    swaggerDefinition:{
        openapi:"3.0.0",
        info:{
            title: "Almacenadora API",
            version: "1.0.0",
            description: "API para gestion de una almacenadora",
            contact:{
                name: "Developers",
                email: "developersalm@gmail.com"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3001/Almacenadora/v1"
            }
        ]
    },
    apis:[
        './src/user/user.routes.js',
        './src/product/product.routes.js',
        './src/movements/movements.routes.js',
    ]
}

const swaggerDocs = swaggerJSDoc(options)

export { swaggerDocs, swaggerUi}