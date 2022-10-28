import express from 'express'
import { AppDataSource } from './data-source'
console.log('olá');

AppDataSource.initialize().then(() => {
    console.log("conectou!");
    
    const app = express()

    app.use(express.json()) // Informa que o express vai trabalhar com JSON

    app.get('/', (req, res) => {
        return res.json('Tudo ok!')
    })

    return app.listen(process.env.PORT)
}).catch((error) => {
    console.log('erro ao conectar!');
    console.log(error);
}) 