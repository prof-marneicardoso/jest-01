
import User from '../models/User.js';
import Product from '../models/Product.js';

async function insertData() {
    try {
        // INSERT INTO users ...
        const user = await User.create({
            username: 'Marnei',
            email: 'marneicardoso.prof@gmail.com',
        });
        console.log(`Novo usuário criado: ${user.toJSON()}`);

        // INSERT INTO products ...
        const product = await Product.create({
            name: 'Produto Exemplo',
            price: 29.99,
            description: 'Um excelente produto de exemplo.',
        });
        console.log(`Novo produto criado: ${product.toJSON()}`);

    } catch (error) {
        console.error('Erro ao inserir dados iniciais:', error);
    }
}

export default insertData;
