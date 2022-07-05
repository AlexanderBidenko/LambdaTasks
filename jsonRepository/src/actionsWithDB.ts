import { MongoClient, MongoClientOptions } from 'mongodb';


export class actinsWithDB {
    routeToUsersData: string;
    userdData: string;

    uri : string= "mongodb+srv://admin:admin@cluster0.dvtl6uy.mongodb.net/";
    conf: MongoClientOptions = { connectTimeoutMS: 30000,  keepAlive: true}

    client = new MongoClient(this.uri, this.conf)

    dbName = 'JSONDb';


    public async appendDate(routeToUsersData : string, usersData : string) : Promise<object> {
        try {
          await this.client.connect();
          const db = this.client.db(this.dbName);
          const collection = db.collection('UsersDate');
      
          await collection.replaceOne({dataName: routeToUsersData}, {dataName: routeToUsersData, data: usersData}, {upsert: true});
          this.client.close();
          return (JSON.parse(usersData))
      
        } catch (error) {
          let message = 'Unknown Error'
          if (error instanceof Error) message = error.message
          return ({message})
        }      
      }
    

      public async findUsersDate(routeToUsersData : string) : Promise<object | string> {
        try {
          await this.client.connect();
          const db = this.client.db(this.dbName);
          const collection = db.collection('UsersDate');
          const usersData = await collection.findOne({dataName: routeToUsersData});
          this.client.close();      
          if (usersData === null) {
            return 'Not Found';
          } else {
            return usersData.data;
          }
        } catch (error) {
          let message = 'Unknown Error'
          if (error instanceof Error) message = error.message
          return ({message})
        }      
      }
}
