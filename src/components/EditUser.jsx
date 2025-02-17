import React, {useEffect, useState} from 'react'
import { useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useTranslation } from 'react-i18next';

const EditUser = (props) => {
    const { id } = useParams();
    const { register, handleSubmit, control, setValue, watch, trigger, formState: { errors } } = useForm();
    const [userData, setUserData] = useState(null);
    const { t } = useTranslation();
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const selectedGender = watch("gender", "");

    useEffect(() => {
        // Fetch user data from API or state
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://192.168.1.23:5001/api/contacts/${id}`);
                const data = await response.json();
                console.log(data.message[0]);
                setUserData(data.message[0]);
                let contact_data = data.message[0];
                console.log(contact_data);
                // Set form values
                if(contact_data){
                    Object.keys(contact_data).forEach(key => setValue(key, contact_data[key]));

                    setValue("phone_number", contact_data.phone_number || "", { shouldValidate: true });
                    setValue("contrycode", 
                        contact_data.contrycode?.startsWith("+") ? contact_data.contrycode : `+${contact_data.contrycode}`, { shouldValidate: true }
                    );
                }

            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        if (id) fetchUserData();
    }, [id, setValue]);

    const onSubmit = async (data) => {  // Pass data explicitly
        let request_options = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        };
    
        try {
            const response = await fetch(`http://192.168.1.23:5001/api/contacts/update_contact/${data.id}`, request_options);
            const response_data = await response.json();
    
            if (response_data.title === "Success") {
                props.switch.toaster("success", response_data.message);
            } else {
                props.switch.toaster("error", response_data.message);
            }
        } catch (error) {
            console.error("Error:", error); 
            props.switch.toaster("error", "Something went wrong!");
        }
    
        setIsSubmitting(true);
        
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
        } catch (error) {
            console.error("Timeout error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!userData) return <p>Loading...</p>;

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
                            <select defaultValue={selectedGender} className="input" {...register("gender")}>
                                <option value="male">male</option>
                                <option value="female">female</option>
                                <option value="other">other</option>
                            </select>
                            
                            <label className="">Date Of Birth</label>
                            <input {...register("dob")} type="date" className="input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            
                            <label>Phone Number</label>
                           
                            <Controller
                                name="phone_number"
                                control={control}
                                rules={{
                                    required: "Phone number is required",
                                    validate: (value) => value.length > 0 || "Invalid phone number",
                                }}
                                render={({ field }) => (
                                    <PhoneInput
                                        inputclassName="numberInput"
                                        country="in" 
                                        value={`${watch("contrycode", "+91")}${field.value || ""}`}
                                        onChange={(value, country) => {
                                            const numberWithoutCode = value.replace(`${country.dialCode}`, "").trim();
                                            const contrycode = country.dialCode.startsWith("+") ? country.dialCode : `+${country.dialCode}`;

                                            field.onChange(numberWithoutCode);
                                            setValue("contrycode", contrycode, { shouldValidate: true });

                                            trigger("phone_number");
                                        }}

                                        inputProps={{
                                            id: "contact_number",
                                        }}
                                    />
                                )}
                            />

                            {errors.phone_number && <span className="red_text">Please Enter Phone Number</span>}
                            
                            <label>Email</label>
                            <input {...register("email", {required: true})} placeholder='abcdef@gmail.com' className="input" />
                            {errors.email && <span className="red_text">Please Enter Email Address</span>}
                            
                            <label>Address</label>
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
    );
};

export default EditUser;
