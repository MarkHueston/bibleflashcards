const express = require("express");
const fs = require("fs");
const path = require("path");
const { parseStringPromise } = require("xml2js");

const app = express();
const port = 3000;

let bibleData;

// Load XML file and parse it on startup
fs.readFile(
  path.join(__dirname, "../public", "EnglishNLTBible.xml"),
  "utf-8",
  async (err, data) => {
    if (err) {
      console.error("Error reading XML file:", err);
      return;
    }
    bibleData = await parseStringPromise(data);
  }
);

app.use(express.json());

// Get testaments
app.get("/testaments", (req, res) => {
  if (!bibleData) return res.status(500).send("Bible data not loaded.");
  res.json(bibleData.bible.testament.map((t) => ({ name: t.$.name })));
});

// Get books by testament
app.get("/books/:testament", (req, res) => {
  const { testament } = req.params;
  const books =
    bibleData.bible.testament.find((t) => t.$.name === testament)?.book || [];
  res.json(books.map((b) => ({ number: b.$.number, name: b.$.name })));
});

// Get chapters by book
app.get("/chapters/:testament/:book", (req, res) => {
  const { testament, book } = req.params;
  const selectedBook = bibleData.bible.testament
    .find((t) => t.$.name === testament)
    ?.book.find((b) => b.$.number === book);
  res.json(selectedBook?.chapter.map((c) => ({ number: c.$.number })) || []);
});

// Get verses by chapter
app.get("/verses/:testament/:book/:chapter", (req, res) => {
  const { testament, book, chapter } = req.params;
  const selectedChapter = bibleData.bible.testament
    .find((t) => t.$.name === testament)
    ?.book.find((b) => b.$.number === book)
    ?.chapter.find((c) => c.$.number === chapter);
  res.json(selectedChapter?.verse.map((v) => ({ number: v.$.number })) || []);
});

// Get verse content
app.get("/verse/:testament/:book/:chapter/:verse", (req, res) => {
  const { testament, book, chapter, verse } = req.params;
  const selectedVerse = bibleData.bible.testament
    .find((t) => t.$.name === testament)
    ?.book.find((b) => b.$.number === book)
    ?.chapter.find((c) => c.$.number === chapter)
    ?.verse.find((v) => v.$.number === verse);
  res.json({ text: selectedVerse?._ });
});

app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
