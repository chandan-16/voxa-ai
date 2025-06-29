import './Main.css';
import { assets } from '../../assets/assets';
import { useState } from 'react';
import { callGemini, callOllama } from '../../AIUtils/utils';

const VITE_VOXAAI_KEY = import.meta.env.VITE_VOXAAI_KEY
const USE_LOCAL_LLM = false;

const Main = () => {
  const [message, setMessage] = useState("")
  const [AIResponse, setAIResponse] = useState("")

  

  const sendMessageHandler = () => {
    const userText = message || "Explain how AI works in a few words";
    if (USE_LOCAL_LLM) {
      setAIResponse(callOllama(userText));
    } else {
      setAIResponse(callGemini(userText));
    }
  };

  return (
    <div className='main'>
      <div className="nav">
        <p>VoxaAI</p>
        <img src={assets.user_icon} alt="" />
      </div>

      <div className="main-container">
        <div className="greet">
          <p><span className='span'>Hello, Dev.</span></p>
          <p><span>How Can I help you today?</span></p>
        </div>
        <div className="cards">

          <div className="card">
            <p>Suggest beautiful places to see on an upcoming road trip.</p>
            <img src={assets.compass_icon} alt="" />
          </div>

          <div className="card">
            <p>Briefly summarize this concept : Urban planing in India.</p>
            <img src={assets.bulb_icon} alt="" />
          </div>

          <div className="card">
            <p>Brainstorm team bonding activities for our work retreat.</p>
            <img src={assets.message_icon} alt="" />
          </div>

          <div className="card">
            <p>Improve the readability of the following code..</p>
            <img src={assets.code_icon} alt="" />
          </div>
        </div>

        <div>
          {AIResponse}
        </div>

        <div className="main-bottom">
          <div className="search-box">
            <input value={message} onChange={(e) => setMessage(e.target.value)} type="text" placeholder='Enter a prompt here...' />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              <img onClick={sendMessageHandler} src={assets.send_icon} alt="" />
            </div>
          </div>
          <p className='bottom-info'>
            VoxaAI may display inaccurate info, including about people, so double-check its responses. Your privacy & VoxaAI App.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Main