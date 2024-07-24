import { Link } from 'react-router-dom';
import './styles/home.css';
import {user} from './data.js';

export default function Home(){
    return(
        <div id='container'>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
            <div id="header">
                <div id="menu">
                    <span class="material-symbols-outlined">menu</span>
                </div>
                <div id="profile">
                    <img src={require('./assets/profile.png')} alt="عکس پروفایل" />
                </div>
                <div id="appName">
                    <h2>امیراَپ</h2>
                </div>
                <div id="logsearch">
                    <div id="btnbox">
                        <button>
                            <span class="material-symbols-outlined">person_search</span>
                        </button>
                        <div>|</div>
                        <button>
                            <Link to={'/login'}>
                                <span class="material-symbols-outlined">logout</span>
                            </Link>
                        </button>
                    </div>    
                </div>
            </div>
            <div id="chats">
                {
                    user.chats.map((chat, id) => {
                        return(
                            <Link to={'/chat'} className='chat'>
                    
                                <div className="profile">
                                    <img src={require('./assets/profile.png')} alt="عکس پروفایل" />
                                </div>
                                <div className="content">
                                    <div className="up">
                                        <div className="name">{chat.user1.username !== user.username?chat.user1.name+" "+chat.user1.family:chat.user2.name+" "+chat.user2.family}</div>
                                        <div className='timeseen'>
                                            <div className="seen">
                                                {
                                                    function(){
                                                        if(chat.messages[chat.messages.length-1].isSeen && chat.messages[chat.messages.length-1].sender.username === user.username)
                                                            return <span class="material-symbols-outlined">done_all</span>
                                                        else if(!chat.messages[chat.messages.length-1].isSeen && chat.messages[chat.messages.length-1].sender.username === user.username)
                                                            return <span class="material-symbols-outlined">check</span>                           
                                                        else
                                                            return <span></span>    
                                                    }()
                                                }
                                            </div>
                                            <div className="time">{chat.messages[chat.messages.length-1].time}</div>
                                        </div>
                                    </div>
                                    <div className="down">
                                        <div className="message">
                                            <p>{chat.messages[chat.messages.length-1].content}</p>
                                            <div className="unread">
                                                {
                                                    function(){
                                                        let unreads = 0;
                                                        for(let i = chat.messages.length-1; i >= 0; i--){
                                                            if(!chat.messages[i].isSeen)
                                                                unreads++;
                                                            else
                                                                break;
                                                        }
                                                        return unreads;
                                                    }()
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            
                            </Link>
                        );
                    })
                }
            </div>
        </div>
    );
}