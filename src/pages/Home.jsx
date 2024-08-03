import { Link, useLocation } from 'react-router-dom';
import './styles/home.css';
import { getUrl } from './config.js';
import { useEffect, useState } from 'react';
import Loading from './popup/loading.jsx';


/*user.chats.map((chat, id) => {
    return(
        <Link to={'/chat'} className='chat' key={id}>

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
})*/

export default function Home(){
    
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({})

    let obj = useLocation().state;

    useEffect(()=>{
        async function getData(data){
            const res = await fetch(getUrl(`/chats/?username=${obj.username}&password=${obj.password}`));
            if(res.ok){
                let chats = await res.json();
                console.log(chats)
                for(let i = 0; i < chats.length; i++){
                    chats[i].user1 = JSON.parse(chats[i].user1)
                    chats[i].user2 = JSON.parse(chats[i].user2)
                    chats[i].messages = JSON.parse(chats[i].messages)
                    for(let j = 0; j < chats[i].messages.length; j++){
                        chats[i].messages[j].sender = JSON.parse(chats[i].messages[j].sender)
                    }    
                }
                data.chats = chats;
                setUser(data);
                setLoading(false);
            }
            else{

            }
        }    
        getData(obj)
    }, [obj]);
    
    if(!loading)
    return(
        <div id='container'>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
            <div id="header">
                <div id="menu">
                    <span className="material-symbols-outlined">menu</span>
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
                            <span className="material-symbols-outlined">person_search</span>
                        </button>
                        <button>
                            <Link to={'/login'}>
                                <span className="material-symbols-outlined">logout</span>
                            </Link>
                        </button>
                    </div>    
                </div>
            </div>
            <div id="chats">
                {
                    user.chats.map((chat, id) => {
                        return(
                            <Link to={"/chat"} state={{user:{username:user.username, password:user.password}, chat:chat}} className='chat' key={id}>
                    
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
                                                            return <span classNAme="material-symbols-outlined">done_all</span>
                                                        else if(!chat.messages[chat.messages.length-1].isSeen && chat.messages[chat.messages.length-1].sender.username === user.username)
                                                            return <span className="material-symbols-outlined">check</span>                           
                                                        else
                                                            return <span></span>    
                                                    }()
                                                }
                                            </div>
                                            <div className="time">{new Date(chat.messages[chat.messages.length-1].datetime).toLocaleString("fa", "IR")}</div>
                                        </div>
                                    </div>
                                    <div className="down">
                                        <div className="message">
                                            <p>{chat.messages[chat.messages.length-1].content}</p>
                                            {
                                                function(){
                                                    if(!chat.messages[chat.messages.length-1].isSeen && chat.messages[chat.messages.length-1].sender.username !== user.username){
                                                        return <div className="unread">
                                                            {
                                                                function(){
                                                                    let unreads = 0;
                                                                    for(let i = chat.messages.length-1; i >= 0; i--){
                                                                        if(!chat.messages[i].isSeen && chat.messages[i].sender.username !== user.username)
                                                                            unreads++;
                                                                        else
                                                                            break;
                                                                    }
                                                                    return unreads;
                                                                }()
                                                            }
                                                        </div>
                                                    }
                                                }()
                                            }
                                        </div>
                                    </div>
                                </div>
                            
                            </Link>
                        );
                    })
                }
            </div>
            <Loading display={loading}/>
        </div>
    );
    else
        return <Loading display={loading}/>
}