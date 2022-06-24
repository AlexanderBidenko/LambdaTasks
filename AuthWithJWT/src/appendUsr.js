const { MongoClient } = require('mongodb');
var bcrypt = require('bcryptjs');

const uri = "mongodb+srv://admin:admin@cluster0.dvtl6uy.mongodb.net/";
const client = new MongoClient(uri, { useUnifiedTopology: true}, { useNewUrlParser: true }, { connectTimeoutMS: 30000 }, { keepAlive: 1});

const dbName = 'UsersDb';


async function appendUser(data) {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('Users');
    const hashPassword = bcrypt.hashSync(data.password, 5);
    const isNew = await collection.findOne({user: data.email});

    if (isNew === null) {
      let countUsers = await collection.countDocuments();
      await collection.insertOne({userId: countUsers, user: data.email, password: hashPassword});
      client.close();
      return 'Registration completed successfully'
    } else {
      client.close();
      return 'This user is already registered'
    }
  } catch(err) {
    client.close();
    return err;
  } 
}


module.exports = appendUser;