import React,{useEffect} from 'react'
import Navbar from './navbar'
import { Outlet, Link } from "react-router-dom";
import { ReactDOM } from 'react';
import '../components/workers.css'
import {useRef,useState } from 'react';
import Reminder from '../components/home-reminder'
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker'
import Axios from "axios";
import { findAllInRenderedTree } from 'react-dom/test-utils';
import { v4 as uuid } from 'uuid';
export default function Workers() {
  const [Workers,setWorkers] = useState([])
  const [Name_edit,setName] = useState([])
  const [Surname_edit,setSurname] = useState([])
  const [Role_edit,setRole] = useState([])
  const [Birthdate_edit,setBirthdate] = useState([])
  const [Startdate_edit,setStartdate] = useState([])
  const [Status_edit,setStatus] = useState([])
  const [Id_edit,setId] = useState([])
  const [Index_edit,setIndex] = useState([])
  const [Pin_edit,setPin] = useState([])

  const funcget = ()=> {
    Axios.get("http://localhost:5000/workers").then((response) => {
          const ac = response.data
          setWorkers(ac)
            });
          }
      useEffect(()=> {
        funcget()
      },[])
      function addSubmit(e) {
        e.preventDefault()
        let valueof_name =  document.getElementById("add_name").value
        let valueof_birthdate =  document.getElementById("add_birthdate").value
        let valueof_startdate =  document.getElementById("add_startdate").value
        let valueof_surname =  document.getElementById("add_surname").value
        let valueof_role =  document.getElementById("add_role").value
        let valueof_pin = uuid().slice(2, 9)
        let valueof_status =  "Aktiv"
        document.getElementById("add_name").value=""
        document.getElementById("add_birthdate").value=""
        document.getElementById("add_startdate").value=""
        document.getElementById("add_surname").value=""
        document.getElementById("add_role").value=""
        let newArr = [...Workers]; 
        newArr.push({
          pin:valueof_pin,
          name:valueof_name,
          surname:valueof_surname,
          birthdate:valueof_birthdate,
          startdate:valueof_startdate,
          role:valueof_role,
          status:valueof_status
        })
        setWorkers(newArr)
        Axios.post("http://localhost:5000/newworker", {
          pin:valueof_pin,
          name:valueof_name,
          surname:valueof_surname,
          birthdate:valueof_birthdate,
          startdate:valueof_startdate,
          role:valueof_role,
          status:valueof_status
    })
      }
      function editSubmit(e) {
        e.preventDefault()
        const valueof_name =  document.getElementById("name").value
        const valueof_birthdate =  document.getElementById("birthdate").value
        const valueof_startdate =  document.getElementById("startdate").value
        const valueof_surname =  document.getElementById("surname").value
        const valueof_role =  document.getElementById("role").value
        const valueof_status =  document.getElementById("status").value
        const pin =  document.getElementById("pin").value
        const index_infunc = Number(document.getElementById("index").value)
        let newArr = [...Workers]; 
        newArr[index_infunc] = {
            pin:pin,
            name:valueof_name,
            surname:valueof_surname,
            birthdate:valueof_birthdate,
            startdate:valueof_startdate,
            role:valueof_role,
            status:valueof_status
        }
        setWorkers(newArr)
       Axios.put("http://localhost:5000/updateworker", {
          pin:pin,
          name:valueof_name,
          surname:valueof_surname,
          birthdate:valueof_birthdate,
          startdate:valueof_startdate,
          role:valueof_role,status:valueof_status        
        })
        
        /* */
        closediv()
      }
      const editworker = (kls,index) => {
        document.getElementById("div_main1").style.display="none"
        document.getElementById("div_main2").style.display="block"
        const kl = kls
        setName(kl.name)
        setSurname(kl.surname)
        setRole(kl.role)
        setBirthdate(kl.birthdate)
        setStartdate(kl.startdate)
        setStatus(kl.status)
          setIndex(index)
        setPin(kls.pin)
      }
      function exitworker(kl,index) {
        const kls = kl
        const indexofel = index
        let newArr = [...Workers]; 
        newArr[indexofel] = {
            pin:kls.pin,
            name:kls.name,
            surname:kls.surname,
            birthdate:kls.birthdate,
            startdate:kls.startdate,
            role:kls.role,
            status:"Deaktiv"
        }
        Axios.put("http://localhost:5000/updateworker", {
            pin:kls.pin,
            name:kls.name,
            surname:kls.surname,
            birthdate:kls.birthdate,
            startdate:kls.startdate,
            role:kls.role,
            status:"Deaktiv"   
        })
        setWorkers(newArr)
      }
      const closediv = ()=> {
        document.getElementById("div_main1").style.display="block"
        document.getElementById("div_main2").style.display="none"

      }
      function Tr(props) {
    const kl = props.value;
    const indexofel = props.index
    return (
<tr>
    <th scope="row"style={kl.status==="Deaktiv" ? {color:"red"} :null }>{kl.status}</th>
    <th >{kl.pin}</th>
    <td>{kl.name+" "+kl.surname}</td>
    <td>{kl.role}</td>
    <td>{kl.birthdate}</td>
    <td>{kl.startdate}</td>
    <td><i onClick={()=> editworker(kl,indexofel)} className="fas fa-pen"></i>
    <i onClick={()=> exitworker(kl,indexofel)} className="fas fa-sign-out-alt"></i>      
    </td>
  </tr>
    )
      }
  return (
    //  NAVBAR CHECK
    <>
        <Navbar page="b" />
    <div id="workersmain">
      <div id="div_main1">
<h2 id="headerh2">Əməkdaşlar</h2>
<div className='table-responsive'>
    <table className="table table-striped table-hover">
  <thead>
    <tr>
      <th scope="col">Status</th>
      <th scope="col">PIN</th>
      <th scope="col">Ad</th>
      <th scope="col">Vəzifəsi</th>
      <th scope="col">Doğum tarixi</th>
      <th scope="col">İşə başlama tarixi</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
{
  Workers.map((worker,index)=> {
    return (
    <Tr value={worker} key={uuid()} index={index} />
    )
})
}
   
  </tbody>
</table>
</div>
</div>
<div id='div_main2'style={{display:'none'}}>
<span id="close" onClick={()=>closediv()}>X</span>
<h2 id="headerh2">Redakte et</h2>
<div className="formdiv">
<form onSubmit={(e)=>editSubmit(e)} action=""style={{marginBottom:'10px'}}>
  <div className="form-row">
  <div className="form-group col-md-6">
      <label htmlFor="status">Status</label>
      <select defaultValue={Status_edit}  multiple={false} className="form-control" id="status">
        <option defaultValue="Aktiv">Aktiv</option>
        <option defaultValue="Deaktiv"selected={Status_edit == "Deaktiv"}>Deaktiv</option>
      </select>
    </div>
    <div className="form-group col-md-6">
      <label htmlFor="name">Ad</label>
      <input type="text" className="form-control" id="name" required defaultValue={Name_edit} placeholder="" />
    </div>
    <div className="form-group col-md-6">
      <label htmlFor="surname">Soyad</label>
      <input type="text" className="form-control" id="surname" required defaultValue={Surname_edit} placeholder="" />
    </div>
    <div className="form-group col-md-6">
      <label htmlFor="date">Vəzifəsi</label>
      <input type="text" className="form-control" id="role" required defaultValue={Role_edit} placeholder="" />
    </div>
    <div className="form-group col-md-6">
      <label htmlFor="birthdate">Doğum tarixi</label>
      <input type="text" className="form-control" maxLength="" defaultValue={Birthdate_edit} required id="birthdate" placeholder="dd-mm-yyyy" />
    </div>
    <div className="form-group col-md-6">
      <label htmlFor="workdate">İşə başlama tarixi</label>
      <input type="text" className="form-control" maxLength="" defaultValue={Startdate_edit} required id="startdate" placeholder="dd-mm-yyyy" />
    </div>
   
    <div className="form-group col-md-6"style={{display:"none"}}>
      <label htmlFor="workdate">INDEX</label>
      <input type="text" className="form-control" maxLength="" defaultValue={Index_edit} required id="index" placeholder="" />
    </div>
    <div className="form-group col-md-6"style={{display:"none"}}>
      <label htmlFor="workdate">INDEX</label>
      <input type="text" className="form-control" maxLength="" defaultValue={Pin_edit} required id="pin" placeholder="" />
    </div>
  </div>
   <button type="submit" className="btn btn-primary">Əlavə et</button>
</form>
</div>
</div>
<hr />
<h2 id="headerh2">Yeni əməkdaş</h2>

<div className="formdiv">
<form onSubmit={(e)=>addSubmit(e)} action=""style={{marginBottom:'10px'}}>
  <div className="form-row">
    <div className="form-group col-md-6">
      <label htmlFor="name">Ad</label>
      <input type="text" className="form-control" id="add_name" required defaultValue="" placeholder="" />
    </div>
    <div className="form-group col-md-6">
      <label htmlFor="surname">Soyad</label>
      <input type="text" className="form-control" id="add_surname" required defaultValue="" placeholder="" />
    </div>
    <div className="form-group col-md-6">
      <label htmlFor="add_role">Vəzifəsi</label>
      <input type="text" className="form-control" id="add_role" required defaultValue="" placeholder="" />
    </div>
    <div className="form-group col-md-6">
      <label htmlFor="add_birthdate">Doğum tarixi</label>
      <input type="text" className="form-control" maxLength="" defaultValue="" required id="add_birthdate" placeholder="dd-mm-yyyy" />
    </div>
    <div className="form-group col-md-12">
      <label htmlFor="add_startdate">İşə başlama tarixi</label>
      <input type="text" className="form-control" maxLength="" defaultValue="" required id="add_startdate" placeholder="dd-mm-yyyy" />
    </div>
  </div>
   <button type="submit" className="btn btn-primary">Əlavə et</button>
</form>
</div>

</div>
    </>
  )
}
