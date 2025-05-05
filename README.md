cd backend to switch to the backend folder

run the following command to install the node dependencies:

npm install express fs xml2js

run the server with the following command:

node server.js

The console should now display "Server is running on http://localhost:$port"

To switch to a different version of the bible visit:

https://github.com/Beblia/Holy-Bible-XML-Format

Download the version of choice and place it in the public folder

(Click on the name of the selected version, and click the download button next to the top
right corner of the CODE / Blame sub menu and download the raw file)

replace the name of the XML file in /backend/server.js with the name of your file you just copied into the public folder.

Port - If you do not want to use port 3000, simply update the following line in the server.js file:

const port = 3000;

** IMPORTANT**
The names of the books are not included in any of these XML files, so if there is mismatch between the book numbers and the corresponding names, you will have to manually update two functions in the /public/script.js file:

1. getOldTestamentName(bookIndex)
2. getNewTestamentName(bookIndex)
   These functions are straight forward and contain a simple switch function to convert the book numbers into names.
