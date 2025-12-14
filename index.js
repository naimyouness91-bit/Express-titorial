const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

const dataPath = path.join(__dirname, 'data', 'articles.json');
function readArticles() {
  const data = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(data);
}
function writeArticles(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}
app.get('/articles', (req, res) => {
  const articles = readArticles();
  res.json(articles);
});
app.get('/articles/:id', (req, res) => {
  const articles = readArticles();
  const id = parseInt(req.params.id);

  const article = articles.find(a => a.id === id);

  if (!article) {
    return res.status(404).json({ message: "Cet article n'existe pas" });
  }

  res.json(article);
});
app.post('/articles', (req, res) => {
  const articles = readArticles();
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title et content requis' });
  }

  const newId = articles.length ? Math.max(...articles.map(a => a.id)) + 1 : 1;

  const newArticle = {
    id: newId,
    title,
    content
  };

  articles.push(newArticle);
  writeArticles(articles);

  res.status(201).json(newArticle);
});
app.put('/articles/:id', (req, res) => {
  const articles = readArticles();
  const id = parseInt(req.params.id);

  const article = articles.find(a => a.id === id);

  if (!article) {
    return res.status(404).json({ message: "Cet article n'existe pas" });
  }

  article.title = req.body.title ?? article.title;
  article.content = req.body.content ?? article.content;

  writeArticles(articles);
  res.json(article);
});
app.delete('/articles/:id', (req, res) => {
  const articles = readArticles();
  const id = parseInt(req.params.id);

  const index = articles.findIndex(a => a.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Cet article n'existe pas" });
  }

  articles.splice(index, 1);
  writeArticles(articles);

  res.json({ message: "Article supprimé" });
});
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
