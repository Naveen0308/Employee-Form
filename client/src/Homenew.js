import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import {useLocation, useNavigate} from'react-router-dom';
import './Style.css';

const Homenew = () => {
    const {state} = useLocation();
    const {Ename,Eid,Edept,Edob,Egender,Edesign,Esalary} = state;
    const [Eaddress, setEaddress] = useState('')
    const [Elocation, setElocation] = useState('')
    const [Epincode, setEpincode] = useState('')
    const [Eexperience, setEexperience] = useState('')
    const [Eage, setEage] = useState('')
    const navigate=useNavigate();

    // const [data,setData]=useState([]); submit click panitu console la paaru
    const handleSubmit = (event) =>{
        alert('Form Submitted Successfully');
        console.log(Eaddress,Elocation,Epincode,Eexperience,Eage,Ename,Eid,Edept,Edob,Egender,Edesign,Esalary);
        event.preventDefault();
        axios.post('http://localhost:8081/Homenew',{Ename,Eid,Edept,Edob,Egender,Edesign,Esalary,Eaddress,Elocation,Epincode,Eexperience,Eage})
        .then(res =>{
            navigate('/');
        })
        .catch(err => console.log(err));
    }
// update .js dhan andha file =. adhu ok but enga irundhu andha page ku navigate panra



  return (
    <div>
        <div className='form-container'>
                    <form onSubmit={handleSubmit}>
                        <h1>Enter Employee Details</h1>
                        <div className='inputs'>
                            <div className='name'>Employee_Address:</div>
                            <div classname='inputs'>
                                <input type='text' placeholder='Address:' onChange={e => setEaddress(e.target.value)} required/>
                            </div>
                        </div>
                        <div className='inputs'>
                            <div className='name'>Employee_Location:</div>
                            <div classname='inputs'>
                                <input type='text' placeholder='Location:' onChange={e => setElocation(e.target.value)} required/>
                            </div>
                        </div>

                        <div className='inputs'>
                            <div className='name'>Employee_Pincode:</div>
                            <div classname='inputs'>
                                <input type='text' placeholder='Pincode:' onChange={e => setEpincode(e.target.value)} required/>
                            </div>
                        </div>
                        

                        <div className='inputs'>
                            <div className='name'>Employee_Experience:</div>
                            <div classname='inputs'>
                                <input type='text' placeholder='Experience :' onChange={e => setEexperience(e.target.value)} required/>
                            </div>
                        </div>
                        <div className='inputs'>
                            <div className='name'>Employee_Age:</div>
                            <div classname='inputs'>
                                <input type='text' placeholder='Age:' onChange={e => setEage(e.target.value)} required/>
                            </div>
                        </div>
                        <div>
                            <button>Submit</button>
                        </div>
                    </form>
                </div>
    </div>
  )
}

export default Homenew