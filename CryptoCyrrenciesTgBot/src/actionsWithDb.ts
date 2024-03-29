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


    public async selectCurrencys(userId: number): Promise<any[]> {
        return await new Promise(async (resolve) => {

            const sql = `SELECT * FROM following WHERE UserId = '${userId}'`;

                this.connection.query(sql, function(err, result) {
                if(err) console.log(err);
                if (result instanceof Array) {
                    
                    resolve(result)
                } 
            });
        });
        }

    public async insertCurrency(userId: number, currency: string) {
        try {
            const someCoinData = [userId, currency];
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

    public async removeCurrency(userId: number, currency: string) {
        try {
            const someCoinData = [userId, currency];
            const sql = `DELETE FROM following WHERE UserId=${userId} AND Currency='${currency}'`;
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

