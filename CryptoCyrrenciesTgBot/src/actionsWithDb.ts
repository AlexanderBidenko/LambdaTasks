import mysql = require("mysql2");
import dotenv = require("dotenv");
import "dotenv/config";
import { triggerAsyncId } from "node:async_hooks";



export class actionsWithDb {
    connection = mysql.createConnection({
        uri: process.env.connectionURI,
        user: process.env.connectionUser,
        database: process.env.connectionDB,
        password: process.env.connectionPassword,
        connectTimeout: 100000000
    });


    public async selectCurrencys(UserId: number): Promise<any[]> {
        return await new Promise(async (resolve) => {

            const sql = `SELECT * FROM following WHERE UserId = '${UserId}'`;

                this.connection.query(sql, function(err, result) {
                if(err) console.log(err);
                if (result instanceof Array) {
                    
                    resolve(result)
                } 
            }) 
        })
        }

    public async  insertCurrency(UserId: number, Currency: string) {
        try {
            const someCoinData = [UserId, Currency];
            const sql = "INSERT INTO following(UserId, Currency) VALUES(?, ?)";
            const tryInsert = await new Promise((resolve) => {
                this.connection.query(sql, someCoinData, function(err, res) {
                    if(err) resolve(undefined);
                    if(res) resolve(res);
                }
                )
            });
            if (tryInsert) {
                return "Криптовалюта добавленна в избранное";
            } else {
                return undefined;
            }

        } catch (e) {
            console.log(e)
        }
        this.connection.end();


    }

    public async removeCurrency(UserId: number, Currency: string) {
        try {
            const someCoinData = [UserId, Currency];
            const sql = `DELETE FROM following WHERE UserId=${UserId} AND Currency='${Currency}'`;
            await new Promise((resolve) => {
                this.connection.query(sql, someCoinData, function(res, err) {
                    // if(err) console.log(err);
                    resolve(res)
                }
                )
            });    
        } catch (e) {
            console.log(e)
        }
        this.connection.end();
        return "Криптовалюта удаленна из избранного";
    }

}










