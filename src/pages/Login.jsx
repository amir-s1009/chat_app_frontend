import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/sign.css';
import {getUrl} from './config.js';
import Loading from './popup/loading.jsx';
import Alert from './popup/alert.jsx';

export default function Login(){

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false);

    const [alertContent, setAlertContent] = useState("");
    const [alertBackground, setAlertBackground] = useState("");
    const [alertDisplay, setAlertDisplay] = useState(false);
    

    function handleAlert(content, background, duration){
        setAlertContent(content);
        setAlertBackground(background);
        setAlertDisplay(true);
        setTimeout(()=>{
            setAlertContent("");
            setAlertBackground("");
            setAlertDisplay(false);
        }, duration)
    }

    async function handleLogin(){
        if(!username){
            handleAlert("نام کاربری را وارد نمایید", "orange", 2000);
        }
        else if(!password){
            handleAlert("رمز عبور را وارد نمایید", "orange", 2000);
        }
        else{
            try{
                setLoading(true);
                let response = await fetch(getUrl(`/users/?username=${username}&password=${password}`), {
                    method:"GET",
                    headers:{
                        "Content-Type":"application/json",
                    }
                })
                setLoading(false);
                if(response.ok){
                    let data = await response.json();
                    navigate('/home', {state:data})
                }
                else{
                    handleAlert("عملیات ناموفق", "orangered", 2000);
                }
            }
            catch(e){
                setLoading(false);
                handleAlert("خطا در برقراری ارتباط", "red", 2000);
                console.log(e);
            }
        }
    }

    return(
        <div id="background">
            <div id="newUser">
                <button><Link style={{color:"white"}} id="newUserBtn" className='link' to={"/signup"}>کاربر جدید هستید؟</Link></button>
            </div>
            <div id="lockIcon">
                <img src={require("./assets/lock.png")} alt='lock'></img>
            </div>
            <div id="form">
                <div className="formItem">
                    <label>نام کاربری</label>
                    <input type={'text'} onChange={(event) => setUsername(event.currentTarget.value)}></input>
                </div>
                <div className="formItem">
                    <label>رمز عبور</label>
                    <input type={'password'} onChange={(event) => setPassword(event.currentTarget.value)}></input>
                </div>
                <button onClick={()=> handleLogin(username, password)}>ورود</button>
            </div>
            <div id="forgotPassword">
                <button><Link style={{color:"white"}} className='link'>فراموشی رمز عبور</Link></button>
            </div>
            <Alert display={alertDisplay} content={alertContent} background={alertBackground} />
            <Loading display={loading}/>
        </div>
    );
}