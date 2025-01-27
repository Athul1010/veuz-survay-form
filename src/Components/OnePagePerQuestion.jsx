import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import formData from "../JSON/formData.json";
import { useParams } from "react-router-dom";


const OnePagePerQuestion = () => {
  const { formId } = useParams();
  const form = formData[formId];
  const questions = form?.fields;
  const [answers, setAnswers] = useState({});
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [errors, setErrors] = useState({});

  const handleChange = (fieldId, value) => {
    setAnswers({
      ...answers,
      [fieldId]: value,
    });
  };

  const validateInput = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const value = answers[currentQuestion.fieldId] || '';
    const newErrors = {};

    // Validate based on the question type
    if (!value) {
      newErrors[currentQuestion.fieldId] = 'This field is required.';
    } else if (currentQuestion.type === 'textbox' && !/^[A-Za-z\s]+$/.test(value)) {
      newErrors[currentQuestion.fieldId] = 'Only letters and spaces are allowed.';
    } else if (currentQuestion.type === 'email' && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
      newErrors[currentQuestion.fieldId] = 'Please enter a valid email address.';
    } 

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateInput()) {
      setCurrentQuestionIndex((prevIndex) => Math.min(prevIndex + 1, questions.length - 1));
    }
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleSubmit = () => {
    if (validateInput()) {
      console.log('Selected Answers:', answers);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-xl-6 col-lg-8 col-md-10 col-sm-12">
          <div className="card shadow-sm mt-5">
            <div className="card-body">
              <h2 className="text-center mb-4">{currentQuestion.label}</h2>
              {currentQuestion.type === 'textbox' && (
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder={currentQuestion.placeholder}
                  onChange={(e) => handleChange(currentQuestion.fieldId, e.target.value)}
                  required
                />
              )}
              {currentQuestion.type === 'email' && (
                <input
                  type="email"
                  className="form-control mb-3"
                  placeholder={currentQuestion.placeholder}
                  onChange={(e) => handleChange(currentQuestion.fieldId, e.target.value)}
                  required
                />
              )}
              {currentQuestion.type === 'date' && (
                <input
                  type="date"
                  className="form-control mb-3"
                  onChange={(e) => handleChange(currentQuestion.fieldId, e.target.value)}
                  required
                />
              )}
              {currentQuestion.type === 'radio' &&
                currentQuestion.options.map((option) => (
                  <div className="form-check mb-2" key={option.id}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name={currentQuestion.fieldId}
                      value={option.label}
                      onChange={() => handleChange(currentQuestion.fieldId, option.label)}
                      required
                    />
                    <label className="form-check-label">{option.label}</label>
                  </div>
                ))}
              {currentQuestion.type === 'checkbox' &&
                currentQuestion.options.map((option) => (
                  <div className="form-check mb-2" key={option.id}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name={currentQuestion.fieldId}
                      value={option.label}
                      onChange={(e) => {
                        const currentAnswers = answers[currentQuestion.fieldId] || [];
                        if (e.target.checked) {
                          handleChange(currentQuestion.fieldId, [...currentAnswers, option.label]);
                        } else {
                          handleChange(
                            currentQuestion.fieldId,
                            currentAnswers.filter((item) => item !== option.label)
                          );
                        }
                      }}
                      required
                    />
                    <label className="form-check-label">{option.label}</label>
                  </div>
                ))}
              {currentQuestion.type === 'selectbox' && (
                <select
                  className="form-select mb-3"
                  onChange={(e) => handleChange(currentQuestion.fieldId, e.target.value)}
                  required={currentQuestion.required}
                >
                  <option value="">{currentQuestion.placeholder}</option>
                  {currentQuestion.options.map((option) => (
                    <option key={option.id} value={option.label}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}
              {currentQuestion.type === 'textarea' && (
                <textarea
                  className="form-control mb-3"
                  placeholder={currentQuestion.placeholder}
                  onChange={(e) => handleChange(currentQuestion.fieldId, e.target.value)}
                  required={currentQuestion.required}
                />
              )}
              {errors[currentQuestion.fieldId] && (
                <div className="text-danger mt-2">{errors[currentQuestion.fieldId]}</div>
              )}
              <div className="d-flex justify-content-between">
                <button
                  className="btn btn-secondary"
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                >
                  Previous
                </button>
                {currentQuestionIndex === questions.length - 1 ? (
                  <button className="btn btn-primary" onClick={handleSubmit}>
                    Submit
                  </button>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={handleNext}
                    disabled={currentQuestionIndex === questions.length - 1}
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnePagePerQuestion;

