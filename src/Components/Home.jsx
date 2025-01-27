import React from 'react';
import { useNavigate } from 'react-router-dom';
import formData from '../JSON/formData.json';

const Home = ({ triggerCounter }) => {
  const navigate = useNavigate();

  const handleStart = (formId) => {
    triggerCounter();
    navigate(`/form/${formId}`); 
  };

  console.log(formData);

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4 mt-5">Survey</h1>
      <div className="row">
        {formData.map((data, index) => (
          <div
            key={data.formId}
            className="col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-4"
          >
            <div className="card shadow h-100">
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title text-center">{data.formName}</h5>
                <button
                  className="btn btn-primary mt-3 w-100"
                  onClick={() => handleStart(index)}
                >
                  Start
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;




