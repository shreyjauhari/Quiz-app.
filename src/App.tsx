import { useState } from 'react';
import BackgroundAnimation from './components/BackgroundAnimation';
import Quiz from './components/Quiz';
import './styles/animation.css';

function App() {
  const [showQuiz, setShowQuiz] = useState(false);

  return (
    <div className="min-h-screen">
      <BackgroundAnimation />
      
      <div className="container relative z-10">
        <nav className="w-full flex justify-between px-10 h-[100px] items-center">
          <a href="/" className="no-underline">
            <h1 className="text-[2.6em] text-white relative cursor-pointer pointer-events-auto tracking-[4px]">
              <span className="text-[#c513cb]">Google </span>
              <span className="text-[#c513cb]">Developers</span>
              <span className="text-[#c513cb]"> Group</span>
            </h1>
          </a>
          
          <ul className="flex">
            <li className="relative list-none text-[1.5em] font-normal px-[18px] py-3 cursor-pointer pointer-events-auto overflow-hidden text-white hover:text-[#ff006f] after:content-[''] after:absolute after:bottom-[5px] after:w-0 after:h-[3px] after:left-1/2 after:bg-[#00bfff] after:transform after:-translate-x-1/2 after:transition-[0.3s] hover:after:w-[80%]">
              Contact us
            </li>
          </ul>
        </nav>

        {!showQuiz ? (
          <section className="flex justify-center items-center h-[calc(100vh-100px)] text-center">
            <div className="textBox">
              <h1 className="text-[3.4em]">
                <span className="text-[#fbf8f8] text-[5em]">QuIz</span>
              </h1>
              <br />
              <p className="text-[2.2em] text-white">Test Your Knowledge, Unlock Your Potential!</p>
              <button 
                onClick={() => setShowQuiz(true)}
                className="homeBtn font-['Poppins'] px-[18px] py-2 my-4 mx-3 text-[26px] bg-transparent text-[#f8f8f8] outline-none border-[3px] border-solid border-[#f8f8f8] rounded pointer-events-auto transition-[0.3s] font-semibold hover:bg-[#f8f8f8] hover:text-black"
              >
                Start QuIz
              </button>
            </div>
          </section>
        ) : (
          <Quiz />
        )}
      </div>
    </div>
  );
}

export default App;