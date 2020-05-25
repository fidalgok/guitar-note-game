import React from 'react';
import './App.css';
import {fretBoard} from './data/notes';
import Game from './Game';

function App() {
  const [notes, setNotes] = React.useState([]);
  const [strings, setStrings] = React.useState([]);
  const [gameNotes, setGameNotes] = React.useState([]);
  

  React.useEffect(()=>{
    // setup the notes array
    const guitarNotes = [];
    const guitarStrings = [];
    Object.entries(fretBoard).forEach(([string, frets]) => {
      if(guitarStrings.indexOf(string) === -1) guitarStrings.push(string);
      for (let fret in frets){
        guitarNotes.push({string, fret, note: frets[fret].note, noteType: frets[fret].note.includes('#') ? 'accidental' : 'natural'});
      }
    });
    setNotes(guitarNotes)
    setGameNotes(guitarNotes)
    setStrings(guitarStrings);
  }, []);
  
  function resetGame(){
    setGameNotes(notes);
  }

  if(!gameNotes.length) return null

  return (
    <div className="App">
      <header className="App-header">
        <p>Learn the notes of the fretboard!</p>
        <Game notes={gameNotes} strings = {strings}/>
      </header>
    </div>
  );
}

export default App;
