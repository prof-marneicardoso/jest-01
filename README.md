# Testes Unitários em JavaScript com Jest

Jest é um framework de testes unitários desenvolvido pelo Facebook, focado principalmente em aplicações JavaScript. Ele é usado para testar unidades menores de código, como funções, módulos, ou componentes isolados, garantindo que partes individuais do código funcionem como esperado.

 - **Testes unitários**: Testar funções e componentes React de forma isolada.

 - **Testes de integração**: Verificar se diferentes partes do código (como componentes React e chamadas para a API) funcionam bem juntas.

 - **Testes de API**: Combinado com bibliotecas como Supertest, é usado para testar endpoints da API RESTful do Node.js.


### Configurando Jest no Backend Node.js

O 'package.json' já tem o registro das dependências básicas para este projeto:

```json
"dependencies": {
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "mysql2": "^3.11.0",
    "sequelize": "^6.37.3"
}
```


### #1. Para rodar o projeto, é preciso apenas baixar e instalar as dependências:

```
npm i
```
e as dependências dev:
```
npm i --save-dev jest supertest
```


```json
"devDependencies": {
    "jest": "^29.7.0",
    "supertest": "^7.0.0"
}
```

 - **Jest**: Para executar os testes.

 - **Supertest**: Para facilitar a simulação de requisições HTTP nos testes da API.


### #2. Crie o arquivo 'jest.config.js' na raiz do projeto.

![001.png](https://i.postimg.cc/26jBcr7n/001.png)

Adicione o código:

```js
export default {
    testEnvironment: 'node',
    testMatch: ['**/__tests__/**/*.test.js'],
    setupFilesAfterEnv: ['dotenv/config'],
    transform: {},
};
```

Isso configura o Jest para rodar em um ambiente Node.js e procurar por arquivos de teste com a extensão **.test.js** na pasta **\_\_tests\_\_**


### #3. Crie a pasta '\_\_tests\_\_' na raiz do projeto.

Dentro, crie o arquivo '**userRoutes.test.js**' e adicione o código:

```js
import request from 'supertest';
import server from '../server.js';

describe('GET /users', () => {
    it('Deve retornar uma lista de usuários', async () => {
        const response = await request(server).get('/users');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });
});

console.log('\n__tests__/userRoutes.test.js\n');
```


### #4. Ainda dentro da pasta '\_\_tests\_\_', crie a pasta 'integration'.

Dentro, crie o arquivo '**insertData.test.js**' e adicione o código:

```js
import configDB from "../../config/db.js";
import createDatabse from "../../scripts/createDatabase.js";
import createTables from "../../scripts/createTables.js";
import insertData from "../../scripts/insertData.js";
import User from "../../models/User.js";
import Product from "../../models/Product.js";

describe('Integração de DB', () => {
    beforeAll(async () => {
        await createDatabse();
        await createTables();
    });

    afterAll(async () => {
        await configDB.close();
    });

    it('Deve inserir dados iniciais no banco de dados', async () => {
        await insertData();

        const users = await User.findAll();
        const products = await Product.findAll();

        expect(users.length).toBe(1);
        expect(products.length).toBe(1);

        expect(users[0].username).toBe('Marnei');
        expect(products[0].name).toBe('Produto Exemplo');
    });
});
```


### #5. Ainda dentro da pasta '\_\_tests\_\_', crie a pasta 'models'.

Dentro da pasta '**models**', crie dois arquivos:
 - '**User.test.js**' e adicione o código:

```js
import User from '../../models/User.js';

describe('User Model', () => {
    it('Deve criar uma instância de usuário com atributos válidos', async () => {
        const user = User.build(
            {
                username: 'Marnei',
                email: 'marneicardoso.prof@gmail.com',
            },
        );

        expect(user.username).toBe('Marnei');
        expect(user.email).toBe('marneicardoso.prof@gmail.com');
    });

    it('Deve falhar se os campos obrigatórios estiverem faltando', async () => {
        try {
            await User.build({}).validate();

        } catch (error) {
            expect(error.name).toBe('SequelizeValidationError');
        }
    });
});
```

 - '**Product.test.js**' e adicione o código:

 ```js
import Product from '../../models/Product.js';

describe('Product Model', () => {
    it('Deve criar uma instância de produto com atributos válidos', async () => {
        // const product = await Product.build(
        const product = Product.build(
            {
                name: 'Produto Exemplo',
                price: 29.99,
                description: 'Um excelente produto de exemplo',
            }
        );

        expect(product.name).toBe('Produto Exemplo');
        expect(product.price).toBe(29.99);
        expect(product.description).toBe('Um excelente produto de exemplo');
    });

    it('Deve falhar se os campos obrigatórios estiverem faltando', async () => {
        try {
            await Product.build({}).validate();

        } catch (error) {
            expect(error.name).toBe('SequelizeValidationError');
        }
    });
});
 ```


### #6. Abra o 'package.json' e adicione em 'scripts', a linha:

```json
"test": "node --experimental-vm-modules node_modules/jest/bin/jest.js"
```

![002.png](https://i.postimg.cc/7h8nZfv0/002.png)


### #7. Abra o Terminal e rode o projeto no modo teste:

```
npm test
```

Veja os resultados no console.


## Objetivo com Jest

 - **Testes Unitários**: Verificar a lógica dos modelos (***User***, ***Product***, etc).

 - **Testes de Integração**: Verificar se as operações de banco de dados, como criação de usuários e produtos, estão funcionando corretamente.

 - **Mocking**: Evitar interações reais com o banco de dados durante os testes unitários.


### Segurança das informações

Lembre-se que as configurações do arquivo .env são dados sensíveis e devem ser alterados conforme as necessidades de cada projeto. Os dados deste projeto são genéricos, usados de forma didática como exemplo. Os dados finais do .env não devem ser enviados para o repositório, para que não fiquem expostos e qualquer pessoa que acessar o repositório possa acessar a base de dados.
 