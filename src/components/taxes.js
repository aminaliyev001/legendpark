import React,{useEffect} from 'react'
import Navbar from './navbar'
import { Outlet, Link } from "react-router-dom";
import { ReactDOM } from 'react';
import '../components/taxes.css'
import {useRef,useState } from 'react';
import Reminder from '../components/home-reminder'
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker'
import Axios from "axios";
import { findAllInRenderedTree } from 'react-dom/test-utils';
import { v4 as uuid } from 'uuid';

export default function Taxes() {
const date = new Date();
const first_day = new Date(date.getFullYear(), date.getMonth(), 1);
const [value, onChange] = useState([first_day, date]);
const [Taxlist,setTaxlist] = useState([])
const [Tax,setTax] = useState([])

const [listname_edit,setlistnamedit] = useState("")
const [editlist_pin,seteditlistpin] = useState("")
const [editlist_index,seteditlistindex] = useState("")

const [date_op,setdateop] = useState("")
const [name_op,setnameop] = useState("")
const [price_op,setpriceop] = useState("")
const [index_op,setindexop] = useState("")
const [pin_op,setpinop] = useState("")



useEffect(()=> {
    vergi_list()
    vergi()
   },[]) 
   const addtaxlist = () => {
    document.getElementById("div_main4").style.display="block"
    document.getElementById("div_main2").style.display="none"

   }
   const submit_addlist = (e)=> {
    e.preventDefault()
    var name = document.getElementById("name_addlist").value
    var pin = uuid().slice(2,9)
    let newArr2 = [...Taxlist]; 
    newArr2.push({
            name:name,
            pin:pin
        })
        Axios.post("http://localhost:5000/newtaxlist", {
      pin:pin,name:name
    })
    setTaxlist(newArr2)
    closediv_main4()
   }
   const editlist = (kls,index) => {
    document.getElementById("div_main3").style.display="block"
    document.getElementById("div_main2").style.display="none"
    setlistnamedit(kls.name)
    seteditlistpin(kls.pin)
    seteditlistindex(index)
   }
   
   const closediv_main3 = () => {
    document.getElementById("div_main3").style.display="none"
    document.getElementById("div_main2").style.display="block"
   }
   const closediv_main4 = () => {
    document.getElementById("div_main4").style.display="none"
    document.getElementById("div_main2").style.display="block"
   }
   const submit_editlist = (e)=> {
    e.preventDefault()
    var name = document.getElementById('name').value
    var pin = document.getElementById('editlist_pin').value
    var index = document.getElementById('editlist_index').value

    let newArr = [...Taxlist]; 
        newArr[index] = {
            name:name,
            pin:pin
        }
    setTaxlist(newArr)
    Axios.put("http://localhost:5000/updatetaxlist", {name:name,pin:pin })
    closediv_main3()
   }
const vergi_list = ()=> {
    Axios.get("http://localhost:5000/taxlist").then((response) => {
          const ac = response.data
          setTaxlist(ac)
            });
       }
       const deletelist = (pin,index) => {
        let text = "Əminsiniz?"
        if (window.confirm(text) == true) {
        Axios.delete(`http://localhost:5000/deletetaxlist/${pin}`).then((response) => {
       const ok = Taxlist.filter((val) => {
          return val.pin != pin;
        })
        setTaxlist(ok)
    });
} else {
    return null;
}
       }
       const vergi = ()=> {
        Axios.get("http://localhost:5000/tax").then((response) => {
              const ac = response.data
              setTax(ac)
                });
           }
const deletevergiop = (pin) => {
     Axios.delete(`http://localhost:5000/deletetax/${pin}`).then((response) => {
        const ok = Tax.filter((val) => {
           return val.pin != pin;
         })
         setTax(ok)
     });
           }
const Trlist = (props)=> {
    const values = props.value
    const index=props.index
    let Tax_filter2 = Tax.filter(ab=> ab.belongto==values.pin )
    let Tax_filter = Tax_filter2.filter(ab=> new Date(ab.date)>=value[0]&&value[1]>=new Date(ab.date))
      if(Tax_filter===undefined ||  Tax_filter.length==0) {
        var Tax_value = 0;
      } else {
        var Tax_value = Tax_filter.map(bill => Number(bill.price)).reduce((acc, bill) => bill + acc);
      }

    return (
    <tr>
    <td >{values.name}</td>
    <td >{Tax_value}₼</td>
    <td><i onClick={()=> editlist(values,index)} className="fas fa-pen"></i>
    <i onClick={()=> deletelist(values.pin,index)}  className="fas fa-trash"></i>      
    </td>
  </tr>
    )
}
const Trop = (props) => {
    const ak = props.value
    const index= props.index
    const getname = Taxlist.filter(ab=> ab.pin==ak.belongto)
    const nameof = getname[0].name
    const dateak = new Date(ak.date)
    if(dateak>=value[0]&&value[1]>=dateak) {
    let monthofak = ""
    let dayofak = ""
    let letgetmonth = Number(dateak.getMonth()+1)
    let letgetdate = Number(dateak.getDate())
    dateak.getMonth()+1<10 ? monthofak = "0"+letgetmonth : monthofak= letgetmonth
    dateak.getDate()<10 ? dayofak = "0"+letgetdate : dayofak= letgetdate
    const datefull = dayofak+"-"+monthofak+"-"+dateak.getFullYear()
    return (
        <tr>
        <td >{datefull}</td>
        <td >{nameof}</td>
        <td>{ak.price}₼</td>
        <td ><i onClick={()=> editvergiop(ak,index)} className="fas fa-pen"></i>
        <i onClick={()=> deletevergiop(ak.pin)} className="fas fa-trash"></i>      
        </td>
      </tr>
    )
    }
}
const editvergiop = (kls,index) => {
    document.getElementById("div_main1").style.display="none"
    document.getElementById("div_main5").style.display="block"
    let dateak = new Date(kls.date)
    let monthofak = ""
    let dayofak = ""
    let letgetmonth = Number(dateak.getMonth()+1)
    let letgetdate = Number(dateak.getDate())
    dateak.getMonth()+1<10 ? monthofak = "0"+letgetmonth : monthofak= letgetmonth
    dateak.getDate()<10 ? dayofak = "0"+letgetdate : dayofak= letgetdate
    const datefull = dateak.getFullYear()+"-"+monthofak+"-"+dayofak
    let Tax_filter2 = Taxlist.filter(ab=> ab.pin==kls.belongto )
    setnameop(Tax_filter2[0].pin)
    setdateop(datefull)
    setpriceop(kls.price)
    setindexop(index)
    setpinop(kls.pin)
   }
   const closediv_main5 = ()=> {
    document.getElementById("div_main1").style.display="block"
    document.getElementById("div_main5").style.display="none"

   }
   const Option = (props)=> {
return (
    <option selected={name_op == props.tx.pin} value={props.tx.pin}>{props.tx.name}</option>
)
   }
 const submitlistop = (e) => {
    e.preventDefault()
    var name = document.getElementById("vergi_type").value
    var date = new Date(document.getElementById("date_editop").value)
    var price = document.getElementById("price_editop").value
    var index = document.getElementById("index_op").value
    var pin = document.getElementById("pin_op").value

    let newArr = [...Tax]; 
    newArr[index] = {
        belongto:name,
        date:date,price:price,pin:pin
    }
setTax(newArr)
Axios.put("http://localhost:5000/updatetaxop", {belongto:name,
date:date,price:price,pin:pin })
closediv_main5() 

 }
 const addtaxop = () => {
    document.getElementById("div_main6").style.display="block"
    document.getElementById("div_main1").style.display="none"
 }
 const closediv_main6 = () => {
    document.getElementById("div_main6").style.display="none"
    document.getElementById("div_main1").style.display="block"

 }
 const addoponsubmit = (e) => {
    e.preventDefault()
    var date = new Date(document.getElementById('date_add').value)
    var price = document.getElementById('price_add').value
    var belongto = document.getElementById('vergi_type_add').value
    var pin = uuid()

    let newArr = [...Tax]; 
    newArr.push ({
        pin:pin,date:date,belongto:belongto,price:price
    })
setTax(newArr)
Axios.post("http://localhost:5000/addtaxop", {pin:pin,date:date,belongto:belongto,price:price
})
closediv_main6() 
 }
    return (
        <>
        <Navbar page="d" />
        <DateTimeRangePicker onChange={(ah)=>onChange(ah)}  value={value}  format={'y-MM-dd'} />
        <div id="workersmain">
        <div id="div_main1">
        <span id="plus-span" onClick={()=>addtaxop()} >+</span>
<h2 id="headerh2">Vergiyə ödənişlər</h2>
<div className='table-responsive'>
    <table className="table table-striped table-hover">
  <thead>
    <tr>
     <th scope="col">Tarix</th>
      <th scope="col">Vergi növü</th>
      <th scope="col">Məbləğ</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
 {
    Tax.map((t,index)=> {
        return (
            <Trop value={t} key={uuid()} index={index} />
        )
    })
 }
   
  </tbody>
</table>
</div>
</div>

<div id="div_main6" style={{display:"none"}}>
<span id="close"onClick={()=>closediv_main6()}>X</span> 
    <h2>Əlavə et</h2>
<form action="" onSubmit={(e)=>addoponsubmit(e)} >
  <div className="form-row">
    <div className="form-group col-md-6">
      <label htmlFor="name">Tarix</label>
      <input type="date" className="form-control" id="date_add" required  />
    </div>
    <div className="form-group col-md-6">
      <label htmlFor="name">Vergi növü</label>
<select defaultValue={name_op}  multiple={false} className="form-control" id="vergi_type_add">
    {
        Taxlist.map((tx)=> {
            return (
                <Option tx={tx} key={uuid()} />
            )
        })
    }
      </select>    
      </div>
    <div className="form-group col-md-12">
      <label htmlFor="name">Məbləğ</label>
      <input type="text" className="form-control" id="price_add" required  placeholder="" />
    </div>
  </div>
   <button type="submit" className="btn btn-primary">Əlavə et</button>
</form>
</div>

<div id="div_main5" style={{display:"none"}}>
<span id="close"onClick={()=>closediv_main5()}>X</span> 
    <h2>Redakte et</h2>
<form action="" onSubmit={(e)=>submitlistop(e)}>
  <div className="form-row">
    <div className="form-group col-md-6">
      <label htmlFor="name">Tarix</label>
      <input type="date" className="form-control" id="date_editop" required defaultValue={date_op} />
    </div>
    <div className="form-group col-md-6">
      <label htmlFor="name">Vergi növü</label>
<select defaultValue={name_op}  multiple={false} className="form-control" id="vergi_type">
    {
        Taxlist.map((tx)=> {
            return (
                <Option tx={tx} key={uuid()} />
            )
        })
    }
      </select>    
      </div>
    <div className="form-group col-md-12">
      <label htmlFor="name">Məbləğ</label>
      <input type="text" className="form-control" id="price_editop" required defaultValue={price_op} placeholder="" />
    </div>
    <div className="form-group col-md-6" style={{display:'none'}}>
      <label htmlFor="point1">pin</label>
      <input type="text" className="form-control" defaultValue={pin_op} id="pin_op" placeholder="" />
    </div>
    <div className="form-group col-md-6" style={{display:'none'}}>
      <label htmlFor="point1">index</label>
      <input type="text" className="form-control" defaultValue={index_op} id="index_op" placeholder="" />
    </div>
  </div>
   <button type="submit" className="btn btn-primary">Redakte et</button>
</form>
</div>
<hr />
<div id="div_main2"style={{marginTop:"30px"}}>
<span id="plus-span" onClick={()=> addtaxlist()} >+</span>
<h4 id="headerh2">Vergilər listəsi</h4>
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
        Taxlist.map((taxl,index)=> {
            return <Trlist value={taxl} index={index} key={uuid()} />
        })
    }
  

   
  </tbody>
</table>
</div>

</div>

<div id="div_main3" style={{display:"none"}}>
<span id="close"onClick={()=>closediv_main3()}>X</span> 
    <h2>Redakte et</h2>
<form onSubmit={(e)=>submit_editlist(e)} action="">
  <div className="form-row">
    <div className="form-group col-md-12">
      <label htmlFor="name">Ad</label>
      <input type="text" className="form-control" id="name" required defaultValue={listname_edit} placeholder="" />
    </div>
    <div className="form-group col-md-6" style={{display:'none'}}>
      <label htmlFor="point1">index of element</label>
      <input type="text" className="form-control" defaultValue={editlist_index} id="editlist_index" placeholder="" />
    </div>
    <div className="form-group col-md-6" style={{display:'none'}}>
      <label htmlFor="point1">PIN</label>
      <input type="text" className="form-control" defaultValue={editlist_pin} id="editlist_pin" placeholder="" />
    </div>
  </div>
   <button type="submit" className="btn btn-primary">Düzəliş et</button>
</form>
</div>

<div id="div_main4" style={{display:"none"}}>
<span id="close"onClick={()=>closediv_main4()}>X</span> 
    <h2>Əlavə et</h2>
<form onSubmit={(e)=>submit_addlist(e)} action="">
  <div className="form-row">
    <div className="form-group col-md-12">
      <label htmlFor="name">Ad</label>
      <input type="text" className="form-control" id="name_addlist" required defaultValue="" placeholder="" />
    </div>
  </div>
   <button type="submit" className="btn btn-primary">Əlavə et</button>
</form>
</div>



        </div>
        </>

    )
}

