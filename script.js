const btnToggle = document.getElementById("btnToggle");
const divVerseText = document.getElementById("divVerseText");
const verseText = document.getElementById("verseText");
const getTestament = document.getElementById("testament");
const getBook = document.getElementById("book");
const getChapter = document.getElementById("chapter");
const getVerse = document.getElementById("verse");

window.onload = fetchData;

btnToggle.addEventListener("click", () => {
  if (divVerseText.style.display === "none") {
    divVerseText.style.display = "block";
  } else {
    divVerseText.style.display = "none";
  }
});

verse.addEventListener("change", () => {
  btnToggle.style.display = "block";
});

function fetchData() {
  fetch("EnglishNLTBible.xml")
    .then((response) => {
      return response.text();
    })
    .then((xmlString) => {
      const xmlDocument = new DOMParser().parseFromString(
        xmlString,
        "text/xml"
      );
      //console.dir(xmlDocument);
      //const books = xmlDocument.querySelectorAll("book");
      const testaments = xmlDocument.querySelectorAll("testament");

      getTestament.addEventListener("change", () => {
        if (getTestament.value === "Old") getOldTestament(testaments);
        else if (getTestament.value === "New") getNewTestament(testaments);
      });

      getBook.addEventListener("change", () => {
        const bookIndex = getBook.value;
        console.log("Book: ", bookIndex);
        getChatpers(testaments);
      });

      getChapter.addEventListener("change", () => {
        getVerses(testaments);
      });

      getVerse.addEventListener("change", () => {
        getVerseContent(testaments);
      });
    });
}

function getVerseContent(testaments) {
  for (const testament of testaments) {
    if (getTestament.value === testament.getAttribute("name")) {
      console.log("Testament Name: ", getTestament.value);
      let books = testament.querySelectorAll("book");
      for (const book of books) {
        if (getBook.value === book.getAttribute("number")) {
          let chapters = book.querySelectorAll("chapter"); // Updated line
          for (const chapter of chapters) {
            if (
              chapter.getAttribute("number") ===
              document.getElementById("chapter").value
            ) {
              let verses = chapter.querySelectorAll("verse");
              console.log(verses);
              for (const verse of verses) {
                if (
                  verse.getAttribute("number") ===
                  document.getElementById("verse").value
                ) {
                  const lblVerseText = document.getElementById("lblVerseText");
                  let lblbookName = getOldTestamentName(getBook.value);
                  let lblChapter = document.getElementById("chapter").value;
                  let lblVerseNumber = verse.getAttribute("number");
                  lblVerseText.innerHTML =
                    lblbookName +
                    "; Chapter: " +
                    lblChapter +
                    ", Verse " +
                    lblVerseNumber;
                  verseText.value = verse.textContent;
                  console.log("book ", lblbookName);
                  console.log("chapter: ", lblChapter);
                  //  document.getElementById("chapter").value
                  //);
                }
              }
            }
          }
        }
      }
    }
  }
}

function getVerses(testaments) {
  const selectVerse = document.getElementById("verse");
  selectVerse.innerHTML = "";
  const option = document.createElement("option");
  option.value = "Select";
  option.selected = "Select";
  option.textContent = "Select";
  selectVerse.appendChild(option);

  for (const testament of testaments) {
    if (getTestament.value === testament.getAttribute("name")) {
      console.log("Testament Name: ", getTestament.value);
      let books = testament.querySelectorAll("book");
      for (const book of books) {
        if (getBook.value === book.getAttribute("number")) {
          let chapters = book.querySelectorAll("chapter"); // Updated line
          for (const chapter of chapters) {
            if (
              chapter.getAttribute("number") ===
              document.getElementById("chapter").value
            ) {
              let verses = chapter.querySelectorAll("verse");
              console.log(verses);
              for (const verse of verses) {
                const option = document.createElement("option");
                option.value = verse.getAttribute("number");
                option.textContent = verse.getAttribute("number");
                selectVerse.appendChild(option);
              }
            }
          }
        }
      }
    }
  }
}

function getChatpers(testaments) {
  const selectChapter = document.getElementById("chapter");
  selectChapter.innerHTML = "";
  const option = document.createElement("option");
  option.value = "Select";
  option.selected = "Select";
  option.textContent = "Select";
  selectChapter.appendChild(option);

  for (const testament of testaments) {
    if (getTestament.value === testament.getAttribute("name")) {
      console.log("Testament Name: ", getTestament.value);
      let books = testament.querySelectorAll("book");
      for (const book of books) {
        if (getBook.value === book.getAttribute("number")) {
          let chapters = book.querySelectorAll("chapter"); // Updated line
          for (const chapter of chapters) {
            const option = document.createElement("option");
            option.value = chapter.getAttribute("number"); // Assuming "number" is an attribute of "chapter"
            option.textContent = chapter.getAttribute("number");
            selectChapter.appendChild(option);
          }
          //console.log(chapters);
        }
      }
    }
  }
}

function getOldTestament(testaments) {
  const selectBook = document.getElementById("book");
  selectBook.innerHTML = "";
  const option = document.createElement("option");
  option.value = "Select";
  option.selected = "Select";
  option.textContent = "Select";
  selectBook.appendChild(option);

  for (const testament of testaments) {
    let testamentName = testament.getAttribute("name");
    if (testamentName === "Old") {
      console.log(testamentName);
      let books = testament.querySelectorAll("book");
      console.log("number of books in this testament =", books.length);
      for (const book of books) {
        const option = document.createElement("option");
        let _bookIndex = book.getAttribute("number");

        const _bookName = getOldTestamentName(_bookIndex);
        option.value = _bookIndex;
        option.textContent = `${_bookName}`;
        selectBook.appendChild(option);
        //console.log(_bookName);
      }
    }
  }
}

function getNewTestament(testaments) {
  const selectBook = document.getElementById("book");
  selectBook.innerHTML = "";
  const option = document.createElement("option");
  option.value = "Select";
  option.selected = "Select";
  option.textContent = "Select";
  selectBook.appendChild(option);

  for (const testament of testaments) {
    let testamentName = testament.getAttribute("name");
    if (testamentName === "New") {
      console.log(testamentName);
      let books = testament.querySelectorAll("book");
      console.log("number of books in this testament =", books.length);
      for (const book of books) {
        const option = document.createElement("option");
        let _bookIndex = book.getAttribute("number");

        const _bookName = getNewTestamentName(_bookIndex);
        option.value = _bookIndex;
        option.textContent = `${_bookName}`;
        selectBook.appendChild(option);
        //console.log(_bookName);
      }
    }
  }
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
