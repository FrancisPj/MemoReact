import { useEffect, useState } from 'react';
import './App.css';
import  SingleCard from '../components/SingleCard.js';
import  RegistrationForm from './RegistrationForm.js';


const cardImages = [
  {"src": "/images/a.svg", matched: false},
  {"src": "/images/b.svg", matched: false},
  {"src": "/images/c.svg", matched: false},
  {"src": "/images/d.svg", matched: false},
  {"src": "/images/e.svg", matched: false},
  {"src": "/images/f.svg", matched: false},
  {"src": "/images/g.svg", matched: false},
  {"src": "/images/h.svg", matched: false},
  {"src": "/images/i.svg", matched: false},
  {"src": "/images/j.svg", matched: false},
  {"src": "/images/k.svg", matched: false},
  {"src": "/images/l.svg", matched: false},
  {"src": "/images/m.svg", matched: false},
  {"src": "/images/n.svg", matched: false},
  {"src": "/images/o.svg", matched: false}
]
function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [encouragementMessage, setEncouragementMessage] = useState("");
  // pour le formulaire
  const [showForm, setShowForm] = useState(false);

  // Melange des cartes
  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({...card, id: Math.random() }))

  setChoiceOne(null)
  setChoiceTwo(null)  
  setCards(shuffleCards)
  setTurns(0)
  }
  
  // gérer un choix
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  //Compare 2 selections de card
  useEffect(() => {
    
    if(choiceOne && choiceTwo) {
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        restTurn()
      } else {
        setTimeout(() => restTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])


  //plus de choix et retourne
 
  const restTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)}

    useEffect(() => {
      const allMatched = cards.every(card => card.matched);
    
      if (allMatched) {
    //Phrase d'encouragement en fonction du nombre de coups
    if (turns === 15) {
      setEncouragementMessage("Incroyable ! vous avez gagné 😁 Votre score est excellent !");
    } else if (turns <= 30) {
      setEncouragementMessage(`Bravo ! Vous avez réussi en ${turns}😁 coups ! Vous êtes très doué !`);
    } else if (turns <= 40) {
      setEncouragementMessage(`Bravo ! Vous avez réussi en ${turns}😁 coups ! persévérez !`);
    }else {
      setEncouragementMessage(`Bravo ! Vous avez réussi en ${turns}😁 coups !`);
    }

    // Affichage du formulaire d'inscription une fois que la phrase est affichée
    setShowForm(true);
  } else {
    // On réinitialise la phrase d'encouragement si toutes les cartes ne sont pas encore par paires
    setEncouragementMessage("");
    setShowForm(false);
  }
}, [cards, turns]);
 
  // Débuter une nouvelle partie automatiquement
useEffect(() => {
  shuffleCards()
}, [])


  return (
    <div className="App">
      <h1>Jeu des <span>cartes mémoires</span> pour <span> le CSN</span> </h1>
      <button
      onClick={shuffleCards}
      >Nouveau jeu</button>
      <p className="advice">Les quinze meilleurs joueurs !</p>
      <div className="phase-message"></div>
      <p className="advice">Tentez de gagner avec le moins d'essais possible.</p>
      <div className="score"><p> Nombre de coups : {turns}</p>
      <p>{encouragementMessage}</p>
      </div>
      
{/* Inscription */}
 {/* Afficher le formulaire si showForm est vrai */}
  {showForm && < RegistrationForm  />}

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
          key={card.id} 
          card={card}
          handleChoice={handleChoice}
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          disabled={disabled}
          />
        ))}
      </div>
      
      <form id="reset-form" class="container">
      <label for="password">Mot de passe administrateur :</label>
      <input type="password" id="password" required />
      <button type="submit">le tableau</button>
    </form>
      
    </div>
    
  );
}

export default App;
