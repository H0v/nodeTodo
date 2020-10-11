const { Router } = require("express");
const path = require("path");
const router = Router();
let todos = require("../todos");

const { v4: uuidv4 } = require("uuid");
router.get("/", (req, res) => {
  res.render(path.join(__dirname, "..", "index.hbs"), { todos });
});

router.post("/api/add", (req, res) => {
  todos = [
    ...todos,
    { id: uuidv4(), value: req.body.todo, done: false, isEditing: false },
  ];
  res.redirect("/");
  res.end();
});
router.post("/api/edit", (req, res) => {
  const todo = todos.find((el) => el.id === req.body.id);
  todo.isEditing = true;
  todos
    .filter((el) => el.id !== req.body.id)
    .forEach((el) => (el.isEditing = false));
  res.end();
});

router.post("/api/change", (req, res) => {
  const todo = todos.find((el) => el.id === req.body.id);
  if (req.body.todo.trim() !== "") {
    todo.value = req.body.todo;
    todo.isEditing = false;
    res.redirect("/");
    res.end();
  } else {
    todos = todos.filter((el) => el.id !== req.body.id);
    res.redirect("/");
  }
});

router.post("/api/delete", (req, res) => {
  todos = todos.filter((el) => el.id !== req.body.id);
  res.redirect("/");
  res.end();
});

router.post("/api/check", (req, res) => {
  todo = todos.find((el) => el.id === req.body.id);
  if (todo.done) {
    todo.done = false;
  } else {
    todo.done = true;
  }
  res.redirect("/");
  res.end();
});
module.exports = router;
