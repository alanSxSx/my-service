'use strict';

const MongoClient = require('mongodb').MongoClient;

module.exports.putData = async (event) => {
    try {
        const client = new MongoClient('mongodb://my-service-mongodb-1:27017');
        await client.connect();

        const db = client.db('mydb');
        const collection = db.collection('mycollection');

        const data = JSON.parse(event.body);
        await collection.insertOne(data);

        await client.close();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'VEIO AQQUIIIIIII' })
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
    const client = new MongoClient('mongodb://my-service-mongodb-1:27017');

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
	return {
			statusCode: 200,
			body: JSON.stringify({ message: 'Alteração feita com Sucesso' })
	};
};

