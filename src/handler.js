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
			return {
					statusCode: 200,
					body: JSON.stringify({ message: 'VEIO AQQUIIIIIII' })
			};
};
