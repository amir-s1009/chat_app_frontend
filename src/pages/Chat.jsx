import './styles/chat.css';
import {user} from './data.js';

export default function Chat(){
    return(
        <div id="background">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
            <div id="header">
                <div id="menu">
                <span class="material-symbols-outlined">menu</span>
                </div>
                <div id="profile">
                    <img src={require('./assets/profile.png')} alt="عکس پروفایل" />
                </div>
                <div id="namelastseen">
                    <div id="name">
                        {
                            function(){
                                if(user.chats[0].user1.username === user.username)
                                    return user.chats[0].user2.name+" "+user.chats[0].user2.family;
                                else
                                    return user.chats[0].user1.name+" "+user.chats[0].user1.family;
                            }()
                        }
                    </div>
                    <div id="lastseen">{"آخرین بازدید ساعت "+function(){
                        if(user.chats[0].user1.username === user.username)
                            return user.chats[0].user2.lastseen
                        else
                            return user.chats[0].user1.lastseen;
                    }()}</div>
                </div>
            </div>
            <div id="chat">
                {
                    user.chats[0].messages.map((message, id)=>{
                        return(
                            <div className={message.sender.username === user.username?"outContainer":"inContainer"}>
                                <div className={message.sender.username === user.username?"outgoing":"incoming"}>
                                    <div className="profile">
                                        <img src={require('./assets/profile.png')} alt="پروفایل" />
                                    </div>
                                    <div className={message.sender.username === user.username?"outtimemessage":"intimemessage"}>
                                        <p className="message">{message.content}</p>
                                        <span className="time">{message.time}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
            <div id="newMessage">
                <input type="text" placeholder='پیامی در اینجا بنویسید...'/>
                <button id='send'>
                    <span class="material-symbols-outlined">send</span>
                </button>
            </div>
        </div>
    );
}