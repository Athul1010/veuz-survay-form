import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import formData from '../JSON/formData.json';

const DetailsOne = () => {
  const { formId } = useParams();
  const form = formData[formId];
  const initialFields = form.initialFields;
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Survey Answers:', formValues);
    navigate(`/type-text/${formId}`);
  };

  return (
    <div className="container py-5">
      <h1 className='text-center mb-4 mt-4'>Enter your personal details</h1>
      <form onSubmit={handleSubmit} className="row g-4">
        {initialFields.map((field) => (
          <div key={field.fieldId} className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
            <div className="mb-3">
              <label className="form-label">{field.label}</label>
              {field.type === 'textbox' && (
                <input
                  type="text"
                  className="form-control"
                  name={field.fieldId}
                  placeholder={field.placeholder}
                  required={field.required}
                  onChange={handleChange}
                />
              )}
              {field.type === 'email' && (
                <input
                  type="email"
                  className="form-control"
                  name={field.fieldId}
                  placeholder={field.placeholder}
                  required={field.required}
                  onChange={handleChange}
                />
              )}
              {field.type === 'date' && (
                <input
                  type="date"
                  className="form-control"
                  name={field.fieldId}
                  required={field.required}
                  onChange={handleChange}
                />
              )}
              {field.type === 'radio' && (
                field.options.map(option => (
                  <div key={option.id} className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      name={field.fieldId}
                      value={option.label}
                      onChange={handleChange}
                      required={field.required}
                    />
                    <label className="form-check-label">{option.label}</label>
                  </div>
                ))
              )}
              {field.type === 'selectbox' && (
                <select
                  className="form-select"
                  name={field.fieldId}
                  onChange={handleChange}
                  required={field.required}
                >
                  <option value="">{field.placeholder}</option>
                  {field.options.map(option => (
                    <option key={option.id} value={option.label}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}
              {field.type === 'checkbox' && (
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name={field.fieldId}
                    onChange={handleChange}
                    required={field.required}
                  />
                  <label className="form-check-label">{field.label}</label>
                </div>
              )}
              
            </div>
          </div>
        ))}
        <div className="col-12 text-center">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default DetailsOne;
