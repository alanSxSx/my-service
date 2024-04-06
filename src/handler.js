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
    const { MongoClient, ObjectId } = require('mongodb');
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
		const { MongoClient, ObjectId } = require('mongodb');
			const client = new MongoClient('mongodb://localhost:27017');
			await client.connect();

			const db = client.db('mydb');
			const collection = db.collection('mycollection');

			// Extrair o ID do registro a ser atualizado dos parâmetros da URL
			const { id } = event.pathParameters;

			// Extrair os dados do corpo da solicitação PATCH
			const newData = JSON.parse(event.body);

			// Realizar a atualização no banco de dados
			const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: newData });

			await client.close();

			if (result.modifiedCount === 1) {
					return {
							statusCode: 200,
							body: JSON.stringify({ message: 'Registro atualizado com sucesso' })
					};
			} else {
					return {
							statusCode: 404,
							body: JSON.stringify({ message: 'Registro não encontrado' })
					};
			}
	} catch (error) {
			console.error('Erro ao atualizar o registro:', error);
			return {
					statusCode: 500,
					body: JSON.stringify({ message: 'Erro interno do servidor' })
			};
	}
};

