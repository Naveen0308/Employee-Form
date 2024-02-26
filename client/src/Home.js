import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Style.css';

function Home() {
  const [Ename, setEname] = useState('');
  const [Eid, setEid] = useState('');
  const [Edept, setEdept] = useState('');
  const [Edob, setEdob] = useState('');
  const [Egender, setEgender] = useState('');
  const [Edesign, setEdesign] = useState('');
  const [Esalary, setEsalary] = useState('');
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false); // State to track if no results found
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8081/')
      .then(res => {
        setData(res.data);
        setSearchResults(res.data); // Initialize search results with all data
      })
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (new Date(Edob) >= Date.now()) {
      alert("Employee DOB cannot be in the future");
      return;
    }
    navigate('/Homenew', {
      state: {
        Ename: Ename,
        Eid: Eid,
        Edept: Edept,
        Edob: Edob,
        Egender: Egender,
        Edesign: Edesign,
        Esalary: Esalary
      }
    });
  };

  const handleDelete = (Eid) => {
    axios.delete('http://localhost:8081/' + Eid)
      .then(res => { navigate('/') })
      .catch(err => console.log(err));
  };

  const handleUpdate = (d) => {
    navigate('/Update', { state: { data: d } });
  };

  const handleSearch = () => {
    const results = data.filter(item =>
      item.Ename.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
    setNoResults(results.length === 0); // Set noResults to true if no matching results
  };

  const handleClear = () => {
    setSearchTerm('');
    setSearchResults(data); // Reset search results to all data
    setNoResults(false); // Reset noResults state
  };


  return (
    <div>
        <div className='form-container'>
                    <form onSubmit={handleSubmit}>
                        <h1>Enter Employee Details</h1>
                        <div className='inputs'>
                            <div className='name'>Employee_Name:</div>
                            <div classname='inputs'>
                                <input type='text' placeholder='Name:' maxLength={15} onChange={e => setEname(e.target.value)} required/>
                            </div>
                        </div>
                        <div className='inputs'>
                            <div className='name'>Employee_Id:</div>
                            <div classname='inputs'>
                                <input type='text' placeholder='Id:' onChange={e => setEid(e.target.value)} required/>
                            </div>
                        </div>
                        <div className='inputs'>
                            <div className='name'>Employee_Department:</div>
                            <div className='inputs'>
                                <select className='select-dropdown'value={Edept} onChange={e => setEdept(e.target.value)} required>
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
                            <div classname='inputs'>
                                <input type='date' onChange={e => setEdob(e.target.value)} required/>
                            </div>
                        </div>
                        <div className="inputs">
                            <div className="name">Employee_Gender</div>
                                    <input className="male" type="radio" name="Gender" value="Male" checked={Egender === "Male"} onClick={(e) => setEgender(e.target.value)} />
                                    <label className="Male-label">Male</label>

                            
                            
                                    <input className="female" name="Gender" type='radio' value="Female" checked={Egender === "Female"} onClick={(e) => setEgender(e.target.value)} />
                                         <label className="Female-label">Female</label>
                        
                        </div>

                        <div className='inputs'>
                            <div className='name'>Employee_Designation:</div>
                            <div classname='inputs'>
                                <input type='text' placeholder='Designation :' onChange={e => setEdesign(e.target.value)} required/>
                            </div>
                        </div>
                        <div className='inputs'>
                            <div className='name'>Employee_Salary:</div>
                            <div classname='inputs'>
                                <input type='text' placeholder='Salary:' onChange={e => setEsalary(e.target.value)} required/>
                            </div>
                        </div>


                        <div>
                            <button>Next</button>
                        </div>
                    </form>
                </div>
            <div>
            <div id="search-section">
        <label className='name1'>Search</label>
        <input
            type='search'
            placeholder='Search'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleClear}>Clear</button>
    </div>
            </div>
        <div className='table-container'>
            <div className='main'>
                <h1> Employee Details</h1>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Emp_Name</th>
                            <div></div>
                            <th>Emp_ID</th>
                            <div></div>
                            <th>Emp_Department</th>
                            <div></div>
                            <th>Emp_DOB</th>
                            <div></div>
                            <th>Emp_Gender</th>
                            <div></div>
                            <th>Emp_Designation</th>
                            <div></div>
                            <th>Emp_Salary</th>
                            <div></div>
                            <th>Emp_Address</th>
                            <div></div>
                            <th>Emp_Location</th>
                            <div></div>
                            <th>Emp_Pincode</th>
                            <div></div>
                            <th>Emp_Experience</th>
                            <div></div>
                            <th>Emp_Age</th>
                            <div></div>
                            <th>Delete</th>
                            <div></div>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {noResults ? (
                        <tr>
                            <td colSpan="7">No results found</td>
                        </tr>):(
                        searchResults.map( (d ,i) => (
                            <tr key={i}>
                                <td>{d.Ename}</td>
                                <div></div>
                                <td>{d.Eid}</td>
                                <div></div>
                                <td>{d.Edept}</td>
                                <div></div>
                                <td>{d.Edob}</td>
                                <div></div>
                                <td>{d.Egender}</td>
                                <div></div>
                                <td>{d.Edesign}</td>
                                <div></div>
                                <td>{d.Esalary}</td>
                                <div></div>
                                <td>{d.Eaddress}</td>
                                <div></div>
                                <td>{d.Elocation}</td>
                                <div></div>
                                <td>{d.Epincode}</td>
                                <div></div>
                                <td>{d.Eexperience}</td>
                                <div></div>
                                <td>{d.Eage}</td>
                                <div></div>
                                <td>
                                    <button onClick={e=>handleDelete(d.Eid)}>Delete</button>
                                </td>
                                <div></div>
                                <td>
                                    <button onClick={e=>handleUpdate(d)}>Update</button>
                                </td>
                            </tr>// 5 mins pathu vei gradening panniti  varen => ok
                        ))
                        )}

                    </tbody>
                </table>
            </div>
        </div> 
    </div>
  )
}
export default Home