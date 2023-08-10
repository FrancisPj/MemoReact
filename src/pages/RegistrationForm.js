import React, { useState, useEffect } from 'react';
import './RegistrationForm.css';
import { useNavigate } from 'react-router-dom';


const RegistrationForm = ({ showForm }) => {

  const navigate = useNavigate();

    const [inputsValidity, setInputsValidity] = useState({
        username: false,
        email: false,
      });

      const validateUsername = () => {
        const usernameInput = document.getElementById("username") ;
        const validationTexts = document.querySelectorAll(".error-msg");

        if (usernameInput.value.trim().length >= 3 && !(/^\s*$/.test(usernameInput.value))) {
            // La longueur du nom d'utilisateur est au moins 3 caractères
            // Et le nom d'utilisateur ne contient pas uniquement des espaces
            validationTexts[0].style.display = "none";
            setInputsValidity(prevValidity => ({ ...prevValidity, username: true }));
          } else {
            validationTexts[0].style.display = "block";
            setInputsValidity(prevValidity => ({ ...prevValidity, username: false }));
          }
        };

        const validateEmail = () => {
            const emailInput = document.getElementById("email");
            const validationTexts = document.querySelectorAll(".error-msg");
            const regexEmail =/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
            if (regexEmail.test(emailInput.value)) {
              validationTexts[1].style.display = "none";
              setInputsValidity(prevValidity => ({ ...prevValidity, email: true }));
            } else {
              validationTexts[1].style.display = "block";
              setInputsValidity(prevValidity => ({ ...prevValidity, email: false }));
            }
          };
          
  useEffect(() => {
    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const validationTexts = document.querySelectorAll(".error-msg");

    const addEventListeners = () => {
      usernameInput.addEventListener("blur", validateUsername);
      usernameInput.addEventListener("input", validateUsername);
      emailInput.addEventListener("blur", validateEmail);
      emailInput.addEventListener("input", validateEmail);
    };

    const removeEventListeners = () => {
      usernameInput.removeEventListener("blur", validateUsername);
      usernameInput.removeEventListener("input", validateUsername);
      emailInput.removeEventListener("blur", validateEmail);
      emailInput.removeEventListener("input", validateEmail);
    };

    addEventListeners();

    // Nettoyage des écouteurs d'événements lorsque le composant est démonté
  return () => {
    removeEventListeners();
  };
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Validation des champs
    const isUsernameValid = inputsValidity.username;
    const isEmailValid = inputsValidity.email;
       // Vérification si les champs sont valides
    if (isUsernameValid && isEmailValid) {
      // Soumission du formulaire (vous pouvez implémenter ici l'envoi des données au backend si nécessaire)
      
      // Redirection vers la page d'administration
      navigate('/admin');
  } else {
      // Afficher un message d'erreur si les champs ne sont pas valides
      alert("Veuillez corriger les erreurs dans le formulaire avant de soumettre.");
  }
};


    return (
            <div id="inscription-container" >
                  <h2>Inscription :</h2>
                  <form
                  onSubmit={handleFormSubmit}
                  id="inscription-form" action="admin.html">
                    <label htmlFor="username">Nom d'utilisateur:</label>
                    <div className="input-container">
                      <input 
                      type="text" 
                      id="username"
                      name="username" 
                      placeholder="3 caractères minimum"
                      autocomplete="off" required
                      maxlength="15"
                      />
                     <span className="error-msg" style={{ display: 'none' }}>
            Il faut au moins 3 caractères !
          </span>
                  </div>
                    <label htmlFor="email">Adresse e-mail:</label>
                    <div className="input-container">
                      <input 
                      type="email"
                      id="email"
                      name="email"
                      autocomplete="off" required />
                        <span className="error-msg" style={{ display:'none'}}>
            Rentrez un mail valide !
          </span>
                    </div>
                    <button type="submit">S'inscrire</button>
                  </form>
                </div>
                )
         }



export default RegistrationForm;