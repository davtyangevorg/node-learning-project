const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

const users = [
  { name: "Alice", id: 1 },
  { name: "Bob", id: 2 },
  { name: "Charlie", id: 3 },
];

app.get("/", (req: any, res: any) => {
  res.json("Hello  asdf sadf asdf asdfsadWorld! as asdf asdff asd");
});

app.get("/users", (req: any, res: any) => {
  res.json(users);
});

app.get("/users/:id", (req: any, res: any) => {
  const id = req.params.id;
  const user = users.find((user: any) => user.id === Number(id));
  res.json(user);
});

app.post("/users", (req: any, res: any) => {
  console.log("req.body", req);
  const userName = req.body.name;

  if (!userName) {
    res.status(400).json("Name is required");
  }

  const newUser = {
    name: userName,
    id: users.length + 1,
  };

  users.push(newUser);
  res.json(newUser);
});

app.put("/users/:id", (req: any, res: any) => {
  const id = req.params.id;
  const userName = req.body.name;

  const user = users.find((user: any) => user.id === Number(id));

  if (!user) {
    res.status(404).json("User not found");
  }

  if (user) {
    user.name = userName;
  }
  res.json(user);
});

app.delete("/users/:id", (req: any, res: any) => {
  const id = req.params.id;
  const userIndex = users.findIndex((user: any) => user.id === Number(id));

  if (userIndex === -1) {
    res.status(404).json("User not found");
  }

  users.splice(userIndex, 1);
  res.json("User deleted");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
