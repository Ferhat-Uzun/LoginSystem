const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

//app accept json
app.use(express.json());

//user list
const users = [];

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { name: req.body.name, password: hashedPassword };
    users.push(user);
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send();
  }
});

app.post("/users/login", async (req, res) => {
  const user = users.find((user) => (user.name = req.body.name));
  if (user == null) return res.status(400).send("User cannot find");

  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send("login succest");
    } else {
      res.send("password is incorrect");
    }
  } catch (error) {
    res.status(500).send();
  }
});

app.listen(3000);
