import mysql from 'mysql';

export const dataBase = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pemograman_web'
})

dataBase.connect((err) => {
    if(err) {
        console.log(err)
    } else {
        console.log("connected")
    }
})

