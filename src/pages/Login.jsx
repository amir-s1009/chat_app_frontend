import { Link } from 'react-router-dom';
import './styles/sign.css';

export default function Login(){
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
                    <input type={'text'}></input>
                </div>
                <div className="formItem">
                    <label>رمز عبور</label>
                    <input type={'password'}></input>
                </div>
                <button>ورود</button>
            </div>
            <div id="forgotPassword">
                <button><Link style={{color:"white"}} className='link'>فراموشی رمز عبور</Link></button>
            </div>
        </div>
    );
}