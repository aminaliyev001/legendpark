const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const port = process.env.PORT || 5000; //Line 3

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "legendpark",
});


app.put("/updatetodo", (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const point1 = req.body.point1;
  const point2 = req.body.point2;
  const point3 = req.body.point3;
  const date = req.body.date;
  db.query(
    "UPDATE todo SET title = ?, date=?,point1=?,point2=?,point3=? WHERE pin = ?",
    [title,date,point1,point2,point3,id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/updateworker", (req, res) => {
  const id = req.body.pin;
  const name = req.body.name;
  const surname = req.body.surname;
  const startdate = req.body.startdate;
  const birthdate = req.body.birthdate;
  const role = req.body.role;
  const status = req.body.status;
  db.query(
    "UPDATE workers SET name = ?, surname=?,birthdate=?,startdate=?,role=? ,status=? WHERE pin = ?",
    [name,surname,birthdate,startdate,role,status,id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/updatetaxlist", (req, res) => {
  const id = req.body.pin;
  const name = req.body.name;
  db.query(
    "UPDATE verg_list SET name = ? WHERE pin = ?",
    [name,id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/updatetaxop", (req, res) => {
  const belongto = req.body.belongto;
  const price = req.body.price;
  const date = req.body.date;
  const pin = req.body.pin;

  db.query(
    "UPDATE vergi SET price = ?,date=?,belongto=? WHERE pin = ?",
    [price,date,belongto,pin],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/updatenoti", (req, res) => {
  const pin = req.body.pin;
  const onof = req.body.onof;
  db.query(
    "UPDATE noti SET onof = ? WHERE pin = ?",
    [onof,pin],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/newworker", (req, res) => {
  const id = req.body.pin;
  const name = req.body.name;
  const surname = req.body.surname;
  const startdate = req.body.startdate;
  const birthdate = req.body.birthdate;
  const role = req.body.role;
  const status = req.body.status;

  db.query(
    "INSERT INTO workers (name, surname, startdate, birthdate, role,status,pin) VALUES (?,?,?,?,?,?,?)",
    [name, surname, startdate, birthdate, role,status,id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.post("/newtaxlist", (req, res) => {
  const id = req.body.pin;
  const name = req.body.name;

  db.query(
    "INSERT INTO verg_list (name, pin) VALUES (?,?)",
    [name, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});
app.post("/addtaxop", (req, res) => {
  const belongto = req.body.belongto;
  const price = req.body.price;
  const date = req.body.date;
  const pin = req.body.pin;

  db.query(
    "INSERT INTO vergi (price,date,belongto,pin) VALUES (?,?,?,?)",
    [price,date,belongto,pin],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.post("/newtodo", (req, res) => {
  const title_new = req.body.title;
  const date_new = req.body.date;
  const point1_new = req.body.point1;
  const point2_new = req.body.point2;
  const point3_new = req.body.point3;
  const pin = req.body.pin;

  db.query(
    "INSERT INTO todo (title, date, point1, point2, point3,pin) VALUES (?,?,?,?,?,?)",
    [title_new, date_new, point1_new, point2_new, point3_new,pin],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.post("/newnoti", (req, res) => {
  const detail = req.body.detail;
  const type = req.body.type;
  const name = req.body.name;
  const date = req.body.date;
  const pin = req.body.pin;
  const onof = req.body.onof;

  db.query(
    "INSERT INTO noti (name,detail,date,type,pin,onof) VALUES (?,?,?,?,?,?)",
    [name,detail,date,type,pin,onof],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});


app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM todo WHERE pin = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });
 
  app.delete("/deletetax/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM vergi WHERE pin = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });
  
app.delete("/deletetaxlist/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM verg_list WHERE pin = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.get("/todo", (req, res) => {
    db.query("SELECT * FROM todo", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });
  app.get("/xerc", (req, res) => {
    db.query("SELECT * FROM xerc", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });
 
 
  app.get("/kapital", (req, res) => {
    db.query("SELECT * FROM kapital", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });
  app.get("/kapitalist", (req, res) => {
    db.query("SELECT * FROM kapital_list", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

  
  app.get("/xerclist", (req, res) => {
    db.query("SELECT * FROM xerc_list", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });
  app.get("/checkbirthdate", (req, res) => {
    
    db.query("SELECT * FROM noti", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });
  app.get("/taxlist", (req, res) => {
    db.query("SELECT * FROM verg_list", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });
  app.get("/tax", (req, res) => {
    db.query("SELECT * FROM vergi", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });
app.get("/expense", (req, res) => {
    db.query("SELECT * FROM xerc", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });
  app.get("/depozit", (req, res) => {
    db.query("SELECT * FROM depozit", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });
  app.get("/gelir", (req, res) => {
    db.query("SELECT * FROM gelir", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });
  app.get("/netgelir", (req, res) => {
    db.query("SELECT * FROM netgelir", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });
 
  app.get("/workers", (req, res) => {
    db.query("SELECT * FROM workers", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });
  app.get("/medaxil", (req, res) => {
    db.query("SELECT * FROM medaxil", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });
  app.get("/ownerdraw", (req, res) => {
    db.query("SELECT * FROM ownerdraw", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });