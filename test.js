const ResumeParser = require('./src');
const app = require('express')();
const PORT = 5000;
const fileDir = process.cwd() + '/files/';
const path = require('path');
const multer = require("multer");
const fs = require("fs");
const pdfparse = require("pdf-parse");


app.listen(
  PORT,
  () => console.log(`Server is running on ${PORT}`)
);


// Configure multer to store uploaded files in the 'uploads' folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "files/uploaded_files"); // 'uploads' is the folder where files will be stored
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + extension);
  },
});

const upload = multer({ storage });

app.post("/uploadpdf", upload.single("file"), (req, res) => {  // '/uploadpdf' is the api end point you can call 
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const storedFileName = req.file.filename; // storing the uploded file name in a variable 
  const storedFileNameWithoutExtension = path.basename(req.file.filename, path.extname(req.file.filename)); // storing the uploded file name without extension in a variable 



  const pdffile = fs.readFileSync(`files/uploaded_files/${storedFileName}`); // This line reads the uploded file 
  pdfparse(pdffile).then(function (data) { // this pdfparse function extracts text from the uploded pdf file 
    console.log(data.numpages);
    console.log(data.info);
    console.log(data.text);
    console.log(storedFileNameWithoutExtension);
    const txtFilePath = path.join(__dirname, "files", `resume.txt`); // specifies the path for resume.txt file 
    fs.writeFileSync(txtFilePath, data.text); // this line stores the extracted text in resume.txt file 
  });


  setTimeout(() => {
  ResumeParser
  .parseResumeFile(fileDir + `resume.txt`, fileDir + 'compiled') //Specify input file, output directory==> this ResumeParser function parses the text file and storedth parsed data in json format in compiled folder in resume.txt.json file  
  .then(file => {
    console.log("Yay! " + file);
  })
  .catch(error => {
    console.log('parseResume failed');
    console.error(error);
  });
},1000);


setTimeout(() => {
  const filePath = path.join(__dirname, `./files/compiled/resume.txt.json`); // Update the path to your file
  res.sendFile(filePath);//this displays the resume.txt.json file on the webpage
},3000);

});



app.get('/display-file', (req, res) => {    // api to get the parsed data 
  const filePath = path.join(__dirname, './files/compiled/resume.txt.json'); // Update the path to your file
  res.sendFile(filePath);
});











// ResumeParser
//   .parseResumeFile(fileDir + 'resume.txt', fileDir + 'compiled') //input file, output dir
//   .then(file => {
//     console.log("Yay! " + file);
//   })
//   .catch(error => {
//     console.log('parseResume failed');
//     console.error(error);
//   });


