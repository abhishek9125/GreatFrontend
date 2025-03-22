import React, { useState } from 'react';
import ThankYou from './ThankYou';
import { FORM_DATA } from './constants';
import './styles.css';

function MultiStepForm() {

    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        password: ""
    })
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const prevStep = () => {
        setCurrentStep((prev) => prev - 1);
    }

    const nextStep = () => {
        setCurrentStep((prev) => prev + 1);
    }

    const handleSubmit = () => {
        setIsSubmitted(true);
    }

    return (
        <div className='form-container'>
            <div className='progress-bars'>
                {
                    FORM_DATA.map((step, index) => (
                        <div key={index} className={`step-indicator ${index === FORM_DATA.length - 1 ? 'last-indicator' : ''}`}>
                            <div
                                onClick={() => index < currentStep ? setCurrentStep(index) : null}
                                className={`step-bullet ${index === currentStep && !isSubmitted ? 'active' : ''} ${index < currentStep || (isSubmitted) ? 'completed' : ''}`}
                            >
                                {index + 1}
                            </div>
                            {
                                index < FORM_DATA.length - 1 &&
                                <div 
                                    className={`step-line ${index < currentStep || (isSubmitted) ? 'completed' : ''}`}
                                />
                            }
                        </div>
                    ))
                }
            </div>

            {
                isSubmitted ?
                <ThankYou />
                : 
                <form>
                    <h2>{FORM_DATA[currentStep].title}</h2>
                    {FORM_DATA[currentStep].fields.map((field) => (
                        <div key={field.name} className='form-field'>
                            <label htmlFor={field.name}>{field.label}</label>
                            <input 
                                type={field.type}
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                            />
                        </div>
                    ))}

                    <div className='form-buttons'>
                        {
                            currentStep > 0 &&
                            <button type='button' onClick={prevStep} className='btn-prev'>
                                Previous
                            </button>
                        }
                        {
                            currentStep < FORM_DATA.length - 1 ?
                            <button type='button' onClick={nextStep} className='btn-next'>
                                Next
                            </button> :
                            <button type='button' onClick={handleSubmit} className='btn-submit'>
                                Submit
                            </button>
                        }
                    </div>
                </form>
            }

        </div>
    )
}

export default MultiStepForm