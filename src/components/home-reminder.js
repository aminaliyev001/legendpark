import React, { Component, useState,useEffect } from 'react'
import Axios from "axios";
import '../components/reminder.css'
import { ReactDOM } from 'react';
import { logRoles } from '@testing-library/react';
import { v4 as uuid } from 'uuid';

function Reminder(props) {  
    const [title_edit,settitleedit] = useState("")
    const [date_edit,setDate] = useState("")
    const [point1_edit,setPoint1] = useState("")
    const [id_use,setiduse] = useState("")
    const [indexofelement,setIndex] = useState("")
    const [Todo,setTodo] = useState([])
    const [Pin_edit,setPin] = useState([])
    const todofunc = ()=> {
        Axios.get("http://localhost:5000/todo").then((response) => {
              const ac = response.data
               setTodo(ac)
                });
              }
    useEffect(()=> {
        todofunc()
    },[])
    const [dateforinput,setdateforinput] = useState("")
    const [clockforinput,setclockforinput] = useState("")
    const datefunc = (date_edit) => {
        let month_a = ""
        let day_a = ""
        if(new Date(date_edit).getMonth()+1 < 10) { month_a = new Date(date_edit).getMonth()+1; month_a = "0"+month_a }else { month_a = new Date(date_edit).getMonth()+1}
        if(new Date(date_edit).getDate() < 10) { day_a = new Date(date_edit).getDate(); day_a = "0"+day_a }else { day_a = new Date(date_edit).getDate()}

        const dateforinput2 = new Date(date_edit).getFullYear()+"-"+month_a+"-"+day_a
        let datemin = ''
if(new Date(date_edit).getMinutes()<10) {
    datemin = "0"+new Date(date_edit).getMinutes()
} else {
    datemin = new Date(date_edit).getMinutes()
}
let datehour = ''
if(new Date(date_edit).getHours()<10) {
    datehour = "0"+new Date(date_edit).getHours()
} else {
    datehour = new Date(date_edit).getHours()
}
        const clock2 = datehour+":"+datemin
        setclockforinput(clock2)
        setdateforinput(dateforinput2)
    }
    const editfunc = (id,title,date,point1,index,pin) => {
        setIndex(index)
        settitleedit(title)
        setDate(date)
        setPoint1(point1)
        datefunc(date)
        setPin(pin)
        var viewfirst= document.getElementById("viewfirst")
        var viewsecond= document.getElementById("viewsecond")
        viewfirst.style.display="none"
        viewsecond.style.display="block"
         }    
    const newtodo = ()=> {
        var viewfirst= document.getElementById("viewfirst")
        var viewthird= document.getElementById("viewthird")
        viewfirst.style.display="none"
        viewthird.style.display="block"     
    }
    const addSubmit = (event)=> {
    event.preventDefault()
    const valueof_name =  document.getElementById("name2").value
    const valueof_date =  document.getElementById("date2").value
    const valueof_pin =  uuid().slice(2, 9)
    const valueof_clock2 =  document.getElementById("clock2").value
    const valueof_clock = valueof_clock2.split(":")
    let date_onsubmit = new Date(valueof_date)
    date_onsubmit.setHours(valueof_clock[0])
    date_onsubmit.setMinutes(valueof_clock[1])
    date_onsubmit = date_onsubmit.toUTCString('')
    const valueof_subject =  document.getElementById("point1_2").value
    /* */
    Axios.post("http://localhost:5000/newtodo", {
      pin:valueof_pin,
      title: valueof_name,
      date: date_onsubmit,
      point1: valueof_subject,
      point2: "BOSH",
      point3: "BOSH",
    })
    let newArr = [...Todo]; 
    newArr.push({
       pin:valueof_pin,
        title:valueof_name,
        date:date_onsubmit,
        point1:valueof_subject,
        point2:"BOSH",
        point3:"BOSH",
    })
    setTodo(newArr)
    /* */
    closediv2()
    }
    const closediv = () =>{
        var viewfirst = document.getElementById("viewfirst")
        var viewsecond = document.getElementById("viewsecond")

        viewfirst.style.display="block"
        viewsecond.style.display="none"       
}
const closediv2 = () =>{
    var viewfirst = document.getElementById("viewfirst")
    var viewthird= document.getElementById("viewthird")

    viewfirst.style.display="block"
    viewthird.style.display="none"       
}
function onSubmit (event) {
    event.preventDefault();
    const valueof_name =  document.getElementById("name").value
    const valueof_date =  document.getElementById("date").value
    const valueof_clock2 =  document.getElementById("clock").value
    const pin =  document.getElementById("pin_edit").value
    const valueof_clock = valueof_clock2.split(":")
    let date_onsubmit = new Date(valueof_date)
    date_onsubmit.setHours(valueof_clock[0])
    date_onsubmit.setMinutes(valueof_clock[1])
    date_onsubmit = date_onsubmit.toUTCString('')
    const valueof_subject =  document.getElementById("point1").value
    const index_infunc = document.getElementById("indexofelement").value
    /* */
    let newArr = [...Todo]; 
    newArr[index_infunc] = {
        pin:pin,
        title:valueof_name,
        date:date_onsubmit,
        point1:valueof_subject,
        point2:"BOSH",
        point3:"BOSH"
    }
    setTodo(newArr)
    Axios.put("http://localhost:5000/updatetodo", {title: valueof_name,date:date_onsubmit,point1:valueof_subject, point2:"BOSH2",point3:"BOSH",id: pin })
    /* */
    closediv()
  }
const deleteA = (idget) => {
    Axios.delete(`http://localhost:5000/delete/${idget}`).then((response) => {
       const ok = Todo.filter((val) => {
          return val.pin != idget;
        })
        setTodo(ok)
    });
   }
function Listitem(props) {
const kl = props.value
const datenow = new Date()
const kldate = new Date(kl.date)
let kldategetm = ''
if(kldate.getMinutes()<10) {
    kldategetm = "0"+kldate.getMinutes()
} else {
     kldategetm = kldate.getMinutes()
}
let kldategeth = ''
if(kldate.getHours()<10) {
    kldategeth = "0"+kldate.getHours()
} else {
    kldategeth = kldate.getHours()
}
const getday = kldate.getDate()
const months = ["Yan","Fev","Mar","Apr","May","İyn","İyl","Avq","Sen","Oct","Noy","Dek"];
const getmonthkldate = months[kldate.getMonth()]
function timeDiffCalc(dateFuture, dateNow) {
    let diffInMilliSeconds = (dateFuture - dateNow) / 1000;

    const days = Math.floor(diffInMilliSeconds / 86400);
    diffInMilliSeconds -= days * 86400;

    const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
    diffInMilliSeconds -= hours * 3600;

    const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
    diffInMilliSeconds -= minutes * 60;

    let difference = '';
    if (days > 0) {
      difference += (days === 1) ? `${days} gün, ` : `${days} gün, `;
    }
    difference += (hours === 0 || hours === 1) ? `${hours} saat, ` : `${hours} saat, `;
    difference += (minutes === 0 || hours === 1) ? `${minutes} dəqiqə` : `${minutes} dəqiqə`; 

    if(0>days || 0>hours || 0>minutes) {
        difference = 'Müddət bitdi'
    }
    return difference;
  }
 
 return (
        <div className="col-lg-4"id="divcustom2">
        <div className="card card-margin">
            <div className="card-header no-border">
                <h5 className="card-title">{
                    timeDiffCalc(kldate, datenow)
                }</h5>
            </div>
            <div className="card-body pt-0">
                <div className="widget-49">
                    <div className="widget-49-title-wrapper">
                        <div className="widget-49-date-warning">
                            <span className="widget-49-date-day">{getday}</span>
                            <span className="widget-49-date-month">{getmonthkldate}</span>
                        </div>
                        <div className="widget-49-meeting-info">
                            <span className="widget-49-pro-title">{kl.title}</span>
                            <span className="widget-49-meeting-time">{kldategeth+":"+kldategetm}</span>
                        </div>
                    </div>
                    <ul className="widget-49-meeting-points">
                        <li className="widget-49-meeting-item"><span>{kl.point1}</span></li>
                    </ul>
                    <div className="widget-49-meeting-action iparentdiv">
                        <a  onClick={()=>editfunc(kl.id,kl.title,kldate,kl.point1,props.index,kl.pin)}><i  className="fas fa-pen"></i></a>
                        <a onClick={()=>deleteA(kl.pin)}><i  className="fas fa-trash-alt"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
  return (
<div>

    <div id="viewfirst">
    <div className='homer'>
                <span id="plus-span" onClick={()=>newtodo()}>+</span>
                <h2>Görüləcək işlər siyahısı</h2>
                <br />
    <div className="container">
<div className="row" id="customdiv_1">
   {
 Todo.map((kl,index)=> {
return ( 
        <Listitem key={uuid()} value={kl} index={index} />
)
            }
    )
    }
</div>
</div>
</div>

</div>


<div id="viewsecond"style={{display:"none"}}>
<span id="close"onClick={()=>closediv()}>X</span> 
    <h4>Redakte et</h4>
<form onSubmit={(e)=>onSubmit(e)} action="">
  <div className="form-row">
    <div className="form-group col-md-6">
      <label htmlFor="name">Ad</label>
      <input type="text" className="form-control" id="name" required defaultValue={title_edit} placeholder="" />
    </div>
    <div className="form-group col-md-6">
      <label htmlFor="date">Tarix</label>
      <input type="date" className="form-control" id="date" required defaultValue={dateforinput} placeholder="" />
    </div>
    <div className="form-group col-md-6">
      <label htmlFor="date">Saat</label>
      <input type="text" className="form-control" id="clock" required defaultValue={clockforinput} placeholder="" />
    </div>
    <div className="form-group col-md-6">
      <label htmlFor="point1">Mövzu</label>
      <input type="text" className="form-control" maxLength="40" required defaultValue={point1_edit} id="point1" placeholder="" />
    </div>
    
    <div className="form-group col-md-6" style={{display:'none'}}>
      <label htmlFor="point1">index of element</label>
      <input type="text" className="form-control" defaultValue={indexofelement} id="indexofelement" placeholder="" />
    </div>
    <div className="form-group col-md-6" style={{display:'none'}}>
      <label htmlFor="point1">PIN</label>
      <input type="text" className="form-control" defaultValue={Pin_edit} id="pin_edit" placeholder="" />
    </div>
  </div>
   <button type="submit" className="btn btn-primary">Düzəliş et</button>
</form>
</div>


<div id="viewthird"style={{display:"none"}}>
<span id="close"onClick={()=>closediv2()}>X</span> 
    <h4>Əlavə et</h4>
<form onSubmit={(e)=>addSubmit(e)} action="">
  <div className="form-row">
    <div className="form-group col-md-6">
      <label htmlFor="name">Ad</label>
      <input type="text" className="form-control" id="name2" required defaultValue="" placeholder="" />
    </div>
    <div className="form-group col-md-6">
      <label htmlFor="date">Tarix</label>
      <input type="date" className="form-control" id="date2" required defaultValue="" placeholder="" />
    </div>
    <div className="form-group col-md-6">
      <label htmlFor="date">Saat</label>
      <input type="text" className="form-control" id="clock2" required defaultValue="" placeholder="" />
    </div>
    <div className="form-group col-md-6">
      <label htmlFor="point1">Mövzu</label>
      <input type="text" className="form-control" maxLength="40" defaultValue="" required id="point1_2" placeholder="" />
    </div>
    
    <div className="form-group col-md-6" style={{display:'none'}}>
      <label htmlFor="point1">index of element</label>
      <input type="text" className="form-control" defaultValue="" id="indexofelement" placeholder="" />
    </div>
  </div>
   <button type="submit" className="btn btn-primary">Əlavə et</button>
</form>
</div>


</div>
   )
 }   
   
export default Reminder;
