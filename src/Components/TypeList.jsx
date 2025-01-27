import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import formData from "../JSON/formData.json";

const TypeList = () => {
  const { formId } = useParams();
  const [selectedType, setSelectedType] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSelectedType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formId) {
      const selectedForm = formData[formId];
      if (selectedType === "all-question") {
        navigate(`/all-questions/${formId}`, {
          state: { questions: selectedForm.fields },
        });
      } else if (selectedType === "one-page-per-section") {
        navigate(`/one-page-per-section/${formId}`, {
          state: { questions: selectedForm.fields },
        });
      } else if (selectedType === "one-page-per-question") {
        navigate(`/one-page-per-question/${formId}`, {
          state: { questions: selectedForm.fields },
        });
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-xl-6 col-lg-7 col-md-8 col-sm-10">
          <div className="card shadow-sm p-4">
            <h2 className="text-center mb-4">Select Type of Listing</h2>
            <form onSubmit={handleSubmit}>
              {formData.map((form, index) => (
                <div className="form-check mb-3" key={index}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="typeOfListing"
                    id={`form-${index}`}
                    value={form.typeOfListing}
                    checked={selectedType === form.typeOfListing}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor={`form-${index}`}>
                    {form.typeOfListing}
                  </label>
                </div>
              ))}
              <button type="submit" className="btn btn-primary w-100 mt-3">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypeList;
