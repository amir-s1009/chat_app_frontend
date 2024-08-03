import './styles/chat.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getUrl } from './config';
import Loading from './popup/loading';
import Alert from './popup/alert';

export default function Chat(){
    const [open, setOpen] = useState(true);
    const [newMessage, setNewMessage] = useState("");
    const [chat, setChat] = useState(useLocation().state.chat);
    let user = useLocation().state.user;
    let sender = chat.user1.username === user.username?chat.user1: chat.user2;

    const [ws, setws] = useState(new WebSocket(getUrl(`/chat/?user=${sender._id}&chat=${chat._id}&username=${user.username}&password=${user.password}`)))

    useEffect(()=> {
        ws.onopen = (event)=> handleAlert("وصل شدید", "green", 2000);
        ws.onclose = (event) => handleAlert("ارتباط قطع شد", "orangered", 2000);
        ws.onmessage = (message) => {
            message = JSON.parse(message.data)
            message.sender = JSON.parse(message.sender)
            chat.messages.push(message);
            setChat(chat)
            setNewMessage("$")
        };
    }, [ws, chat])


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

    return(
        <div id="background">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
            <div id="header">
                <div id="menu" onClick={()=> setOpen(!open)}>
                    <span className="material-symbols-outlined">menu</span>
                </div>
                <div id="profile">
                    <img src={require('./assets/profile.png')} alt="عکس پروفایل" />
                </div>
                <div id="namelastseen">
                    <div id="name">
                        {
                            function(){
                                if(chat.user1.username === user.username)
                                    return chat.user2.name+" "+chat.user2.family;
                                else
                                    return chat.user1.name+" "+chat.user1.family;
                            }()
                        }
                    </div>
                    <div id="lastseen">{"آخرین بازدید  "+function(){
                        if(chat.user1.username === user.username)
                            return new Date(chat.user2.lastseen).toLocaleString("fa", "IR")
                        else
                            return new Date(chat.user1.lastseen).toLocaleString("fa", "IR")
                    }()}</div>
                </div>
            </div>
            <div id="chat">
                <div style={{"height":60}}></div>
                {
                    chat.messages.map((message, id)=>{
                        return(
                            <div className={message.sender.username === user.username?"outContainer":"inContainer"} key={id}>
                                <div className={message.sender.username === user.username?"outgoing":"incoming"}>
                                    <div className="profile">
                                        <img src={require('./assets/profile.png')} alt="پروفایل" />
                                    </div>
                                    <div className={message.sender.username === user.username?"outtimemessage":"intimemessage"}>
                                        <p className="message">{message.content}</p>
                                        <span className="time">
                                            {new Date(message.datetime).toLocaleTimeString("fa")}
                                            {
                                                function(){
                                                    const style = {
                                                        "color":"darkgreen",
                                                    }
                                                    if(message.sender.username === user.username && message.isSeen)
                                                        return <span style={style} className="material-symbols-outlined">done_all</span>
                                                        else if(message.sender.username === user.username && !message.isSeen)
                                                        return <span style={style}  className="material-symbols-outlined">check</span>
                                                    }()
                                                }
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
                <div style={{"height":200}}></div>
            </div>
            <div id="sidebar" style={{"right":function(){
                if(!open)
                    return 0;
                else
                    return "-50%";
            }()}}>
                {
                    function(){
                        const targetUser = chat.user1.username === user.username?chat.user2:chat.user1;
                        if(chat.user1.username === targetUser.username){
                            return <button id='blockUnblock' style={{"border":function(){
                                if(chat.user1.username === targetUser.username){
                                    if(chat.user1IsBlocked)
                                        return "1px solid green";
                                    else
                                        return "1px solid red";
                                }
                                else{
                                    if(chat.user2IsBlocked)
                                        return "1px solid green";
                                    else
                                        return "1px solid red";
                                }
                            }()}}>
                                {
                                    function(){
                                        if(chat.user1IsBlocked)
                                            return "آزادسازی کاربر";
                                        else return "مسدود کردن کاربر";
                                    }()                             
                                }
                            </button>
                        }
                        else{
                            return <button id='blockUnblock'>
                                {
                                    function(){
                                        if(chat.user2IsBlocked)
                                            return "آزادسازی کاربر";
                                        else return "مسدود کردن کاربر";
                                    }()                             
                                }
                            </button>
                        }
                    }()
                }
            </div>
                {
                    function(){
                        function sendMessage(){
                            const message = {
                                chat:chat._id,
                                sender: sender._id,
                                datetime:new Date().toISOString(),
                                reply:null,
                                content:newMessage,
                                isSeen:false
                            };
                            /*let res = await fetch(getUrl(`/messages/?username=${user.username}&password=${user.password}`,), {
                                method:"POST",
                                body:JSON.stringify(message),
                                headers:{
                                    "Content-Type":"application/json"
                                }
                            })
                            if(res.ok){
                                message.sender = sender
                                chat.messages.push(message)
                                setChat(chat)
                                setNewMessage("")
                            }*/
                            ws.send(JSON.stringify(message))
                        }
                        if(chat.user1.username === user.username){
                            if(!chat.user2IsBlocked){
                                return (
                                    <div id="newMessage">
                                        <button id='send' onClick={()=> sendMessage()}>
                                            <span className="material-symbols-outlined">send</span>
                                        </button>
                                        <input type="text" placeholder='پیامی در اینجا بنویسید...' onChange={(e) => setNewMessage(e.currentTarget.value)}/>
                                    </div>
                                )
                            }
                            else{
                                return(
                                    <div id="newMessage">
                                        <input type="text" placeholder="کاربر موردنظر شما را مسدود کرده است" style={{"textAlign":"center"}} disabled/>
                                    </div>
                                )
                            }
                        }
                        else{
                            if(!chat.user1IsBlocked){
                                return (
                                    <div id="newMessage">
                                        <button id='send' onClick={()=> sendMessage()}>
                                            <span className="material-symbols-outlined">send</span>
                                        </button>
                                        <input type="text" placeholder='پیامی در اینجا بنویسید...' onChange={(e) => setNewMessage(e.currentTarget.value)}/>
                                    </div>
                                )
                            }
                            else{
                                return(
                                    <div id="newMessage">
                                        <input type="text" placeholder="کاربر موردنظر شما را مسدود کرده است" disabled style={{"textAlign":"center"}}/>
                                    </div>
                                )
                            }
                        }
                    }()
                }
            <Alert display={alertDisplay} content={alertContent} background={alertBackground}/>
            <Loading display={loading}/>       
        </div>
    );
}