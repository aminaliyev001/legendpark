import React,{useEffect} from 'react'
import Navbar from './navbar'
import { Outlet, Link } from "react-router-dom";
import { ReactDOM } from 'react';
import '../components/second.css'
import {useRef,useState } from 'react';
import Reminder from '../components/home-reminder'
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker'
import Axios from "axios";
import { findAllInRenderedTree } from 'react-dom/test-utils';
import { v4 as uuid } from 'uuid';
export default function Accounting() {
    const date = new Date();
const first_day = new Date(date.getFullYear(), date.getMonth(), 1);
const [value, onChange] = useState([first_day, date]);
const [Xerc,setxerc] = useState([]);
const [Kapital,setkapital] = useState([]);
const [Kapitallist,setkapitallist] = useState([]);
const [Xerclist,setxerclist] = useState([]);
                useEffect(()=> {
                  Axios.get("http://localhost:5000/xerc").then((response) => {
                  const ac = response.data
                  setxerc(ac)
                 });
                 Axios.get("http://localhost:5000/xerclist").then((response) => {
                  const ac = response.data
                  setxerclist(ac)
                 });
                 Axios.get("http://localhost:5000/kapital").then((response) => {
                  const ac = response.data
                  setkapital(ac)
                 });
                 Axios.get("http://localhost:5000/kapitalist").then((response) => {
                  const ac = response.data
                  setkapitallist(ac)
                 });
                },[])
  return (
    <>
    <Navbar page="c" />
    <DateTimeRangePicker onChange={(ah)=>onChange(ah)}  value={value}  format={'y-MM-dd'} />
    <div id="workersmain">
        <div id="div_main1">
        <span id="plus-span"  >+</span>
<h2 id="headerh2">Xərclər</h2>
<div className='table-responsive'>
    <table className="table table-striped table-hover">
  <thead>
    <tr>
     <th scope="col">Tarix</th>
      <th scope="col">Ad</th>
      <th scope="col">Məbləğ</th>
      <th scope="col"></th>
    </tr>
  </thead>
 <tbody>
   {Xerc.map((io)=> {
    let map_1 = Xerclist.filter(ab=> ab.pin==io.belongto)
    let dateak = new Date(io.date)
    let monthofak = ""
    let dayofak = ""
    let letgetmonth = Number(dateak.getMonth()+1)
    let letgetdate = Number(dateak.getDate())
    dateak.getMonth()+1<10 ? monthofak = "0"+letgetmonth : monthofak= letgetmonth
    dateak.getDate()<10 ? dayofak = "0"+letgetdate : dayofak= letgetdate
    const datefull = dayofak+"-"+monthofak+"-"+dateak.getFullYear()    
    if(dateak>=value[0]&&value[1]>=dateak) {
    return (
      <tr key={uuid()}>
        <td>{datefull}</td>
        <td>{map_1[0].name}</td>
        <td>{io.value}₼</td>
        <td><i  className="fas fa-pen"></i>
        <i  className="fas fa-trash"></i>      </td>
      </tr>
    )
    }
   })}
  </tbody>
</table>
</div>
</div>

<div id="div_main2">
        <span id="plus-span"  >+</span>
<h4 id="headerh2">Xərclər listəsi</h4>
<div className='table-responsive'>
    <table className="table table-striped table-hover">
  <thead>
    <tr>
      <th scope="col">Ad</th>
      <th scope="col">Məbləğ</th>
      <th scope="col"></th>
    </tr>
  </thead>
 <tbody>
   {
    Xerclist.map((op)=> {
      let filter_1 = Xerc.filter(ab=> ab.belongto == op.pin)
      filter_1 = Xerc.filter(ab=> new Date(ab.date)>=value[0] && value[1]>=new Date(ab.date))
      if(filter_1===undefined ||  filter_1.length==0) {
        var value_xerclist = 0;
      } else {
        var value_xerclist = filter_1.map(bill => Number(bill.value)).reduce((acc, bill) => bill + acc);
      }     
      return (
       <tr key={uuid()}>
        <td>{op.name}</td>
        <td>{value_xerclist}₼</td>
        <td><i  className="fas fa-pen"></i>
        <i  className="fas fa-trash"></i>      </td>
      </tr>
      )
    })
   }
  </tbody>
</table>
</div>
</div>
<hr />

<div id="div_main3">
        <span id="plus-span"  >+</span>
<h2 id="headerh2">Kapital</h2>
<div className='table-responsive'>
    <table className="table table-striped table-hover">
  <thead>
    <tr>
     <th scope="col">Tarix</th>
      <th scope="col">Ad</th>
      <th scope="col">Məbləğ</th>
      <th scope="col"></th>
    </tr>
  </thead>
 <tbody>
   {Kapital.map((io)=> {
    let map_1 = Kapitallist.filter(ab=> ab.pin==io.belongto)
    let dateak = new Date(io.date)
    let monthofak = ""
    let dayofak = ""
    let letgetmonth = Number(dateak.getMonth()+1)
    let letgetdate = Number(dateak.getDate())
    dateak.getMonth()+1<10 ? monthofak = "0"+letgetmonth : monthofak= letgetmonth
    dateak.getDate()<10 ? dayofak = "0"+letgetdate : dayofak= letgetdate
    const datefull = dayofak+"-"+monthofak+"-"+dateak.getFullYear()    
    if(dateak>=value[0]&&value[1]>=dateak) {
    return (
      <tr key={uuid()}>
        <td>{datefull}</td>
        <td>{map_1[0].name}</td>
        <td>{io.value}₼</td>
        <td><i  className="fas fa-pen"></i>
        <i  className="fas fa-trash"></i>      </td>
      </tr>
    )
    }
   })}
  </tbody>
</table>
</div>
</div>

</div>
    </>
  )
}
