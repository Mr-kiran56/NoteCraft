import React, { useState, useEffect, useRef } from 'react';
import '../Bot.css';  
import AddNotes from './AddNotes';

const API_KEY = "AIzaSyAWIzph7DYYyI7AkwIjvbMhuix-GYXnHcE";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

const ChatBot = ({setAlert}) => {
  const [chatHistory, setChatHistory] = useState([]);
  const [apiChatHistory, setApiChatHistory] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isBotResponding, setIsBotResponding] = useState(false);
  const [botText, setBotText] = useState("How can I assist?");
  const [showChatbot, setShowChatbot] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const abortControllerRef = useRef(null);
  const chatboxRef = useRef(null);
  const recognitionRef = useRef(null);

  // Cycle through bot header texts
  useEffect(() => {
    const texts = [
      "How can I assist?",
      "Ask me anything anytime.",
      "Your smart assistant here",
      "I learn from you."
    ];
    let index = 0;
    const interval = setInterval(() => {
      setBotText(texts[index]);
      index = (index + 1) % texts.length;
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Scroll chatbox to the bottom when new messages arrive
  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [chatHistory]);

  // Toggle the chatbot popup
  useEffect(() => {
    if (showChatbot) {
      document.body.classList.add('show-chatbot');
      document.body.classList.remove('togglebtn');
    } else {
      document.body.classList.remove('show-chatbot');
    }
  }, [showChatbot]);

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText(prev => prev ? `${prev} ${transcript}` : transcript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        setAlert("Voice recognition error. Please try again.", "danger");
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    } else {
      console.warn('Speech recognition not supported in this browser');
      setAlert("Voice input is not supported in your browser", "warning");
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [setAlert]);

  const generateBotResponse = async (userMessage) => {
    abortControllerRef.current = new AbortController();

    const newApiHistory = [...apiChatHistory, { role: "user", parts: [{ text: userMessage }] }];
    setApiChatHistory(newApiHistory);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: newApiHistory }),
      signal: abortControllerRef.current.signal,
    };

    try {
      const response = await fetch(API_URL, requestOptions);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error.message);

      const apiResponseText = data.candidates[0].content.parts[0].text.trim();
      setApiChatHistory(prev => [...prev, { role: "model", parts: [{ text: apiResponseText }] }]);


      return apiResponseText;
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Fetch aborted by user.");
        return null;
      }
      console.error("Error generating bot response:", error);
      return "Sorry, I couldn't process your request. Please try again.";
    }
  };

  const formatBotResponse = (text) => {
    let formattedText = text.replace(/\*\*\*(.*?)\*\*\*/g, `<strong>$1</strong>`);
    const lines = formattedText.split('\n');
    formattedText = lines.map(line => {
      if (line.startsWith('```')) {
        return `<div class="code-block"><pre><code>${line.replace(/```/g, '')}</code></pre></div>`;
      } else if (line.startsWith('* ')) {
        return `<div class="list-item"><ul><li>${line.replace('* ', '')}</li></ul></div>`;
      } else if (line.startsWith('### ')) {
        return `<div class="heading"><h3>${line.replace('### ', '')}</h3></div>`;
      } else {
        return `<div class="paragraph"><p>${line}</p></div>`;
      }
    }).join('');
    return formattedText;
  };

  const simulateBotResponse = async (userMessage) => {
    setIsBotResponding(true);
    const thinkingDotsHTML = `
      <div class="bot-message thinking-dots ">
        <div class="dot">.</div>
        <div class="dot">.</div>
        <div class="dot">.</div>
      </div>
    `;
    setChatHistory(prev => [...prev, { sender: "bot", html: thinkingDotsHTML, isHTML: true }]);

    const botResponseText = await generateBotResponse(userMessage);
    setChatHistory(prev => prev.slice(0, -1));

    if (botResponseText !== null) {
      const formattedResponse = formatBotResponse(botResponseText);
      setChatHistory(prev => [...prev, { sender: "bot", html: formattedResponse, isHTML: true }]);
    }

    setIsBotResponding(false);
  };

  const handleOutgoingMessage = (e) => {
    e.preventDefault();
    const message = inputText.trim();
    if (message && !isBotResponding) {
      setChatHistory(prev => [...prev, { sender: "user", text: message }]);
      setInputText("");
      simulateBotResponse(message);
    }
  };

  const handleStop = () => {
    if (isBotResponding && abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsBotResponding(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleOutgoingMessage(e);
    }
  };

  const toggleSpeechRecognition = () => {
    if (!recognitionRef.current) {
      setAlert("Voice input is not supported in your browser", "warning");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  return (
    <div className='boss'>
      <div className="row information">
        <div className='col-4 add-notestop'>
          <AddNotes setAlert={setAlert} />
        </div>

        <div className="info-section col-4">
          <h1 className='h11'>CreesBot</h1>
          <h4>💬 Smart Conversations – Engage in meaningful discussions.</h4>
          <h4>💡 Idea Generation – Get creative suggestions for brainstorming.</h4>
          <h4>📝 Quick Note-Taking – Jot down important thoughts instantly.</h4>
          <h4>✅ Task Assistance – Organize and manage tasks efficiently.</h4>
          <h4>🔍 Instant Information – Get answers in seconds.</h4>
          <div className="paragrpah">
            <h3 className="str">What is Crees Bot?</h3><br />
            <p>
              Crees Bot is an AI-powered assistant designed to help you communicate, generate ideas, take notes, and manage tasks effortlessly.
            </p>
          </div>
        </div>
      </div>

      {!showChatbot && (
        <button className="togglebtn" onClick={() => setShowChatbot(true)}>
          Ask CreesBot
        </button>
      )}

      <div className="bot-body chatbot-popup">
        <div className="header">
          <svg className="bot" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="green">
            <rect x="5" y="7" width="14" height="10" rx="2" fill="white" stroke="black" strokeWidth="1.5" />
            <circle cx="9" cy="12" r="1.5" fill="black" />
            <circle cx="15" cy="12" r="1.5" fill="black" />
            <rect x="11" y="3" width="2" height="3" fill="black" />
            <rect x="4" y="9" width="2" height="6" fill="black" />
            <rect x="18" y="9" width="2" height="6" fill="black" />
            <path d="M8 16c2 3 6 3 8 0" stroke="black" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </svg>
          <span className="name">CreesBot</span>
          <h4 className="bottexts fs-5">{botText}</h4>
          <svg onClick={() => setShowChatbot(false)} className='closebtn' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
            <path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
          </svg>
        </div>

        <div className="chatbox" ref={chatboxRef}>
          {chatHistory.map((msg, index) =>
            msg.isHTML ? (
              <div key={index} className="bot-message " dangerouslySetInnerHTML={{ __html: msg.html }}></div>
            ) : (
              <div key={index} className="user-messages-box">
                <div className="user-messages">{msg.text}</div>
              </div>
            )
          )}
        </div>

        <div className="chat-footer">
          <textarea
            className="textarea"
            id="text"
            placeholder="Type a message..."
            required
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
          ></textarea>
          
          <button 
            className={`voice-btn ${isListening ? 'listening' : ''}`}
            onClick={toggleSpeechRecognition}
            title={isListening ? "Stop listening" : "Speak your message"}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              height="24px" 
              viewBox="0 -960 960 960" 
              width="24px" 
              fill={isListening ? "red" : "#666"}
            >
              <path d="M480-423q-43 0-72-30.917-29-30.916-29-75.083v-251q0-41.667 29.441-70.833Q437.882-880 479.941-880t71.559 29.167Q581-821.667 581-780v251q0 44.167-29 75.083Q523-423 480-423Zm0-228Zm-30 531v-136q-106-11-178-89t-72-184h60q0 91 64.288 153t155.5 62Q571-454 635.5-516 700-578 700-669h60q0 106-72 184t-178 89v136h-60Zm30-363q18 0 29.5-13.5T521-529v-251q0-17-11.788-28.5Q497.425-820 480-820q-17.425 0-29.212 11.5Q439-797 439-780v251q0 19 11.5 32.5T480-483Z"/>
            </svg>
          </button>
          
          <button className="stop-btn" id="stopbtn" onClick={handleStop} title="Stop response">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#666">
              <path d="M320-320h320v-320H320v320Zm160.266-320q14.734 0 24.367 9.633Q514-621.734 514-607v226.334q0 14.663-9.633 24.164Q494.734-348 480-348t-24.367-9.5Q446-367.672 446-382.334V-607q0-14.734 9.633-24.367Q465.266-640 480.266-640ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 340q142.375 0 241.188-98.812Q820-337.625 820-480t-98.812-241.188Q622.375-820 480-820t-241.188 98.812Q140-622.375 140-480t98.812 241.188Q337.625-140 480-140Z"/>
            </svg>
          </button>
          
          <button className="send-btn" id="sendbtn" 
          onClick={handleOutgoingMessage} title="Send message">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#666">
              <path d="M120-160v-640l760 320-760 320Zm60-93 544-227-544-230v168l242 62-242 60v167Zm0 0v-457 457Z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;