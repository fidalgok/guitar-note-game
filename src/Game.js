import React from 'react'

function Game({strings, notes}){
    const [isStarted, setIsStarted] = React.useState(false);
    const [isPaused, setIsPaused] =  React.useState(false);
    const [mode, setMode] = React.useState('easy');
    const [gameStrings, setGameStrings] = React.useState(strings);
    const [gameNotes, setGameNotes] = React.useState(notes);
    const [gameOver, setGameOver] = React.useState(false);
    const [currentNote, setCurrentNote] = React.useState({string: '', note: '', fret: ''});
    const [showNote, setShowNote] = React.useState(false);

    React.useEffect(()=>{
        if(!gameNotes.length){
            setGameOver(true);
        }
    });

    React.useEffect(() => {
        const newGameNotes = notes.filter(note => {
            if(note.noteType === 'accidental') return false;
            if( (isNaN(Number(note.fret.slice(0, 2)) && note.noteType !== 'accidental'))){
                return true
            } else if((Number(note.fret.slice(0,2) <= 12 && note.noteType !== 'accidental'))){
                return true
            }
            return false
        });
        setGameNotes(newGameNotes);
    }, [])
    
    function handleStart(){
        // set the first random note and start the game
        
        getRandomNote();
       setIsStarted(true);
    }
    function handlePause(){
        return 'game paused'
    }
    function handleEnd(){
        // reset the game
        setIsStarted(false);
        setGameNotes(notes);
        setGameStrings(strings)
        setGameOver(false);
        setCurrentNote({string: '', note: '', fret: ''});
    }
    const handleMode = (e) => {
        const newMode = e.target.value.split(' ')[0].toLowerCase();
        if(newMode === 'easy'){
            // need to change game notes to only include the first 12 frets of natural notes
            const newGameNotes = notes.filter(note => {
                if(note.noteType === 'accidental') return false;
                if( isNaN(Number(note.fret.slice(0, 2)) && note.noteType === 'natural')){
                    return true
                } else if(Number(note.fret.slice(0,2) <= 12 && note.noteType === 'natural')){
                    return true
                }
                return false
            });
            setGameNotes(newGameNotes);
            
        }else if(newMode === 'medium'){
            const newGameNotes = notes.filter(note => {
                
                if(note.noteType === 'accidental') return false;
                if( isNaN(Number(note.fret.slice(0, 2)) && note.noteType === 'natural')){
                    return true
                } else if(typeof Number(note.fret.slice(0,2) < 23 && note.noteType === 'natural')){
                    return true
                }
                return false
            });
            setGameNotes(newGameNotes);

        }else if(newMode === 'hard'){
            setGameNotes(notes);
        }
        setMode(newMode);
    }
    function handleStringChange(e){
        console.log(e.target.checked, e.target.value)
        if(e.target.checked){
            setGameStrings([...gameStrings, e.target.value]);
            // collect the notes to add to the game for the given string
            const newNotes = notes.filter(note => note.string === e.target.value);
            setGameNotes([...gameNotes, ...newNotes]);
        } else {
            setGameStrings(gameStrings.filter(string => string !== e.target.value));
            setGameNotes(gameNotes.filter(note => note.string !== e.target.value));
        }
    }
    function getRandomNote(){
        const rand = Math.floor(Math.random() * gameNotes.length)
        setCurrentNote(gameNotes[rand]);
        let newGameNotes = [...gameNotes];
        newGameNotes.splice(rand, 1);
        setGameNotes(newGameNotes);
    }
    function handleNext(){
        
        setShowNote(false);
        getRandomNote();
    }
    return (
        <div>
            {!isStarted && 
            <>
            <p>Pick a mode</p>
            <select onChange={handleMode}>
                <option selected={mode === 'easy'}>Easy - Natural Notes (12 frets)</option>
                <option selected={mode === 'medium'}>Medium - Natural Notes (all frets)</option>
                <option selected={mode === 'hard'}>Hard - All notes all frets</option>
            </select>
            <p>Pick your strings</p>
            {strings.map(string => {
               return (<>
               <input 
               key={string} 
               type="checkbox" 
               name={string} 
               value={string} 
               id={string} 
               onChange={handleStringChange}
               checked={gameStrings.indexOf(string) !== -1 ? true : false}
               />
               <label htmlFor={string}>{string}</label>
               </>)
            })}
            <button onClick={handleStart}>Start!</button>
            </>
            }

            {isStarted && !gameOver && (
                <div>
                    <p>The game has begun</p>
                    <p>Guess the note</p>
                    <p>{currentNote.string} : {currentNote.fret}</p>
            <p>{showNote && currentNote.note}</p>
                    <button onClick={()=> setShowNote(true)}>Show Note</button><button onClick={handleNext}>Next Note</button>
                </div>
            )}

            {gameOver && (
                <div>
                   <p> Game over, start again?</p>
                   <button onClick={handleEnd}>Start Over</button>
                </div>
            )}

        </div>
    )
}

export default Game;