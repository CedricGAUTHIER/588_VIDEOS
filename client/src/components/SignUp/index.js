import React,{ useState } from 'react';
import Header from '../Header';
import axios from 'axios';
import './SignUp.scss';
import {FaEye, FaEyeSlash, FaUserPlus} from 'react-icons/fa';

function SignUp({menuOpened, setMenuOpened, user, setUser, rootURL}) {
  const [toggleEye, setToggleEye] = useState(true);
  const [toggleEyeConfirm, setToggleEyeConfirm] = useState(true);
  const [password,setPassword] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');
  const fetchAddUser= async({pseudo,email,password,confirmPassword, email_alert})=>{
    try{
      const datas={
        pseudo: pseudo.value,
        email: email.value,
        password: password.value,
        email_alert: email_alert.checked
      }
      if(password.value===confirmPassword.value){
        await axios({
          method:"post",
          url: `${rootURL}/api/sign-up`,
          data: datas
        })
      } else {
        console.log('le mot de passe n\'est pas confirmé');
      }
      
      
    }
    catch(error){
      console.log(error);
    }
  }
  return (
    <div >
      <div className="header">
        <Header
              page={'formulaire d\'inscription'}
              pseudo={user.pseudo}
              menuOpened={menuOpened}
              setMenuOpened={setMenuOpened}
            />
      </div>
      <div className="requis">
        <span className="sign-up-required">
          *
        </span>
        <span className="sign-up-requis">
          champs obligatoires
        </span>
      </div>
      <div className="sign-up-form">
        <form onSubmit={(event)=>{
          event.preventDefault();
          fetchAddUser(event.target);
        }}>
          <div className="sign-up-inputs">
            <div className="sign-up-inputs-user">
              <fieldset>
                <div className="sign-up-fields">
                  <div className="sign-up-field">
                    <div className="sign-up-field-label">
                      <label htmlFor="pseudo">
                        Pseudo
                        <span className="sign-up-required">
                          *
                        </span>
                      </label>
                    </div>
                    <div className="sign-up-field-input">
                        <input
                          className="sign-up-pseudo"
                          type="text"
                          name="pseudo"
                          placeholder="Pseudo"
                          onChange={(evt)=>{
                            setUser({
                              ...user,
                              pseudo:evt.target.value
                            })
                          }}
                          value={user.pseudo}
                          required
                        />
                    </div>
                  </div>
                  <div className="sign-up-field">
                    <div className="sign-up-field-label">
                      <label htmlFor="email">
                        E - mail
                        <span className="sign-up-required">
                          *
                        </span>
                      </label>
                    </div>
                    <div className="sign-up-field-input">
                      <input
                        className="sign-up-email"
                        type="email"
                        name="email"
                        placeholder="E-mail (pour la réponse)"
                        onChange={(evt)=>{
                          setUser({
                            ...user,
                            email:evt.target.value
                          })
                        }}
                        value={user.email}
                        required
                      />
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
           
        
        
          <div className="sign-up-inputs-password">
            <fieldset>
              <div className="sign-up-fields">
                <div className="sign-up-field">
                  <div className="sign-up-field-label">
                    <label htmlFor="password">
                      Mot de passe
                      <span className="sign-up-required">
                          *
                      </span>
                    </label>
                  </div>
                  <div className="sign-up-field-input">
                    <input
                      className="sign-up-password"
                      type={(toggleEye)? "password":"text"}
                      name="password"
                      placeholder="Mot de passe"
                      value={password}
                      onChange={(evt)=>{
                        setPassword(evt.target.value);
                      }}
                      required
                    />
                    {(toggleEye) && (<FaEye
                        onClick={()=>{
                          setToggleEye(!toggleEye);
                        }}
                      />)}
                      {(!toggleEye) && 
                      (<FaEyeSlash
                        onClick={()=>{
                          setToggleEye(!toggleEye);
                        }}
                      />)}
                  </div>
                </div>
                <div className="sign-up-field">
                  <div className="sign-up-field-label">
                    <label htmlFor="confirmPassword">
                      Confirmation mot de passe
                      <span className="sign-up-required">
                          *
                      </span>
                    </label>
                  </div>
                  <div className="sign-up-field-input">
                    <input
                      className={(password==="")? "sign-up-confirm":(password===confirmPassword)? "sign-up-confirm-ok":"sign-up-confirm-nok"}
                      type={(toggleEyeConfirm)? "password":"text"}
                      name="confirmPassword"
                      placeholder="Confirmation mot de passe"
                      onChange={(evt)=>{
                        setConfirmPassword(evt.target.value);
                      }}
                      value={confirmPassword}
                      required
                    />
                    {(toggleEyeConfirm) &&
                      (<FaEye
                        onClick={()=>{
                          setToggleEyeConfirm(!toggleEyeConfirm);
                        }}
                      />)
                    }
                    {(!toggleEyeConfirm) && 
                      (<FaEyeSlash
                        onClick={()=>{
                          setToggleEyeConfirm(!toggleEyeConfirm);
                        }}
                      />)
                    }
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </div> 
        <div className="sign-up-checkbox">
          <fieldset>
            <div className="sign-up-field-checkbox">
              <div className="sign-up-field-input">
                <input className="sign-up-field-input-checkbox" type="checkbox" name="email_alert"/>
              </div>
              <div className="sign-up-field-label">
                <label htmlFor="email_alert">
                  Je souhaite recevoir un email à chaque connexion avec mes identifiants.
                </label>
              </div>
            </div>
          </fieldset>           
        </div>
        
        <div className="sign-up-submit">
        <fieldset>
            <button className="sign-up-submit-button">
              <div>s'inscrire</div>
              <div className="sign-up-submit-icon"><FaUserPlus size={25} /></div>
            </button>
        </fieldset>
        </div>
        </form>
      </div>
    </div>
   










     
    
  );
}

export default SignUp;
