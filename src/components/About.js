import React, { useState } from "react";
import { FaChevronDown, FaRobot, FaPlusCircle, FaHeadphones, FaEdit, FaTrashAlt, FaLightbulb, FaMobileAlt, FaReact, FaBrain, FaDatabase, FaMicrophoneAlt, FaPaintBrush } from "react-icons/fa";
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";

const About = () => {
  const [activeIndex, setActiveIndex] = useState(0); // First item open by default

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const accordionData = [
    {
      title: "About the Developer",
      content: (
        <>
          <p>Hello! I'm Kiran Punna, the developer behind CreesBot. I'm passionate about creating AI-powered tools that enhance productivity and creativity.</p>
          <p>CreesBot is my attempt to combine AI assistance with practical note-taking functionality to help people organize their thoughts and ideas more effectively.</p>
          <div className="social-links">
            <a href="https://instagram.com/yourusername" className="social-link instagram" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://github.com/yourusername" className="social-link github" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/in/yourusername" className="social-link linkedin" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
          </div>
        </>
      )
    },
    {
      title: "About CreesBot",
      content: (
        <>
          <p>CreesBot is an AI-powered notes assistant built with React that helps you capture, organize, and enhance your thoughts.</p>
          <p>It combines traditional note-taking with AI assistance to help you think more clearly, remember important ideas, and even generate new insights based on your notes.</p>
        </>
      )
    },
    {
      title: "Key Features",
      content: (
        <ul className="features-list">
          <li><FaRobot className="feature-icon" /> <strong>AI Assistance:</strong> Interact with CreesBot to help develop your ideas and thinking</li>
          <li><FaPlusCircle className="feature-icon" /> <strong>Add Notes:</strong> Create and store your thoughts and ideas</li>
          <li><FaHeadphones className="feature-icon" /> <strong>Text-to-Speech:</strong> Listen to your notes read aloud</li>
          <li><FaEdit className="feature-icon" /> <strong>Edit Notes:</strong> Modify your existing notes anytime</li>
          <li><FaTrashAlt className="feature-icon" /> <strong>Delete Notes:</strong> Remove notes you no longer need</li>
          <li><FaLightbulb className="feature-icon" /> <strong>AI Suggestions:</strong> Get AI-generated suggestions based on your notes</li>
          <li><FaMobileAlt className="feature-icon" /> <strong>Responsive Design:</strong> Works on all devices</li>
        </ul>
      )
    },
    {
      title: "Technology Stack",
      content: (
        <>
          <p>CreesBot is built using modern web technologies:</p>
          <ul className="features-list">
            <li><FaReact className="feature-icon" /> <strong>React:</strong> Frontend JavaScript library</li>
            <li><FaBrain className="feature-icon" /> <strong>AI Integration:</strong> Powered by advanced language models</li>
            <li><FaDatabase className="feature-icon" /> <strong>Local Storage:</strong> Notes are saved in your browser</li>
            <li><FaMicrophoneAlt className="feature-icon" /> <strong>Web Speech API:</strong> For text-to-speech functionality</li>
            <li><FaPaintBrush className="feature-icon" /> <strong>CSS3:</strong> Modern styling and animations</li>
          </ul>
        </>
      )
    }
  ];

  return (
    <div className="about-bg">
      <div className="backabout">
      <div className="container container1">
        <h1 className="h12">About <span className="title">NoteCraft</span></h1>
        
        <div className="accordion">
          {accordionData.map((item, index) => (
            <div 
              className={`accordion-item ${activeIndex === index ? 'active' : ''}`} 
              key={index}
            >
              <div 
                className="accordion-header" 
                onClick={() => toggleAccordion(index)}
              >
                <span>{item.title}</span>
                <FaChevronDown className="accordion-icon" />
              </div>
              <div 
                className="accordion-content" 
                style={{ maxHeight: activeIndex === index ? '1000px' : '0' }}
              >
                <div className="accordion-content-inner">
                  {item.content}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className=" footer3">
          <p>NoteCraft AI Notes Assistant &copy; 2025 | Developed by Kiran Punna</p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default About;