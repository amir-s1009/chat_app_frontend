import './styles/sign.css';

export default function Signup(){
    return(
        <div id="background" >
            <div id="form">
                <div className="formItem" style={{marginTop:50}}>
                    <h2 style={{color:"white"}}>فرم ثبت نام کاربر</h2>
                </div>
                <div className="formItem">
                    <label>نام</label>
                    <input type={'text'}></input>
                </div>
                <div className="formItem">
                    <label>نام خانوادگی</label>
                    <input type={'text'}></input>
                </div>
                <div className="formItem">
                    <label>نام کاربری</label>
                    <input type={'text'}></input>
                </div>
                <div className="formItem">
                    <label>رمز عبور</label>
                    <input type={'password'}></input>
                </div>
                <div className="formItem">
                    <label>تکرار رمز عبور</label>
                    <input type={'password'}></input>
                </div>
                <div className="formItem">
                    <label>ایمیل</label>
                    <input type={'email'}></input>
                </div>
                <button style={{marginBottom:50}}>ثبت نام</button>
            </div>
        </div>
    );
}