'use strict';

const MongoClient = require('mongodb').MongoClient;

module.exports.putData = async (event) => {
    try {
        const client = new MongoClient('mongodb://localhost:27017');
        await client.connect();

        const db = client.db('mydb');
        const collection = db.collection('mycollection');

        const data = JSON.parse(event.body);
        await collection.insertOne(data);


        await client.close();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: `Cadastro realizado com sucesso: ${event.body}` })
        };
    } catch (error) {
        console.error('Error inserting data:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal server error' })
        };
    }
};


module.exports.getData = async (event) => {
	try {
    const { MongoClient } = require('mongodb');
    const client = new MongoClient('mongodb://localhost:27017');

    await client.connect();

    const db = client.db('mydb');
    const collection = db.collection('mycollection');

    // Executar o select
    const result = await collection.find({}).toArray();

    await client.close();

    return {
        statusCode: 200,
        body: JSON.stringify(result)
    };
} catch (error) {
    console.error('Error querying data:', error);
    return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Internal server error' })
    };
}
		// return {
		// 		statusCode: 200,
		// 		body: JSON.stringify({ message: 'Olá Seja bem Vindo Seu Puto' })
		// 	};
};


module.exports.updateData = async (event) => {
	try {
		const client = new MongoClient('mongodb://localhost:27017');
		await client.connect();

		const db = client.db('mydb');
		const collection = db.collection('mycollection');

		const dataToUpdate = JSON.parse(event.body);

		// Supondo que o ID do documento a ser atualizado seja passado no corpo da requisição
		const { id } = dataToUpdate;

		// Construir o filtro para encontrar o documento a ser atualizado
		const filter = { _id: ObjectId(id) };

		// Remover o id dos dados a serem atualizados
		delete dataToUpdate.id;

		// Construir o objeto de atualização
		const updateData = { $set: dataToUpdate };

		// Executar a operação de atualização
		const result = await collection.updateOne(filter, updateData);

		await client.close();

		if (result.modifiedCount === 1) {
				return {
						statusCode: 200,
						body: JSON.stringify({ message: 'Documento atualizado com sucesso' })
				};
		} else {
				return {
						statusCode: 404,
						body: JSON.stringify({ message: 'Documento não encontrado' })
				};
		}
} catch (error) {
		console.error('Error updating data:', error);
		return {
				statusCode: 500,
				body: JSON.stringify({ message: 'Internal server error' })
		};
}
};

