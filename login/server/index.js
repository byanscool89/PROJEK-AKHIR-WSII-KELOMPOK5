import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { dataBase } from "./dataBase.js";
const app = express();

const PORT = 8080;

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello from Express")
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

// *Register
app.post("/api/register", (req, res) => {
    const {username, email, tanggal_lahir, password} = req.body;
    const sqlInsert = 
    "INSERT INTO users (username, email, tanggal_lahir, password) VALUES (?,?,?,?)";
    const values = [username, email, tanggal_lahir, password];
    dataBase.query(sqlInsert, values, (err, result) => {
        if(err) {
            console.log(err);
        }
    });
});

// *LOGIN FEATURE
app.post("/api/login", (req, res) => {
    const {username, password} = req.body;
    const values = [username, password];
    const sqlLogin = "SELECT * from users WHERE username = ? AND password = ?"

    dataBase.query(sqlLogin, values, (err, result) => {
        if (err) {
            res.status(500).send(err);
          } else {
            if (result.length > 0) {
              res.status(200).send(result[0]);
            } else {
              res.status(400).send("Username atau password salah");
            }
        }
    });
});

// * MENAMPILKAN DATA USERS
app.get("/api/user", (req, res) => {
    const sqlGet = "SELECT * FROM users";
    dataBase.query(sqlGet, (error, result) => {
      res.send(result);
    });
  });

// GET ALL USERS(mENAMPILKAN SEMUA USER)
app.get("/api/users", (req, res) => {
  const sqlGet = "SELECT * FROM users";
  dataBase.query(sqlGet, (err, result) => {
  if(err) {
    console.log(err)
  } else {
    res.send(result)
  }
 })
})

// DELETE DATA
app.delete("/api/delete/:id", (req, res) => {
  const { id } = req.params;
  const sqlDelete = "DELETE FROM users WHERE id = ?"
  dataBase.query(sqlDelete, id, (err, result) => {
    if(err) {
      console.log(err)
    }
  })
})

// UPDATE DATA
app.get("/api/get/:id", (req, res) => {
  const {id} = req.params;
  const sqlGet = "SELECT * FROM users WHERE id = ?";
  dataBase.query(sqlGet, id, (err, result) => {
    if(err){
      console.log(err);
    }
    res.send(result)
  });
});

app.put("/api/update/:id", (req, res) => {
  const {id} = req.params;
  const {username, email, tanggal_lahir, password} = req.body;
  const sqlUpdate = "UPDATE users SET username = ?, email = ?, tanggal_lahir = ?, password = ? WHERE id = ?";
  const values = [username, email, tanggal_lahir, password, id];
  dataBase.query(sqlUpdate, values, (err, result) => {
      if(err) {
          console.log(err);
      }
      res.send(result)
  });
});

// // INPUT BARANG
// app.post("/api/barang", (req, res) => {
//   const {kode_barang, merk, ukuran, harga} = req.body;
//   const sqlInsert = 
//   "INSERT INTO data_barang (kode_barang, merk, ukuran, harga) VALUES (?,?,?,?)";
//   const values = [kode_barang, merk, ukuran, harga];
//   dataBase.query(sqlInsert, values, (err, result) => {
//       if(err) {
//           console.log(err);
//       }
//   });
// });

// // * MENAMPILKAN DATA BARANG
// app.get("/api/sale", (req, res) => {
//   const sqlGet = "SELECT * FROM data_barang";
//   dataBase.query(sqlGet, (error, result) => {
//     res.send(result);
//   });
// });

// // GET ALL USERS(MENAMPILKAN SEMUA BARANG)
// app.get("/api/data_barang", (req, res) => {
// const sqlGet = "SELECT * FROM data_barang";
// dataBase.query(sqlGet, (err, result) => {
// if(err) {
//   console.log(err)
// } else {
//   res.send(result)
// }
// })
// })

// // DELETE barang
// app.delete("/api/delete/:id", (req, res) => {
// const { id } = req.params;
// const sqlDelete = "DELETE FROM data_barang WHERE id = ?"
// dataBase.query(sqlDelete, id, (err, result) => {
//   if(err) {
//     console.log(err)
//   }
// })
// })

// // UPDATE DATA
// app.get("/api/get/:id", (req, res) => {
// const {id} = req.params;
// const sqlGet = "SELECT * FROM data_barang WHERE id = ?";
// dataBase.query(sqlGet, id, (err, result) => {
//   if(err){
//     console.log(err);
//   }
//   res.send(result)
// });
// });

// app.put("/api/updatebrg/:id", (req, res) => {
// const {id} = req.params;
// const {kode_barang, merk, ukuran, harga} = req.body;
// const sqlUpdate = "UPDATE data_barang SET kode_barang = ?, merk = ?, ukuran = ?, harga = ? WHERE id = ?";
// const values = [kode_barang, merk, ukuran, harga, id];
// dataBase.query(sqlUpdate, values, (err, result) => {
//     if(err) {
//         console.log(err);
//     }
//     res.send(result)
// });
// });
