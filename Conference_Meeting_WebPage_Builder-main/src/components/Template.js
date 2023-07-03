import React, { useContext, useEffect, useState } from "react";
import formContext from "../context/forms/formContext";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Template = (props) => {
  const context = useContext(formContext);
  const { forms, getForms } = context;
  const [queries, setQueries] = useState({ question: "", answer: "" });
  let navigate = useNavigate();

  const onChange = (val) => {
    setQueries({ ...queries, [val.target.name]: val.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: queries.question,
        answer: queries.answer,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      //save the authToken
      localStorage.setItem("token", json.authToken);
      props.showAlert("logged in successfully", "success");
      navigate("/formpage");
      //redirect
    } else {
      props.showAlert("Invalid credentials", "danger");
    }
  };
  const { id } = useParams();
  useEffect(() => {
    getForms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredForm = forms.find((form) => form._id === id);

  return (
    <div className="container">
      <h3 className="mt-4 mb-4">This is the Template Page</h3>
      {filteredForm && (
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">{filteredForm.title}</h2>
            <p className="card-text">Date and Time: {filteredForm.dateTime}</p>
            <p className="card-text">Location: {filteredForm.location}</p>
            <p className="card-text">Description: {filteredForm.description}</p>
            <p className="card-text">Speakers: {filteredForm.speakers}</p>
            <p className="card-text">
              Registration Info: {filteredForm.registrationInfo}
            </p>
            <p className="card-text">
              Contact Info: {filteredForm.contactInfo}
            </p>
            <p className="card-text">
              Additional Resources: {filteredForm.additionalResources}
            </p>
            <img src={filteredForm.image} alt="Event" className="img-fluid" />
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group mt-4">
          <label htmlFor="query">Queries:</label>
          <textarea
            className="form-control"
            id="query"
            name="question" // Updated name attribute to "question"
            placeholder="Enter your query"
            value={queries.question}
            onChange={onChange}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Template;
