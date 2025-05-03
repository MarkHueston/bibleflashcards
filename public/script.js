const btnToggle = document.getElementById("btnToggle");
const divVerseText = document.getElementById("divVerseText");
const verseText = document.getElementById("verseText");
const getTestament = document.getElementById("testament");
const getBook = document.getElementById("book");
const getChapter = document.getElementById("chapter");
const getVerse = document.getElementById("verse");

window.onload = fetchTestaments;
divVerseText.style.display = "none";
btnToggle.addEventListener("click", () => {
  divVerseText.style.display =
    divVerseText.style.display === "none" ? "block" : "none";
});

verse.addEventListener("change", () => {
  btnToggle.style.display = "block";
  lblVerseText.style.display = "block";
});

// Fetch testaments
function fetchTestaments() {
  fetch("http://localhost:3000/testaments")
    .then((res) => res.json())
    .then((testaments) => {
      testaments.forEach((testament) => {
        const option = document.createElement("option");
        option.value = testament.name;
        option.textContent = testament.name;
        getTestament.appendChild(option);
      });
    });
}

getTestament.addEventListener("change", () => {
  fetchBooks(getTestament.value);
});

getBook.addEventListener("change", () => {
  fetchChapters(getTestament.value, getBook.value);
});

getChapter.addEventListener("change", () => {
  fetchVerses(getTestament.value, getBook.value, getChapter.value);
});

getVerse.addEventListener("change", () => {
  fetchVerseContent(
    getTestament.value,
    getBook.value,
    getChapter.value,
    getVerse.value
  );
});

// Fetch books
function fetchBooks(testament) {
  fetch(`http://localhost:3000/books/${testament}`)
    .then((res) => res.json())
    .then((books) => {
      getBook.innerHTML = "<option value='Select'>Select</option>";
      books.forEach((book) => {
        const option = document.createElement("option");
        option.value = book.number;
        option.textContent =
          testament === "Old"
            ? getOldTestamentName(book.number)
            : getNewTestamentName(book.number);
        getBook.appendChild(option);
      });
    });
}

// Fetch chapters
function fetchChapters(testament, book) {
  fetch(`http://localhost:3000/chapters/${testament}/${book}`)
    .then((res) => res.json())
    .then((chapters) => {
      getChapter.innerHTML = "<option value='Select'>Select</option>";
      chapters.forEach((chapter) => {
        const option = document.createElement("option");
        option.value = chapter.number;
        option.textContent = chapter.number;
        getChapter.appendChild(option);
      });
    });
}

// Fetch verses
function fetchVerses(testament, book, chapter) {
  fetch(`http://localhost:3000/verses/${testament}/${book}/${chapter}`)
    .then((res) => res.json())
    .then((verses) => {
      getVerse.innerHTML = "<option value='Select'>Select</option>";
      verses.forEach((verse) => {
        const option = document.createElement("option");
        option.value = verse.number;
        option.textContent = verse.number;
        getVerse.appendChild(option);
      });
    });
}

// Fetch verse content
function fetchVerseContent(testament, book, chapter, verse) {
  fetch(`http://localhost:3000/verse/${testament}/${book}/${chapter}/${verse}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.text) {
        const bookName =
          testament === "Old"
            ? getOldTestamentName(book)
            : getNewTestamentName(book);
        document.getElementById(
          "lblVerseText"
        ).innerHTML = `${bookName}; Chapter: ${chapter}, Verse ${verse}`;
        verseText.value = data.text;
      }
    });
}

function getOldTestamentName(bookIndex) {
  //let bookNumber = Number(bookIndex);
  switch (bookIndex) {
    case "1":
      return "Genesis";
    case "2":
      return "Exodus";
    case "3":
      return "Leviticus";
    case "4":
      return "Numbers";
    case "5":
      return "Deuteronomy";
    case "6":
      return "Joshua";
    case "7":
      return "Judges";
    case "8":
      return "Ruth";
    case "9":
      return "1 Samuel";
    case "10":
      return "2 Samuel";
    case "11":
      return "1 Kings";
    case "12":
      return "2 Kings";
    case "13":
      return "1 Chronicles";
    case "14":
      return "2 Chronicles";
    case "15":
      return "Ezra";
    case "16":
      return "Nehemiah";
    case "17":
      return "Esther";
    case "18":
      return "Job";
    case "19":
      return "Psalms";
    case "20":
      return "Proverbs";
    case "21":
      return "Ecclesiastes";
    case "22":
      return "Song of Solomon";
    case "23":
      return "Isaiah";
    case "24":
      return "Jeremiah";
    case "25":
      return "Lamentations";
    case "26":
      return "Ezekiel";
    case "27":
      return "Daniel";
    case "28":
      return "Hosea";
    case "29":
      return "Joel";
    case "30":
      return "Amos";
    case "31":
      return "Obadiah";
    case "32":
      return "Jonah";
    case "33":
      return "Micah";
    case "34":
      return "Nahum";
    case "35":
      return "Habakkuk";
    case "36":
      return "Zephaniah";
    case "37":
      return "Haggai";
    case "38":
      return "Zechariah";
    case "39":
      return "Malachi";
    default:
      return "Invalid Book";
  }
}
function getNewTestamentName(bookIndex) {
  switch (bookIndex) {
    case "40":
      return "Matthew";
    case "41":
      return "Mark";
    case "42":
      return "Luke";
    case "43":
      return "John";
    case "44":
      return "Acts";
    case "45":
      return "Romans";
    case "46":
      return "1 Corinthians";
    case "47":
      return "2 Corinthians";
    case "48":
      return "Galatians";
    case "49":
      return "Ephesians";
    case "50":
      return "Philippians";
    case "51":
      return "Colossians";
    case "52":
      return "1 Thessalonians";
    case "53":
      return "2 Thessalonians";
    case "54":
      return "1 Timothy";
    case "55":
      return "2 Timothy";
    case "56":
      return "Titus";
    case "57":
      return "Philemon";
    case "58":
      return "Hebrews";
    case "59":
      return "James";
    case "60":
      return "1 Peter";
    case "61":
      return "2 Peter";
    case "62":
      return "1 John";
    case "63":
      return "2 John";
    case "64":
      return "3 John";
    case "65":
      return "Jude";
    case "66":
      return "Revelation";
    default:
      return "Invalid Book";
  }
}
