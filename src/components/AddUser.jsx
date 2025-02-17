import React, {useEffect, useState} from 'react'
import { useTranslation } from 'react-i18next';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'
import { useForm, Controller } from 'react-hook-form';
import { check_email } from '../utils/validation';

function AddUser(props) {
    const { t } = useTranslation();
    const { register, handleSubmit, watch, formState: { errors }, setValue, trigger, control, reset } = useForm();

    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const onSubmit = async (data) => {

        // data.preventDefault();

        // console.log(data);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)  // Send the whole form data
        };
        
        fetch('http://192.168.0.205:5001/api/contacts/add_contact', requestOptions)
            .then(response => response.json())
            .then((data) => {
                if(data.title == "done"){
                    props.switch.toaster("success", data.message);
                    reset();
                    setValue("phone_number", null); 
                    setValue("countrycode", null);
                    trigger("phone_number");
                } else {
                    props.switch.toaster("error", data.message);
                }
                // console.log("response data", data);
                // setResponseData(data);
            })
            .catch((error) => {
                if(data.title == "error"){
                    props.switch.toaster("error", data.message);
                }
                console.error("Error", error);
            });

        setIsSubmitting(true);
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000));
            // console.log("Form submitted");
        } catch (error) {
            // console.error("Submission failed");
            console.error("Timeout error:", error);
        } finally {
            setIsSubmitting(false);
        }

    };

    return (
        <>
            <div className="content">
                <div className="m-4 mb-8">
                    <form id="add_contact_form" onSubmit={handleSubmit(onSubmit)}>
                        <h4 className='heading'>{t('add_contact')}</h4>
                        <div className="form">
                            <label className='inputLabel'>{t('name')}</label>
                            <input {...register("full_name" , {required: true})} className="input" />
                                {errors.full_name && <span className="red_text">Please Enter Your Name</span>}
                            <label className='inputLabel'>{t('gender')}</label>
                            <select className="input" {...register("gender")}>
                                <option value="male">male</option>
                                <option value="female">female</option>
                                <option value="other">other</option>
                            </select>
                            
                            <label className="">Date Of Birth</label>
                            <input {...register("dob")} type="date" className="input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            
                            <label>{t('phone_number')}</label>
                           
                            <Controller
                                name="phone_number"
                                control={control}
                                rules={{
                                    required: "Phone number is required",
                                    validate: (value) => value.length > 0 || "Invalid phone number",
                                }}
                                inputProps={{
                                    id: 'contact_number'
                                }}
                                render={({ field }) => (
                                    <PhoneInput
                                        inputClass='numberInput' 
                                        className="" 
                                        country="in"
                                        onChange={(value, country) => {
                                            const numberwithoutcode =  value.replace(`${country.dialCode}`, "");
                                            const countryCode = country.dialCode.startsWith("+") ? country.dialCode : `+${country.dialCode}`;
                                            // setValue("phone_number", numberwithoutcode , {shouldValidate: true});
                                            setValue("phone_number", numberwithoutcode , {shouldValidate: true});
                                            setValue("contrycode", countryCode , {shouldValidate: true});
                                            trigger("phone_number");
                                        }}
                                        inputProps={{
                                            id: 'contact_number'
                                        }}
                                    />
                                )}
                            />
                            {errors.phone_number && <span className="red_text">Please Enter Phone Number</span>}
                            
                            <label>{t('email')}</label>
                            <input {...register("email", {required: true, validate: check_email,})} placeholder='abcdef@gmail.com' className="input" />
                            {errors.email && <span className="red_text">Please Enter Email Address</span>}
                            
                            <label>{t('address')}</label>
                            <textarea {...register("address")} className="input"></textarea>
                            
                            <div className='flex justify-center mt-5'>
                                <button className='submitButton' type="submit">
                                    {isSubmitting ? "Submitting..." : "Submit"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddUser