import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import DetailsOne from './Components/DetailsOne';
import TypeList from './Components/TypeList';
import AllQuestions from './Components/AllQuestions';
import OnePagePerSection from './Components/OnePagePerSection';
import OnePagePerQuestion from './Components/OnePagePerQuestion';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/form/:formId" element={<DetailsOne/>}/>
        <Route path='/type-text/:formId' element={<TypeList/>} />
        <Route path="/all-questions/:formId" element={<AllQuestions/>} />
        <Route path="/one-page-per-section/:formId" element={<OnePagePerSection />} />
        <Route path="/one-page-per-question/:formId" element={<OnePagePerQuestion />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
