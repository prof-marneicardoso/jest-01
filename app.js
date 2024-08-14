
import createDatabase from './scripts/createDatabase.js';
import createTables from './scripts/createTables.js';
import insertData from './scripts/insertData.js';
import configDB from './config/db.js';
import server from './server.js';

async function main() {
    try {
        await createDatabase();
        await createTables();
        await insertData();

        // Inicia o servidor
        const port = configDB.config.port || 3000;
        server.listen(port, () => {
            console.log(`Servidor iniciado na porta ${port}.`);
        });

    } catch (error) {
        console.log('Erro na execução do processo.', error);
    }
}

main();
