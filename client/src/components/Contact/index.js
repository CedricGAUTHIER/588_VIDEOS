import {React, useState} from 'react';
import {IoIosSend} from 'react-icons/io';
import * as emailjs from "emailjs-com";
import './Contact.scss';
import Home from '../Home'

function Contact({setPage, user}) {
  const [sended, setSended]=useState();
  const [message, setMessage]=useState('')
  const [userContact, setUserContact]=useState({...user, message:''});
  console.log('userContact init', userContact);
  setPage('contact');
  
  const handleSubmit=({pseudo, email, message,})=>{
      const serviceId = process.env.REACT_APP_SERVICE_ID
      const templateId =process.env.REACT_APP_TEMPLATE_ID;
      const userId =process.env.REACT_APP_USER_ID;
      const templateParams= {
          pseudo: `${pseudo.value}`,
          email: email.value,
          message: message.value,
          
      }
      

      emailjs.send(serviceId, templateId, templateParams, userId)
      .then((resp) => {
          
          
          setSended(true);
          setMessage("Le message a été envoyé");
          console.log('userContact avant', userContact)
          setUserContact({pseudo:'',email:'',message:''});
          console.log('userContact après', userContact)

      }, (err) => {
          setSended(false)
          setMessage("Erreur lors de l'envoi du message. Le message n'a pas été envoyé");
          
      });
          
                
      
    }
  
  
  return (
    <div className="contact">
       <span className="required">
        *
      </span>
       <span className="requis"> champs obligatoires</span>
       <form onSubmit={(evt)=>{
                    evt.preventDefault();
                    handleSubmit(evt.target);
                    <Home setPage={setPage}/>
                }
                }>
                    <div className="form">
                        <fieldset>
                            <div className="fields">
                                <div className="field">
                                    <div className="field-label">
                                        <label htmlFor="pseudo">
                                            Pseudo
                                            <span className="required">
                                                *
                                            </span>
                                        </label>
                                    </div>
                                    <div className="field-input">
                                      <input
                                        className="pseudo"
                                        type="text"
                                        name="pseudo"
                                        placeholder="Pseudo"
                                        onChange={(evt)=>{
                                          setUserContact({
                                            ...userContact,
                                            pseudo:evt.target.value
                                          })
                                        }}
                                        value={userContact.pseudo}
                                        required
                                      />
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="field-label">
                                        <label htmlFor="email">
                                            E - mail
                                            <span className="required">
                                                *
                                            </span>
                                        </label>
                                    </div>
                                    <div className="field-input">
                                      <input
                                        className="email"
                                        type="email"
                                        name="email"
                                        placeholder="E-mail (pour la réponse)"
                                        onChange={(evt)=>{
                                          setUserContact({
                                            ...userContact,
                                            email:evt.target.value
                                          })
                                        }}
                                        value={userContact.email}
                                        required
                                      />
                                    </div>
                                </div>
                                
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="container-message">
                                <div className="message">
                                  <textarea
                                    name="message"
                                    onChange={(evt)=>{
                                          setUserContact({
                                            ...userContact,
                                            message:evt.target.value
                                          })
                                        }}
                                    value={userContact.message}
                                    placeholder="Votre message"
                                    required>
                                  </textarea>
                                </div>
                            </div>
                        </fieldset>    
                         
                        <fieldset className="field-send">
                            <button className="send" >
                              <div>Envoyer le message</div>
                              <div className="send-icon"><IoIosSend size={25} /></div>
                            </button>
                        
                            
                            
                        </fieldset>
                         
                    </div>
                </form>
                
                {sended===undefined ? <p className="send-message"> </p>:<p className="send-message"> </p>} 
                {sended ? <p className="send-message">{message} </p>:<p className="send-message"> {message} </p>} 
    </div>
  );

}
export default Contact;
