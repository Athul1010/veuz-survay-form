// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import formData from "../JSON/formData.json";

// const OnePagePerSection = () => {
//     const { formId } = useParams();
//     const form = formData[formId];
//     const questions = form?.fields;
//     const sections = [...new Set(questions.map(q => q.sectionId))];
//     const [answers, setAnswers] = useState({});

//     const handleChange = (fieldId, value) => {
//         setAnswers({
//             ...answers,
//             [fieldId]: value,
//         });
//     };

//     const handleSubmit = () => {
//         console.log('Selected Answers:', answers);
//     };

//     return (
//         <div className="container">
//             {sections.map(sectionId => (
//                 <div key={sectionId} className="mb-4">
//                     <h2 className='text-center'>Section {sectionId}</h2>
//                     <div className="p-3 mt-3">
//                         <div className="row justify-content-center">
//                             {questions.filter(q => q.sectionId === sectionId).map((question) => (
//                                 <div key={question.fieldId} className="col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-3">
//                                     <div className="card p-3 border">
//                                         <label>{question.label}</label>
//                                         {question.type === 'textbox' && (
//                                             <input
//                                                 type="text"
//                                                 className="form-control"
//                                                 placeholder={question.placeholder}
//                                                 onChange={(e) => handleChange(question.fieldId, e.target.value)}
//                                             />
//                                         )}
//                                         {question.type === 'email' && (
//                                             <input
//                                                 type="email"
//                                                 className="form-control"
//                                                 placeholder={question.placeholder}
//                                                 onChange={(e) => handleChange(question.fieldId, e.target.value)}
//                                             />
//                                         )}
//                                         {question.type === 'date' && (
//                                             <input
//                                                 type="date"
//                                                 className="form-control"
//                                                 onChange={(e) => handleChange(question.fieldId, e.target.value)}
//                                             />
//                                         )}
//                                         {question.type === 'radio' && question.options.map(option => (
//                                             <div key={option.id}>
//                                                 <input
//                                                     type="radio"
//                                                     name={question.fieldId}
//                                                     value={option.label}
//                                                     onChange={() => handleChange(question.fieldId, option.label)}
//                                                 />
//                                                 <label>{option.label}</label>
//                                             </div>
//                                         ))}
//                                         {question.type === 'checkbox' && question.options.map(option => (
//                                             <div key={option.id}>
//                                                 <input
//                                                     type="checkbox"
//                                                     name={question.fieldId}
//                                                     value={option.label}
//                                                     onChange={(e) => {
//                                                         const currentAnswers = answers[question.fieldId] || [];
//                                                         if (e.target.checked) {
//                                                             handleChange(question.fieldId, [...currentAnswers, option.label]);
//                                                         } else {
//                                                             handleChange(question.fieldId, currentAnswers.filter(item => item !== option.label));
//                                                         }
//                                                     }}
//                                                 />
//                                                 <label>{option.label}</label>
//                                             </div>
//                                         ))}
//                                         {question.type === 'selectbox' && (
//                                             <select
//                                                 className="form-control"
//                                                 onChange={(e) => handleChange(question.fieldId, e.target.value)}
//                                             >
//                                                 <option value="">{question.placeholder}</option>
//                                                 {question.options.map(option => (
//                                                     <option key={option.id} value={option.label}>{option.label}</option>
//                                                 ))}
//                                             </select>
//                                         )}
                                        // {question.type === 'textarea' && (
                                        //     <textarea
                                        //         className="form-control"
                                        //         placeholder={question.placeholder}
                                        //         onChange={(e) => handleChange(question.fieldId, e.target.value)}
                                        //     />
                                        // )}
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             ))}
//             <div className="text-center mt-4">
//                 <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
//             </div>
//         </div>
//     );
// };

// export default OnePagePerSection;





import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import formData from "../JSON/formData.json";

const OnePagePerSection = () => {
    const { formId } = useParams();
    const form = formData[formId];
    const questions = form?.fields;
    const sections = [...new Set(questions.map(q => q.sectionId))];
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

    const handleSubmit = () => {
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
        <div className="container">
            {sections.map(sectionId => (
                <div key={sectionId} className="mb-4">
                    <h2 className='text-center'>Section {sectionId}</h2>
                    <div className="p-3 mt-3">
                        <div className="row justify-content-center">
                            {questions.filter(q => q.sectionId === sectionId).map((question) => (
                                <div key={question.fieldId} className="col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-3">
                                    <div className="card p-3 border">
                                        <label>{question.label}</label>
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
                                            <>
                                                {question.options.map(option => (
                                                    <div key={option.id}>
                                                        <input
                                                            type="radio"
                                                            name={question.fieldId}
                                                            value={option.label}
                                                            onChange={() => handleChange(question.fieldId, option.label)}
                                                        />
                                                        <label>{option.label}</label>
                                                    </div>
                                                ))}
                                                {validationErrors[question.fieldId] && (
                                                    <div className="text-danger">{validationErrors[question.fieldId]}</div>
                                                )}
                                            </>
                                        )}
                                        {question.type === 'checkbox' && (
                                            <>
                                                {question.options.map(option => (
                                                    <div key={option.id}>
                                                        <input
                                                            type="checkbox"
                                                            name={question.fieldId}
                                                            value={option.label}
                                                            onChange={(e) => {
                                                                const currentAnswers = answers[question.fieldId] || [];
                                                                if (e.target.checked) {
                                                                    handleChange(question.fieldId, [...currentAnswers, option.label]);
                                                                } else {
                                                                    handleChange(question.fieldId, currentAnswers.filter(item => item !== option.label));
                                                                }
                                                            }}
                                                        />
                                                        <label>{option.label}</label>
                                                    </div>
                                                ))}
                                                {validationErrors[question.fieldId] && (
                                                    <div className="text-danger">{validationErrors[question.fieldId]}</div>
                                                )}
                                            </>
                                        )}
                                        {question.type === 'selectbox' && (
                                            <>
                                                <select
                                                    className="form-control"
                                                    onChange={(e) => handleChange(question.fieldId, e.target.value)}
                                                >
                                                    <option value="">{question.placeholder}</option>
                                                    {question.options.map(option => (
                                                        <option key={option.id} value={option.label}>{option.label}</option>
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
                        </div>
                    </div>
                </div>
            ))}
            <div className="text-center mt-4">
                <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};

export default OnePagePerSection;
