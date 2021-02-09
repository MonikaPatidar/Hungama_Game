import {useState, useEffect } from 'react';
import Heading from './Heading';
import '../App.css'
import ReactCountdownClock  from 'react-countdown-clock';
// import step1 from './Component/images/0'

import step0 from "./images/0.jpg";
import step1 from "./images/1.jpg";
import step2 from "./images/2.jpg";
import step3 from "./images/3.jpg";
import step4 from "./images/4.jpg";
import step5 from "./images/5.jpg";
import step6 from "./images/6.jpg";


function Hungama() {

  var [word, setWord]=useState();
  var [replacedWord, setReplaceworld]=useState([]);
  var [alphabate, setAlphabate]=useState('');
  var [chance, setChance]=useState(10);
  var [match, setMatch]=useState(0);
  var [mistake, setMistake]=useState(-1);
  var images=[step0, step1, step2, step3, step4, step5, step6];

  useEffect(()=>
  {
    InitialString();
  },[replacedWord])


  const InitialString=()=>
  {
    var categories = 
      [
          ["mumbai", "delhi", "bangalore", "hyderabad", "ahmedabad", "chennai", "kolkata"],
          ["surat", "pune", "jaipur", "lucknow", "kanpur"],
          ["nagpur", "indore", "bhopal", "patna", "vadodara"]
      ];
      var chosenCategory = categories[Math.floor(Math.random() * categories.length)];
      word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
      setWord(word);
      getReplaceworld()
  }


    const getReplaceworld=()=>
  {
      var i=0;
      while(i<word.length)
      {
       replacedWord[i]=word[i].replace(word[i], '_ ');
       i++;
      }
      return setReplaceworld((replacedWord)=>replacedWord)    
  }


    const prepareAlphabets = () => 
  {
      let result = [];
      for(let i=65; i<91; i++) 
      {
        
        result.push
        (
          <button type="button" 
          class="keyboardButton" 
          key={i} 
          value={String.fromCharCode(i)} 
          onClick={(event)=>test(event)}
          disabled={alphabate.includes(String.fromCharCode(i))}
          >
            {String.fromCharCode(i)}
          </button>
        )
      }
      return result;
  }


    const test = (event) =>
    {
      if(replacedWord.includes('_ ') !== true){
        alert("you Won")
        setChance(0);
        ResetWord();
      }
      else if(chance>0)
      {
        setAlphabate(alphabate.concat(event.target.value))  
        Setalphabet(event)
        setChance(chance-1);
      }
      else 
      {
        alert("Chances Over")
        refresh();
        ResetWord();
      }
    
  }


    const Setalphabet=(e)=>
  {
     e.preventDefault();
      var Alphabate=e.target.value;
      var alphabate=Alphabate.toLowerCase();
        for(var i=0;i<word.length;i++)
        {
          if(word[i]===alphabate)
          {
             replacedWord[i]=alphabate;
             setMatch(match+1);
          } 
        }

          if(replacedWord.includes(alphabate) !== true)
          {
            setMistake(mistake+1);
          }
      return setReplaceworld((replacedWord)=>replacedWord)
  }


    const refresh=()=>
  {
    var flag=0;

    for(var i=0;i<word.length;i++)
    {
      if(word[i]===replacedWord[i])
      {
        flag++
      }
    }

    if(flag===replacedWord.length)
    {
      alert("you Won")
    }
    else
    {
      alert("you lost")
    }

  }

    const ResetWord=(e)=>
  {
    window.location.reload();
  }

  return (
    <>
    <Heading />
    <h2 className="ReplaceValue">{replacedWord}</h2>
    <div className="Liveimage">
    <img className="DrawImage" src={images[mistake]} alt=""/>
    </div>
    <div className="ResetButton_div">
      <button className="resetButton" onClick={()=>ResetWord()}><i class="material-icons">&#xe5d5;</i></button>
      <p className="newGame">New Game</p>
    </div>
    <h4 className="ShowLives">You Have {chance} Lives</h4>
    <div className="Keyboard"> 
      {prepareAlphabets()}
    </div>
    <div className="counterClock">
      <ReactCountdownClock seconds={100}
                      color="#000"
                      alpha={0.8}
                      size={80}
                      weight={10}
                      paused={false}
                      onComplete={()=>refresh()} 
                      />
    </div>

    </>
  );
}

export default Hungama;
