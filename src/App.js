import gptLogo from './assets/chatgpt.svg'
import addBtn from './assets/add-30.png'
import msgicon from './assets/message.svg'
import home from './assets/home.svg'
import saved from './assets/bookmark.svg'
import rocket from './assets/rocket.svg'
import sendBtn from './assets/send.svg'
import userIcon from './assets/user-icon.jpeg'
import gptImgLogo from './assets/chatgptLogo.svg'
import './App.css';
import { sendMsgToOpenai } from './openai'
import React, { useState, useEffect, useRef } from 'react';


function App() {
  const msgEnd=useRef(null);
  const [input,setinput]=useState("");
  const [messages,setMessages]=useState([{
    text: "hi i am chatgpt what about u",
    isBot: true
  }]);

  useEffect(()=>{
    msgEnd.current.scrollIntoView();
  },[messages])

  const handleSend = async() =>{
    const text=input;
    setinput('')
    setMessages([
      ...messages,
      {text, isBot:false}
    ]);

    const res= await sendMsgToOpenai(input);
    setMessages([...messages,
      {text:input,isBot:false},
      {text:res,isBot:true}
    ]);
  }
  const handleEnter = async(e)=>{
    if(e.key =='Enter') await handleSend();
  }
  return (
    <div className='App'>
      <div className='sidebar'>
        <div className='upperSide'>
          <div className='upperSideTop'><img src={gptLogo} alt="Logo" className='logo'/><span className="brand">Chatgpt</span></div>
          <button className='midBtn' onClick={()=>{window.location.reload()}}><img src={addBtn} alt="" className='addBtn'/>New Chat</button>
          <div className='upperSideBottom'>
          <button className='query'><img src={msgicon} alt="Query" className='addbtn'/>What is programming ?</button>
          <button className='query'><img src={msgicon} alt="Query" className='addbtn'/>How to use an API?</button>
          </div>
        </div>
        <div className='lowerside'>
        <div className='listItems'><img src={home} alt="Home" className='listItemsImg'/>Home</div>
        <div className='listItems'><img src={saved} alt="Saved" className='listItemsImg'/>Saved</div>
        <div className='listItems'><img src={rocket} alt="Rocket" className='listItemsImg'/>Upgrade to pro</div>
        </div>
      </div>
      <div className='main'>
        <div className='chats'>
          {messages.map((message,i)=>
            <div key={i} className={message.isBot?'chat bot':'chat'}>
            <img className='chatimg' src={message.isBot?gptImgLogo:userIcon} alt="" /><p className="txt">{message.text}</p>
          </div>
          )}
          <div ref={msgEnd}/>
        </div>
        <div className='chatFooter'>
          <div className='inp'>
          <input type="text" placeholder='Send a Message' value={input} onKeyDown={handleEnter} onChange={(e)=>{setinput(e.target.value)}}/><button className='send' onClick={handleSend}><img src={sendBtn} alt="send" /></button>
          </div>
          <p>If u dont know how to type learn english and come</p>
        </div>
      </div>
    </div>
  );
}

export default App;
