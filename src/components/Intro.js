import React from "react";
import { Link } from "react-router-dom"; 
import "../App.css";
import { useNavigate } from "react-router-dom";

const Intro = () => {
  const navigate = useNavigate();

  const gotohome = () => {
    return navigate("/");
  };

  return (
    <div>
      <div className="image">
        <div style={{ height: "240px" }}></div>

        <div className="text-center">
          <div className="fs-1 text-color fw-bold mb-3">Creer Bot – Your AI Companion</div>
          <div className="smallfont text-light fs-4 fw-bold">
            Ask anything, get instant responses, and simplify your tasks.
          </div>
        </div>

        <div className="text-center mt-4">
          <div className="note-container text-center p-5">
            <h1 className="fw-bold display-4">
              <span>📝</span>
              <span className="text-color mb-3"> Start Now with Creer Bot & NoteCraft!</span>
            </h1>
            <div className="smallfont text-light fs-4 mb-2 fw-bold">
              "Your AI-Powered Assistant for Smart Notes & Ideas"
            </div>
            <p className="fs-5 mb-5 text-light">
              Ask anything, take notes, and organize your daily tasks effortlessly.
              Creer Bot is here to assist, and NoteCraft keeps your ideas secure.
            </p>
            <button className="start-nowbtn" onClick={gotohome}>Start Now</button>
          </div>
        </div>

        {/* Card Section */}
        <div className="contain">
          <div className="row justify-content-center">
            <div className="col-md-3 d-flex">
              <div className="card gradient-bg">
                <h3 className="heading">AI-Powered Note-Taking</h3>
                <p>An AI note-taking assistant helps users efficiently organize thoughts, ideas, and tasks by summarizing, structuring, and retrieving notes instantly.</p>

                <p><strong>Features:</strong> Speech-to-text, smart categorization, auto-summarization, and real-time syncing.</p>
                <p><strong>Popular AI Note-Taking Tools:</strong> Creer Bot, NoteCraft, Evernote AI, Notion AI. These tools enhance productivity by making note-taking seamless and interactive.</p>
                <p>AI-powered note-taking saves time by reducing manual work, allowing users to focus on creativity and decision-making rather than just documentation.</p>
              </div>
            </div>

            <div className="col-md-3 d-flex">
              <div className="card gradient-bg">
                <h3 className="heading">Smart Organization & Idea Management</h3>
                <p>AI-driven organization tools help users manage notes, tasks, and ideas by automatically tagging, categorizing, and structuring content.</p>
                <p><strong>Functions:</strong> AI-based search, real-time collaboration, smart reminders, and visual mind maps.</p>
                <p><strong>Popular Tools:</strong> NoteCraft, Notion, Roam Research. These platforms offer structured and intuitive ways to organize digital notes and enhance workflow.</p>
                <p>With AI-based organization, professionals, students, and businesses can easily keep track of ideas and projects without clutter, boosting efficiency.</p>
              </div>
            </div>

            <div className="col-md-3 d-flex">
              <div className="card gradient-bg">
                <h3 className="heading">AI Assistance for Productivity</h3>
                <p>AI-powered virtual assistants streamline work by automating tasks, generating content, and providing insights for better productivity.</p>
                <p><strong>Capabilities:</strong> Brainstorming assistance, automated scheduling, intelligent reminders, and personalized suggestions.</p>
                <p><strong>Popular AI Assistants:</strong> Creer Bot, ChatGPT, Google Bard, Microsoft Copilot. These AI tools optimize work efficiency and help users stay on top of tasks.</p>
                <p>By integrating AI into daily routines, users can minimize distractions, automate repetitive tasks, and enhance time management effortlessly.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="footer fs-5 text-light  text-center p-4" style={{backgroundColor:'#1e192b'}}>
          <div className="container">
            <ul className="list-inline mb-3">
              <li className="list-inline-item me-3">
                <Link className="nav-link hover-effect" to="/">Home</Link>
              </li>
              <li className="list-inline-item me-3">
                <Link className="nav-link hover-effect" to="/login">Login</Link>
              </li>
              <li className="list-inline-item me-3">
                <a className="nav-link hover-effect" href="https://github.com/Mr-kiran56" target="_blank" rel="noopener noreferrer">Projects</a>
              </li>
              <li className="list-inline-item">
                <button className="nav-link hover-effect btn btn-link p-0" onClick={(e) => e.preventDefault()}>Contact</button>
              </li>
            </ul>

            <ul className="list-inline mb-3">
              <li className="list-inline-item me-3">
                <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="social-icon linkedin">
                  <i className="fab fa-linkedin"></i>
                </a>
              </li>
              <li className="list-inline-item me-3">
                <a href="https://codepen.io/" target="_blank" rel="noopener noreferrer" className="social-icon instagram">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li className="list-inline-item me-3">
                <a href="https://dev.to/" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <i className="fab fa-dev"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="https://github.com/Mr-kiran56" target="_blank" rel="noopener noreferrer" className="social-icon ">
                  <i className="fab fa-github"></i>
                </a>
              </li>
            </ul>

            <div className="copyright mb-2">
              <p>&copy; 2025 CreesTech. All rights reserved.</p>
            </div>
            <div className="credit">
              <p>Designed by <a className="hover-effect" href="https://github.com/Mr-kiran56">Kiran Punna</a></p>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default Intro;
