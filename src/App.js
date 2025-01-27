import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Countdown from './Components/Countdown';
import Home from './Components/Home';
import DetailsOne from './Components/DetailsOne';
import TypeList from './Components/TypeList';
import AllQuestions from './Components/AllQuestions';
import OnePagePerSection from './Components/OnePagePerSection';
import OnePagePerQuestion from './Components/OnePagePerQuestion';

function App() {
  const [start, setStart] = useState(false);
  const [reset, setReset] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); 
  const [isTimeout, setIsTimeout] = useState(false);

  useEffect(() => {
    let timer;

    if (start && timeLeft > 0) {
      setIsTimeout(false);
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setIsTimeout(true);
            
            window.location.reload();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [start, timeLeft]);

  const triggerCounter = () => {
    setTimeLeft(300); 
    setStart(true); 
    setIsTimeout(false); 
    setReset(true); 
  };

  return (
    <BrowserRouter>
      <Countdown start={start} reset={reset} timeLeft={timeLeft} />
      {isTimeout && (
        <div className="fixed-top d-flex justify-content-center align-items-center bg-danger text-white p-3">
          <h2>Timeout!</h2>
        </div>
      )}
      <Routes>
        <Route path="/" element={<Home triggerCounter={triggerCounter} />} />
        <Route path="/form/:formId" element={<DetailsOne />} />
        <Route path="/type-text/:formId" element={<TypeList />} />
        <Route path="/all-questions/:formId" element={<AllQuestions />} />
        <Route path="/one-page-per-section/:formId" element={<OnePagePerSection />} />
        <Route path="/one-page-per-question/:formId" element={<OnePagePerQuestion />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

