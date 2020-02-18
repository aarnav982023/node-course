const fs = require("fs");
const chalk = require("chalk");

const getNotes = () => "Your notes...";

const addNote = (title, body) => {
  const notes = loadNotes();

  //const duplicateNotes = notes.filter(note => note.title === title);
  const duplicateNote = notes.find(note => note.title === title);

  debugger;

  if (!duplicateNote) {
    notes.push({
      title,
      body
    });
    saveNotes(notes);
    console.log(chalk.green.inverse("New note added"));
  } else {
    console.log(chalk.red.inverse("Note title taken!"));
  }
};

const removeNote = title => {
  const notes = loadNotes();
  const keptNotes = notes.filter(note => note.title !== title);
  if (keptNotes.length < notes.length) {
    console.log(chalk.green.inverse("Note removed!"));
  } else {
    console.log(chalk.red.inverse("No note found!"));
  }
  saveNotes(keptNotes);
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.green.bold("Your Notes"));
  notes.forEach(note => console.log(note));
};

const readNote = title => {
  const notes = loadNotes();
  const noteToRead = notes.find(note => note.title === title);
  if (noteToRead) {
    console.log(chalk.green.bold(noteToRead.title));
    console.log(noteToRead.body);
  } else {
    console.log(chalk.red.inverse("Unable to find Note"));
  }
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

module.exports = { getNotes, addNote, removeNote, listNotes, readNote };
