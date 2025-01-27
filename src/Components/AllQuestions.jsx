// import React, { useState } from 'react';
// import formData from "../JSON/formData.json";
// import { useParams } from 'react-router-dom';

// const AllQuestions = () => {
//     const { formId } = useParams();
//     const form = formData[formId];
//     const questions = form?.fields;
//     const [answers, setAnswers] = useState({});


//     const handleChange = (fieldId, value) => {
//         setAnswers({
//             ...answers,
//             [fieldId]: value,
//         });
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         console.log('Selected Answers:', answers);
//     };

//     return (
//         <div className="container my-4">
//             <h2 className="text-center mb-4">All Questions</h2>
//             <form onSubmit={handleSubmit} className="row">
//                 {questions.map((question, index) => (
//                     <div key={question.fieldId} className="col-12 col-md-6 mb-4">
//                         <div className="card shadow-sm p-3 h-100">
//                             <label className="form-label fw-bold">{question.label}</label>
//                             {question.type === 'textbox' && (
//                                 <input
//                                     type="text"
//                                     className="form-control"
//                                     placeholder={question.placeholder}
//                                     onChange={(e) => handleChange(question.fieldId, e.target.value)}
//                                     required={question.required}
//                                 />
//                             )}
//                             {question.type === 'email' && (
//                                 <input
//                                     type="email"
//                                     className="form-control"
//                                     placeholder={question.placeholder}
//                                     onChange={(e) => handleChange(question.fieldId, e.target.value)}
//                                     required={question.required}
//                                 />
//                             )}
//                             {question.type === 'date' && (
//                                 <input
//                                     type="date"
//                                     className="form-control"
//                                     onChange={(e) => handleChange(question.fieldId, e.target.value)}
//                                     required={question.required}
//                                 />
//                             )}
//                             {question.type === 'radio' && (
//                                 <div>
//                                     {question.options.map((option) => (
//                                         <div key={option.id} className="form-check">
//                                             <input
//                                                 className="form-check-input"
//                                                 type="radio"
//                                                 name={question.fieldId}
//                                                 value={option.label}
//                                                 onChange={() => handleChange(question.fieldId, option.label)}
//                                                 required={question.required}
//                                             />
//                                             <label className="form-check-label">{option.label}</label>
//                                         </div>
//                                     ))}
//                                 </div>
//                             )}
//                             {question.type === 'checkbox' && (
//                                 <div>
//                                     {question.options.map((option) => (
//                                         <div key={option.id} className="form-check">
//                                             <input
//                                                 className="form-check-input"
//                                                 type="checkbox"
//                                                 name={question.fieldId}
//                                                 value={option.label}
//                                                 required={question.required}
//                                                 onChange={(e) => {
//                                                     const currentAnswers = answers[question.fieldId] || [];
//                                                     if (e.target.checked) {
//                                                         handleChange(question.fieldId, [...currentAnswers, option.label]);
//                                                     } else {
//                                                         handleChange(
//                                                             question.fieldId,
//                                                             currentAnswers.filter((item) => item !== option.label)
//                                                         );
//                                                     }
//                                                 }}
//                                             />
//                                             <label className="form-check-label">{option.label}</label>
//                                         </div>
//                                     ))}
//                                 </div>
//                             )}
//                             {question.type === 'selectbox' && (
//                                 <select
//                                     className="form-select"
//                                     required={question.required}
//                                     onChange={(e) => handleChange(question.fieldId, e.target.value)}
//                                 >
//                                     <option value="">{question.placeholder}</option>
//                                     {question.options.map((option) => (
//                                         <option key={option.id} value={option.label}>
//                                             {option.label}
//                                         </option>
//                                     ))}
//                                 </select>
//                             )}
//                             {question.type === 'textarea' && (
//                                 <textarea
//                                     className="form-control"
//                                     required={question.required}
//                                     placeholder={question.placeholder}
//                                     onChange={(e) => handleChange(question.fieldId, e.target.value)}
//                                 />
//                             )}
//                         </div>
//                     </div>
//                 ))}
//                 <div className="col-12 text-center mt-4">
//                     <button type="submit" className="btn btn-primary px-5">
//                         Submit
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default AllQuestions;




import React, { useState } from 'react';
import formData from "../JSON/formData.json";
import { useParams } from 'react-router-dom';

