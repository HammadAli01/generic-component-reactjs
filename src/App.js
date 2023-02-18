import React,{useState,useEffect} from 'react';
import './App.css';
import axios from 'axios';
function App() {
  const [schema,setSchema]=useState([]);
  const [data,setData]=useState([]);

useEffect(()=>{ 
  //fetching data
  axios.get('https://mocki.io/v1/84954ef5-462f-462a-b692-6531e75c220d').then((response) => {
      console.log('result got is ',response.data);
      setSchema(response.data);
    }).catch(error => {
      console.log("error got while fetching data is ",error);
    });
},[]);
const handleSubmit=()=>{
  console.log("inputted data is => ",[data]);
 //submitting data
   axios.post('https://putsreq.com/RWhI8ht10y5kqfmemrML',[data]).then((response) => {
      console.log('result got is ',response.data);
    
    }).catch(error => {
      console.log("error got while fetching data is ",error);
    });
}
const handleChange=(e)=>{
  //handler for updating state in which all entered user data is stored
setData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
}
  return (
    <div className="App">
{schema.map((field,index)=>(
<div key={field.id}>
{field.type!=='radio'?<label>{field.label}: </label>:<legend>{field.legend}:</legend>}
{
  field.type==='text'||field.type==='email'?<input type={field.type} onChange={(e)=>{handleChange(e)}} name={field.name} required={field.required==1?true:false}/>:
  field.type==='tel'?<input type={field.type} onChange={(e)=>{handleChange(e)}} pattern='[0-9]{10}' name={field.name} required={field.required==1?true:false}/>:(
    
       field.options.map((radioitem)=>(
       <div key={radioitem.id}>
        <input 
         type={field.type} name={field.name} required={field.required==1?true:false}
          id={radioitem.id}
          value={radioitem.value}
         onChange={(e)=>{handleChange(e)}}
        />
        <label htmlFor={radioitem.id}>{radioitem.label}</label>
        </div>
       )) 
     )
}</div>
))
}


     <button onClick={()=>{handleSubmit()}}>Submit</button>
    </div>
  );
}

export default App;
