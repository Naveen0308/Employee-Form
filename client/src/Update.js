import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './Style.css';

const Update = () => {
    const {state} = useLocation();
    const {data} = state;

    const [employee, setEmployee] = useState({
        Ename: data.Ename,
        Eid: data.Eid,
        Edept: data.Edept,
        Edob: data.Edob,
        Egender: data.Egender,
        Edesign: data.Edesign,
        Esalary: data.Esalary,
        Eaddress: data.Eaddress,
        Elocation: data.Elocation,
        Epincode: data.Epincode,
        Eexperience: data.Eexperience,
        Eage: data.Eage
    });

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8081/update/${id}`)
            .then(response => {
                const data = response.data;
                setEmployee(data);
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEmployee(prevEmployee => ({
            ...prevEmployee,
            [name]: value
        }));
    };
    

    const handleUpdate = (event) => {
        event.preventDefault();
        if(new Date(employee.Edob) >= Date.now()){
            alert("emp dob");
            return;
          }
        axios.post(`http://localhost:8081/update/${employee.Eid}`, employee)
            .then(res => {
                navigate('/');
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <div className='form-container'>
                <form onSubmit={handleUpdate}>
                    <h1>Update Employee Details</h1>
                    <div className='inputs'>
                        <div className='name'>Employee_Name:</div>
                        <div className='inputs'>
                            <input type='text' name='Ename' placeholder='Name:' value={employee.Ename} onChange={handleChange} required />
                        </div>
                    </div>
                    {/* <div className='inputs'>
                        <div className='name'>Employee_Id:</div>
                        <div className='inputs'>
                            <input type='text' name='Eid' placeholder='Id:' value={employee.Eid} onChange={handleChange} required />
                        </div>
                    </div> */}
                    <div className='inputs'>
                        <div className='name'>Employee_Department:</div>
                        <div className='inputs'>
                            <select className='select-dropdown' name='Edept' value={employee.Edept} onChange={handleChange} required>
                                <option value="">Select Department</option>
                                <option value="HR">HR</option>
                                <option value="Ceo">CEO</option>
                                <option value="Branch Manager">Branch Manager</option>
                                <option value="Finance Manager">Finance Manager</option>
                                <option value="Developer">Developer</option>
                                <option value="Tester">Tester</option>
                            </select>
                        </div>
                    </div>
                    <div className='inputs'>
                        <div className='name'>Employee_DOB:</div>
                        <div className='inputs'>
                            <input type='date' name='Edob' value={employee.Edob} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className='inputs'>
    <div className='name'>Employee Gender:</div>
    <div className='inputs'>
        <label>
            <input type='radio' name='Egender' value='Male' checked={employee.Egender === 'Male'} onChange={handleChange} />
            Male
        </label>
        <label>
            <input type='radio' name='Egender' value='Female' checked={employee.Egender === 'Female'} onChange={handleChange} />
            Female
        </label>
    </div>
</div>

                    <div className='inputs'>
                        <div className='name'>Employee_Designation:</div>
                        <div className='inputs'>
                            <input type='text' name='Edesign' placeholder='Designation :' value={employee.Edesign} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className='inputs'>
                        <div className='name'>Employee_Salary:</div>
                        <div className='inputs'>
                            <input type='text' name='Esalary' placeholder='Salary:' value={employee.Esalary} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className='inputs'>
                        <div className='name'>Employee_Address:</div>
                        <div className='inputs'>
                            <input type='text' name='Eaddress' placeholder='Address:' value={employee.Eaddress} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className='inputs'>
                        <div className='name'>Employee_Location:</div>
                        <div className='inputs'>
                            <input type='text' name='Elocation' placeholder='Location:' value={employee.Elocation} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className='inputs'>
                        <div className='name'>Employee_Pincode:</div>
                        <div className='inputs'>
                            <input type='text' name='Epincode' placeholder='Pincode:' value={employee.Epincode} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className='inputs'>
                        <div className='name'>Employee_Experience:</div>
                        <div className='inputs'>
                            <input type='text' name='Eexperience' placeholder='Experience :' value={employee.Eexperience} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className='inputs'>
                        <div className='name'>Employee_Age:</div>
                        <div className='inputs'>
                            <input type='text' name='Eage' placeholder='Age:' value={employee.Eage} onChange={handleChange} required />
                        </div>
                    </div>
                    <div>
                        <button>Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Update;
