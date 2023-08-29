# Resume Parser

A Simple NodeJs library to parse Resume / CV to JSON..

This library parse through CVs / Resumes in the word (.doc or .docx) / TXT / PDF / CSV format to extract the necessary information in a predefined JSON format. If the CVs / Resumes contain any social media profile links then the solution should also parse the public social profile web-pages and organize the data in JSON format (e.g. Linkedin public profile, Github, etc.)

## Installation

Clone this repository and use It.. 
Run `npm i` command In your terminal It will download all the dependency needed.


## Usage

```
ResumeParser
  .parseResumeFile(fileDir + `resume.txt`, fileDir + 'compiled') //Specify input file, output directory==> this ResumeParser function parses the text file and storedth parsed data in json format in compiled folder in resume.txt.json file  
  .then(file => {
    console.log("Yay! " + file);
  })
  .catch(error => {
    console.log('parseResume failed');
    console.error(error);
  });

```

At this moment application will work fine, but! By default it supports only `.TXT` and `.HTML` text formats.

For PDF I have used pdf-parse library for extracting text from PDF then saved it in a txt file using multer and then gave the txt file to the ResumeParser function

Working on DOC format and CSV format is Remaining.


## Extending

All 'action' are by building `src/dictionary.js` file. For now it has only basics rules, but it's very flexible (although a bit complicated) and extensible. Just put your rule according to existing and following main principles and enjoy!

## Contributions

Many thanks to [Alexey Lizurchik](https://github.com/likerRr) for this amazing library. 
[https://github.com/likerRr/code4goal-resume-parser](https://github.com/likerRr/code4goal-resume-parser) 

Also Many Thanks to [Parminder Klair](https://github.com/perminder-klair) for extending this amazing library. 
[https://github.com/likerRr/code4goal-resume-parser](https://github.com/likerRr/code4goal-resume-parser) 
