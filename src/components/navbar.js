import React, { useEffect, useState } from "react";
import '../components/index.css'
import {Component} from 'react'
import Legend from '../images/legend.png'
import $ from 'jquery'
import Axios from "axios";
import { v4 as uuid } from 'uuid';
const Navbar =(props)=>{
    const [Notilist,setnotilist] = useState([])
    const [Notilistcount,setcountnoti] = useState(0)
    useEffect(()=>{
        Axios.get("http://localhost:5000/checkbirthdate").then((response) => {
        setnotilist(response.data)
    })
        var todayweek = new Date().getDay()
        if(todayweek==3) {
            Axios.get("http://localhost:5000/workers").then((response) => {
              const ac = response.data
              ac.map((t)=> {
            const ak = t.birthdate.split("-")
            const dateforinput2 = ak[2]+"-"+ak[1]+"-"+ak[0]
                var birthdate_check = new Date(dateforinput2).getMonth()+"-"+new Date(dateforinput2).getDate()
                var now_check = new Date().getMonth()+"-"+new Date().getDate()
                if(birthdate_check==now_check) {
                    let name = t.name.toUpperCase()+" "+t.surname.toUpperCase()
                    let details = "Bu gün səncə kimin ad günüsüdür?? "+t.name.toUpperCase()+" "+t.surname.toUpperCase()+"🎂"
                    let details_s = "Bu gün səncə kimin ad günüsüdür?? "+t.name.toUpperCase()+" "+t.surname.toUpperCase()
    
                    let date = new Date()
                    date = date.getMonth()+"-"+date.getDate()
                    let dateset = new Date()
                    let num = 0;
                    Axios.get("http://localhost:5000/checkbirthdate").then((response) => {
                    const ap = response.data
                    ap.map((p)=> {
                        const mes = p.detail+"🎂"
                        const dateget = new Date(p.date).getMonth()+"-"+new Date(p.date).getDate()
                        if(mes == details) {
                            if(dateget==date) {
                                num+=1
                            }
                        }
                    })
                    if(num==0) {
                        let pin_2 = uuid()
                        Axios.post("http://localhost:5000/newnoti", {
          detail:details_s,
          name:name,
         type:"birthday",
         date:dateset,
         pin:pin_2,
         onof:"on"
        })
        let newArr2 = [...Notilist]; 
        newArr2.push ({
            detail:details_s,
          name:name,
         type:"birthday",
         date:dateset,
         pin:pin_2,
         onof:"on"
            })
            setnotilist(newArr2)
                    }
                });
                
    
    
                } else {
                    return null;
                }
              })
                });
            }
        if(todayweek==3) {
                    let name = "ELMIN ALIYEV"
                    let details = "Uber hesabınızda balansı yoxlayın"
                    let details_s = "Uber hesabınızda balansı yoxlayın"
    
                    let date = new Date()
                    date = date.getMonth()+"-"+date.getDate()
                    let dateset = new Date()
                    let num = 0;
                    Axios.get("http://localhost:5000/checkbirthdate").then((response) => {
                    const ap = response.data
                    ap.map((p)=> {
                        const mes = p.detail
                        const dateget = new Date(p.date).getMonth()+"-"+new Date(p.date).getDate()
                        if(mes == details) {
                            if(dateget==date) {
                                num+=1
                            }
                        }
                    })
                    if(num==0) {
                        let pin_1 = uuid()
                        Axios.post("http://localhost:5000/newnoti", {
          detail:details_s,
          name:name,
         type:"reminder",
         date:dateset,
         pin:pin_1,onof:"on"
        })
        let newArr = [...Notilist]; 
            newArr.push ({
                detail:details_s,
                name:name,
                 type:"reminder",
                 date:dateset,
                 pin:pin_1,
                 onof:"on"
                })
                setnotilist(newArr)
    
                    }
                });
                
            }
        
        $(document).ready(function(){
            var down = false;
            $('#bell').click(function(e){
                var color = $(this).text();
                if(down){
                    $('#box').css('height','0px');
                    $('#box').css('display','none');
                    $('#box').css('opacity','0');
                    if($('.react-datetimerange-picker').length>0) {
                        $('.react-datetimerange-picker').css('visibility','visible')
                       }
                    down = false;
                }else{
                   if($('.react-datetimerange-picker').length>0) {
                    $('.react-datetimerange-picker').css('visibility','hidden')
                   }
                    $('#box').css('height','auto');
                    $('#box').css('display','block');
                    $('#box').css('opacity','1');
                    down = true;
                    var box = $("#box");
                }
            });
                });

        const showNavbar = (toggleId, navId, bodyId, headerId) =>{
        const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId),
        bodypd = document.getElementById(bodyId),
        headerpd = document.getElementById(headerId)
        if(toggle && nav && bodypd && headerpd){
        toggle.addEventListener('click', ()=>{
        nav.classList.toggle('show')
        toggle.classList.toggle('bx-x')
        bodypd.classList.toggle('body-pd')
        headerpd.classList.toggle('body-pd')
        
        })
        }
        }
        
        showNavbar('header-toggle','nav-bar','body-pd','header')
        const linkColor = document.querySelectorAll('.nav_link')
        
        function colorLink(){
        if(linkColor){
        linkColor.forEach(l=> l.classList.remove('active'))
        this.classList.add('active')
        }
        }
        linkColor.forEach(l=> l.addEventListener('click', colorLink))
        let notilist_lk = Notilist.filter(ab => ab.onof=="on")
        notilist_lk = Number(notilist_lk.length)
        setcountnoti(notilist_lk)
        },[Notilist])
        function closenoti() {
            if($('.react-datetimerange-picker').length>0) {
                $('.react-datetimerange-picker').css('visibility','visible')
               }
            $('#box').css('height','0px');
            $('#box').css('display','none');
            $('#box').css('opacity','0');
        }
       
        let a = ""
        let b = ""
        let c = ""
        let d = ""
      if(props.page=="a") {
         a = "nav_link active";
         b = "nav_link" 
         c = "nav_link" 
         d = "nav_link" 
      } 
      else if(props.page=="b") {
         a = "nav_link";
         b = "nav_link active" 
         c = "nav_link" 
         d = "nav_link" 
      }
      else if(props.page=="c") {
         a = "nav_link";
         b = "nav_link" 
         c = "nav_link active" 
         d = "nav_link" 
    }
    else if(props.page=="d") {
         a = "nav_link";
         b = "nav_link" 
         c = "nav_link" 
         d = "nav_link active" 
    }
    function deletenoti(op,index) {
        let newArr = [...Notilist]; 
    newArr[index] = {
        detail:op.detail,
        name:op.detail,
         type:op.type,
         date:op.date,
         pin:op.pin,
         onof:"off"
    }
    setnotilist(newArr)
        Axios.put("http://localhost:5000/updatenoti", {pin:op.pin,onof:"off" })
    }
    return (
        <div id="body-pd">
        <header className="header" id="header">
        <div className="header_toggle"> <i className='bx bx-menu' id="header-toggle"></i> </div>
        <div className="icon_nav" id="bell"> <i className="fas fa-bell"></i> </div>
    <div className="notifications" id="box">
        <span id="close"style={{marginTop:'7px',marginRight:'10px',fontSize:'1rem'}} onClick={()=>closenoti()}>X</span>
        <h2>Bildirişlər - <span>{Notilistcount}</span></h2>
        {
            Notilist.map((op,index)=> {
                if(op.onof=="on") {
                return (
                    <div className="notifications-item" key={uuid()}>
                       {
                        op.type=="birthday"? <i style={{display: 'block',fontSize:'40px',color:'royalblue',marginRight: '9px',borderRadius: '50%',marginTop: '2px'}} className="fas fa-birthday-cake"></i> : <i className="fab fa-uber"style={{display: 'block',fontSize:'40px',color:'royalblue',marginRight: '9px',borderRadius: '50%',marginTop: '2px'}}></i>
                       }
                    <div className="text">
                        <h4>{op.name}</h4>
                        <p>{op.detail}</p>
                    </div>
                    <i onClick={()=> deletenoti(op,index)} style={{marginLeft:'auto'}} className="fas fa-trash"></i>
                </div>
                )
                    }
            })
        }
       
    </div>
    </header>
    <div className="l-navbar" id="nav-bar">
        <nav className="nav">
            <div> <a href="/" className="nav_logo"> <img alt='logo' className='bx bx-layer nav_logo-icon' src={Legend} style={{width:'30px',height:'30px'}}  /> <span className="nav_logo-name">LEGEND PARK</span> </a>
                <div className="nav_list"> <a href="/" className={a}> <i className='bx bx-grid-alt nav_icon'></i> <span className="nav_name">Ana səhifə</span> </a> 
                <a href="/workers" className={b}> <i className='bx bx-user nav_icon'></i> <span className="nav_name">Əməkdaşlar</span> </a> 
                <a href="/accounting" className={c}> <i className='bx bx-folder nav_icon'></i> <span className="nav_name">Hesabatlar</span> </a> 
                <a href="/taxes" className={d}> <i className='bx bxs-bank nav_icon'></i> <span className="nav_name">Vergilər</span> </a> 
             </div>
            </div> <a href="/logout" className="nav_link"> <i className='bx bx-log-out nav_icon'></i> <span className="nav_name">Çıxış</span> </a>
            
        </nav>
      


    </div>

    </div>
    )
   
}

export default Navbar