const AllQuestions = () => {
    const { formId } = useParams();
    const form = formData[formId];
    const questions = form?.fields;
    const [answers, setAnswers] = useState({});
    const [validationErrors, setValidationErrors] = useState({});

    const handleChange = (fieldId, value) => {
        setAnswers({
            ...answers,
            [fieldId]: value,
        });
        // Clear any existing validation error for the field
        setValidationErrors({
            ...validationErrors,
            [fieldId]: "",
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        let errors = {};
        let isValid = true;

        // Email regex pattern
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Check if all fields are filled/selected for different types
        questions.forEach((question) => {
            // Validate textbox field
            if (question.type === 'textbox' && !answers[question.fieldId]) {
                errors[question.fieldId] = 'This field is required';
                isValid = false;
            }

            // Validate email field with regex
            if (question.type === 'email') {
                if (!answers[question.fieldId]) {
                    errors[question.fieldId] = 'This field is required';
                    isValid = false;
                } else if (!emailRegex.test(answers[question.fieldId])) {
                    errors[question.fieldId] = 'Please enter a valid email';
                    isValid = false;
                }
            }

            // Validate selectbox field
            if (question.type === 'selectbox' && !answers[question.fieldId]) {
                errors[question.fieldId] = 'This field is required';
                isValid = false;
            }

            // Validate textarea field
            if (question.type === 'textarea' && !answers[question.fieldId]) {
                errors[question.fieldId] = 'This field is required';
                isValid = false;
            }

            // Validate checkbox field
            if (question.type === 'checkbox' && (!answers[question.fieldId] || answers[question.fieldId].length === 0)) {
                errors[question.fieldId] = 'This field is required';
                isValid = false;
            }

            // Validate radio button field
            if (question.type === 'radio' && !answers[question.fieldId]) {
                errors[question.fieldId] = 'This field is required';
                isValid = false;
            }
        });

        if (isValid) {
            console.log('Selected Answers:', answers);
        } else {
            setValidationErrors(errors);
        }
    };

    return (
        <div className="container my-4">
            <h2 className="text-center mb-4">All Questions</h2>
            <form onSubmit={handleSubmit} className="row">
                {questions.map((question, index) => (
                    <div key={question.fieldId} className="col-12 col-md-6 mb-4">
                        <div className="card shadow-sm p-3 h-100">
                            <label className="form-label fw-bold">{question.label}</label>
                            {question.type === 'textbox' && (
                                <>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder={question.placeholder}
                                        onChange={(e) => handleChange(question.fieldId, e.target.value)}
                                    />
                                    {validationErrors[question.fieldId] && (
                                        <div className="text-danger">{validationErrors[question.fieldId]}</div>
                                    )}
                                </>
                            )}
                            {question.type === 'email' && (
                                <>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder={question.placeholder}
                                        onChange={(e) => handleChange(question.fieldId, e.target.value)}
                                    />
                                    {validationErrors[question.fieldId] && (
                                        <div className="text-danger">{validationErrors[question.fieldId]}</div>
                                    )}
                                </>
                            )}
                            {question.type === 'date' && (
                                <input
                                    type="date"
                                    className="form-control"
                                    onChange={(e) => handleChange(question.fieldId, e.target.value)}
                                />
                            )}
                            {question.type === 'radio' && (
                                <div>
                                    {question.options.map((option) => (
                                        <div key={option.id} className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name={question.fieldId}
                                                value={option.label}
                                                onChange={() => handleChange(question.fieldId, option.label)}
                                            />
                                            <label className="form-check-label">{option.label}</label>
                                        </div>
                                    ))}
                                    {validationErrors[question.fieldId] && (
                                        <div className="text-danger">{validationErrors[question.fieldId]}</div>
                                    )}
                                </div>
                            )}
                            {question.type === 'checkbox' && (
                                <div>
                                    {question.options.map((option) => (
                                        <div key={option.id} className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                name={question.fieldId}
                                                value={option.label}
                                                onChange={(e) => {
                                                    const currentAnswers = answers[question.fieldId] || [];
                                                    if (e.target.checked) {
                                                        handleChange(question.fieldId, [...currentAnswers, option.label]);
                                                    } else {
                                                        handleChange(
                                                            question.fieldId,
                                                            currentAnswers.filter((item) => item !== option.label)
                                                        );
                                                    }
                                                }}
                                            />
                                            <label className="form-check-label">{option.label}</label>
                                        </div>
                                    ))}
                                    {validationErrors[question.fieldId] && (
                                        <div className="text-danger">{validationErrors[question.fieldId]}</div>
                                    )}
                                </div>
                            )}
                            {question.type === 'selectbox' && (
                                <>
                                    <select
                                        className="form-select"
                                        onChange={(e) => handleChange(question.fieldId, e.target.value)}
                                    >
                                        <option value="">{question.placeholder}</option>
                                        {question.options.map((option) => (
                                            <option key={option.id} value={option.label}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    {validationErrors[question.fieldId] && (
                                        <div className="text-danger">{validationErrors[question.fieldId]}</div>
                                    )}
                                </>
                            )}
                            {question.type === 'textarea' && (
                                <>
                                    <textarea
                                        className="form-control"
                                        placeholder={question.placeholder}
                                        onChange={(e) => handleChange(question.fieldId, e.target.value)}
                                    />
                                    {validationErrors[question.fieldId] && (
                                        <div className="text-danger">{validationErrors[question.fieldId]}</div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                ))}
                <div className="col-12 text-center mt-4">
                    <button type="submit" className="btn btn-primary px-5">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AllQuestions;
