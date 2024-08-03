import { useState } from 'react';
import './styles/sign.css';
import { getUrl } from './config.js';
import { useNavigate } from 'react-router-dom';
import Loading from './popup/loading.jsx';
import Alert from './popup/alert.jsx';

export default function Signup(){

    const [name, setname] = useState("");
    const [family, setfamily] = useState("");
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [repassword, setrepassword] = useState("");
    const [email, setemail] = useState("");

    const navigate = useNavigate();

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
    
    async function handleSignup(){
        if(!name){
            handleAlert("نام را وارد کنید", "orange", 2000);
        }
        else if(!family){
            handleAlert("نام خانوادگی را وارد کنید", "orange", 2000);
        }
        else if(!username){
            handleAlert("نام کاربری را وارد کنید", "orange", 2000);
        }
        else if(!password){
            handleAlert("رمز عبور را وارد کنید", "orange", 2000);
        }
        else if(!repassword){
            handleAlert("رمز عبور را تکرار فرمایید", "orange", 2000);
        }
        else if(password !== repassword){
            handleAlert("رمز عبور با تکرار آن همخوانی ندارد", "orange", 2000);
        }
        else if(!email){
            handleAlert("ایمیل را وارد کنید", "orange", 2000);
        }
        else{
            try{
                setLoading(true);
                let response = await fetch(getUrl("/users"), {
                    method:"POST",
                    body:{
                        "name":name,
                        "family":family,
                        "username":username,
                        "password":password,
                        "email":email,
                        "lastSeen":Date.now,
                        "profile":null,
                        "chats":[]
                    },
                    mode:"no-cors",
                    headers:{
                        "Content-Type":"application/json"
                    }
                })
                setLoading(false);
                if(response.ok){
                    handleAlert("ثبت نام کاربر موفق", "green", 2000);
                    navigate({
                        pathname:"/home",
                        state:response.json()
                    })
                }
                else{
                    handleAlert("عملیات ناموفق", "orangered", 2000);
                }
            }
            catch{
                setLoading(false);
                handleAlert("خطا در برقراری ارتباظ", "red", 2000);
            }
        }
    }

    return(
        <div id="background" >
            <div id="form">
                <div className="formItem" style={{marginTop:50}}>
                    <h2 style={{color:"white"}}>فرم ثبت نام کاربر</h2>
                </div>
                <div className="formItem">
                    <label>نام</label>
                    <input type={'text'} onChange={(e)=> setname(e.currentTarget.value)}></input>
                </div>
                <div className="formItem">
                    <label>نام خانوادگی</label>
                    <input type={'text'} onChange={(e)=> setfamily(e.currentTarget.value)}></input>
                </div>
                <div className="formItem">
                    <label>نام کاربری</label>
                    <input type={'text'} onChange={(e)=> setusername(e.currentTarget.value)}></input>
                </div>
                <div className="formItem">
                    <label>رمز عبور</label>
                    <input type={'password'} onChange={(e)=> setpassword(e.currentTarget.value)}></input>
                </div>
                <div className="formItem">
                    <label>تکرار رمز عبور</label>
                    <input type={'password'} onChange={(e)=> setrepassword(e.currentTarget.value)}></input>
                </div>
                <div className="formItem">
                    <label>ایمیل</label>
                    <input type={'email'} onChange={(e)=> setemail(e.currentTarget.value)}></input>
                </div>
                <button style={{marginBottom:50}} onClick={()=> handleSignup()}>ثبت نام</button>
            </div>
            <Alert display={alertDisplay} content={alertContent} background={alertBackground}/>
            <Loading display={loading}/>
        </div>
    );
}