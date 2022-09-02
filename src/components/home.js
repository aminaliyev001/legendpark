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
export default function Home() {
const date = new Date();
const firstDaylasthmonth = new Date(date.getFullYear(), date.getMonth()-1, 1);
const lastDaylastmonth = new Date(date.getFullYear(), date.getMonth(), 0);
const first_day = new Date(date.getFullYear(), date.getMonth(), 1);
const [value, onChange] = useState([first_day, date]);
const thismonth = date.getMonth();
const dateFrom2 = value[0]
const dateFrom = dateFrom2.getTime();
const dateTo2 = value[1]
const dateTo = dateTo2.getTime()
const [Expense,setExpense] = useState([])
const [Kapital,setKapital] = useState([])
const [Depozit,setDepozit] = useState([])
const [Medaxil,setMedaxil] = useState([])
const [Gelir,setGelir] = useState([])
const [Netgelir,setNetgelir] = useState([])
const [Ownerdraw,setOwnerdraw] = useState([])
const [Todolist,settodolist] = useState([])
/* --- */
useEffect(()=> {
  expensefunc()
  depozit()
  gelir()
  netgelir()
  ownerdraw()
  kapital()
  medaxil()
},[])

        
const expensefunc = ()=> {
Axios.get("http://localhost:5000/expense").then((response) => {
      const ac = response.data
       setExpense(ac)
        });
      }
      const depozit = ()=> {
        Axios.get("http://localhost:5000/depozit").then((response) => {
              const ac = response.data
              setDepozit(ac)
                });
           }
           const gelir = ()=> {
            Axios.get("http://localhost:5000/gelir").then((response) => {
                  const ac = response.data
                  setGelir(ac)
                    });
               }             
               const kapital = ()=> {
                Axios.get("http://localhost:5000/kapital").then((response) => {
                      const ac = response.data
                      setKapital(ac)
                        });
                   }
                   const medaxil = ()=> {
                    Axios.get("http://localhost:5000/medaxil").then((response) => {
                          const ac = response.data
                          setMedaxil(ac)
                            });
                       }
                       const netgelir = ()=> {
                        Axios.get("http://localhost:5000/netgelir").then((response) => {
                              const ac = response.data
                              setNetgelir(ac)
                                });
                           }    
                           const ownerdraw = ()=> {
                            Axios.get("http://localhost:5000/ownerdraw").then((response) => {
                                  const ac = response.data
                                  setOwnerdraw(ac)
                                    });
                               }              
      
      var expense_filter = Expense.filter(ab => new Date(ab.date).getTime()>=dateFrom && new Date(ab.date).getTime()<=dateTo)
      if(expense_filter===undefined ||  expense_filter.length==0) {
        var expense_value = 0;
      } else {
        var expense_value = expense_filter.map(bill => bill.value).reduce((acc, bill) => bill + acc);
      }
      var expense_filter_stat = Expense.filter(ab => new Date(ab.date).getTime()>=firstDaylasthmonth && new Date(ab.date).getTime()<=lastDaylastmonth)
      if(expense_filter_stat===undefined ||  expense_filter_stat.length==0) {
        var expense_value_stat = 0;
      } else {
        var expense_value_stat = expense_filter_stat.map(bill => bill.value).reduce((acc, bill) => bill + acc);
      }
      if(expense_value!=0 && expense_value_stat!=0) {
        var percent_expense = Number((expense_value/expense_value_stat)).toFixed(2);
        percent_expense *=100
      } else {
        var percent_expense = '_'
      }
      let iclas = "";
      let iclas2 = "";
      if(100-Number(percent_expense)>=0) {
        iclas="fa fa-arrow-down";
        iclas2 = "text-warning mr-2"
      } else {
        iclas="fa fa-arrow-up";
        iclas2 = "text-success mr-2"
      } 
/* */
var kapital_filter = Kapital.filter(ab => new Date(ab.date).getTime()>=dateFrom && new Date(ab.date).getTime()<=dateTo)
if(kapital_filter===undefined ||  kapital_filter.length==0) {
  var kapital_value = 0;
} else {
  var kapital_value = kapital_filter.map(bill => bill.value).reduce((acc, bill) => bill + acc);
}

var kapital_filter_stat = Kapital.filter(ab => new Date(ab.date).getTime()>=firstDaylasthmonth && new Date(ab.date).getTime()<=lastDaylastmonth)
if(kapital_filter_stat===undefined ||  kapital_filter_stat.length==0) {
  var kapital_value_stat = 0;
} else {
  var kapital_value_stat = kapital_filter_stat.map(bill => bill.value).reduce((acc, bill) => bill + acc);
}
if(kapital_value!=0 && kapital_value_stat!=0) {
  var percent_kapital = Number((kapital_value/kapital_value_stat)).toFixed(2);
  percent_kapital *=100
} else {
  var percent_kapital = '_'
}
let iclas_kapital = "";
let iclas2_kapital = "";
if(100-Number(percent_kapital)>=0) {
  iclas_kapital="fa fa-arrow-down";
  iclas2_kapital = "text-warning mr-2"
} else {
  iclas_kapital="fa fa-arrow-up";
  iclas2_kapital = "text-success mr-2"
} 

/* -- */
var depozit_filter = Depozit.filter(ab => new Date(ab.date).getTime()>=dateFrom && new Date(ab.date).getTime()<=dateTo)
if(depozit_filter===undefined ||  depozit_filter.length==0) {
  var depozit_value = 0;
} else {
  var depozit_value = depozit_filter.map(bill => bill.value).reduce((acc, bill) => bill + acc);
}

var depozit_filter_stat = Depozit.filter(ab => new Date(ab.date).getTime()>=firstDaylasthmonth && new Date(ab.date).getTime()<=lastDaylastmonth)
if(depozit_filter_stat===undefined ||  depozit_filter_stat.length==0) {
  var depozit_value_stat = 0;
} else {
  var depozit_value_stat = depozit_filter_stat.map(bill => bill.value).reduce((acc, bill) => bill + acc);
}
if(depozit_value!=0 && depozit_value_stat!=0) {
  var percent_depozit = Number((depozit_value/depozit_value_stat)).toFixed(2);
  percent_depozit *=100
} else {
  var percent_depozit = '_'
}
let iclas_depozit = "";
let iclas2_depozit = "";
if(100-Number(percent_depozit)>=0) {
  iclas_depozit="fa fa-arrow-down";
  iclas2_depozit = "text-warning mr-2"
} else {
  iclas_depozit="fa fa-arrow-up";
  iclas2_depozit = "text-success mr-2"
} 
/* -- */

var medaxil_filter = Medaxil.filter(ab => new Date(ab.date).getTime()>=dateFrom && new Date(ab.date).getTime()<=dateTo)
if(medaxil_filter===undefined ||  medaxil_filter.length==0) {
  var medaxil_value = 0;
} else {
  var medaxil_value = medaxil_filter.map(bill => bill.value).reduce((acc, bill) => bill + acc);
}
var medaxil_filter_stat = Medaxil.filter(ab => new Date(ab.date).getTime()>=firstDaylasthmonth && new Date(ab.date).getTime()<=lastDaylastmonth)
if(medaxil_filter_stat===undefined ||  medaxil_filter_stat.length==0) {
  var medaxil_value_stat = 0;
} else {
  var medaxil_value_stat = medaxil_filter_stat.map(bill => bill.value).reduce((acc, bill) => bill + acc);
}
if(medaxil_value!=0 && medaxil_value_stat!=0) {
  var percent_medaxil = Number((medaxil_value/medaxil_value_stat)).toFixed(2);
  percent_medaxil *=100
} else {
  var percent_medaxil = '_'
}
let iclas_medaxil = "";
let iclas2_medaxil = "";
if(100-Number(percent_medaxil)>=0) {
  iclas_medaxil="fa fa-arrow-down";
  iclas2_medaxil = "text-warning mr-2"
} else {
  iclas_medaxil="fa fa-arrow-up";
  iclas2_medaxil = "text-success mr-2"
} 

/* -- */
var gelir_filter = Gelir.filter(ab => new Date(ab.date).getTime()>=dateFrom && new Date(ab.date).getTime()<=dateTo)
if(gelir_filter===undefined ||  gelir_filter.length==0) {
  var gelir_value = 0;
} else {
  var gelir_value = gelir_filter.map(bill => bill.value).reduce((acc, bill) => bill + acc);
}

var gelir_filter_stat = Gelir.filter(ab => new Date(ab.date).getTime()>=firstDaylasthmonth && new Date(ab.date).getTime()<=lastDaylastmonth)
if(gelir_filter_stat===undefined ||  gelir_filter_stat.length==0) {
  var gelir_value_stat = 0;
} else {
  var gelir_value_stat = gelir_filter_stat.map(bill => bill.value).reduce((acc, bill) => bill + acc);
}
if(gelir_value!=0 && gelir_value_stat!=0) {
  var percent_gelir = Number((gelir_value/gelir_value_stat)).toFixed(2);
  percent_gelir *=100
} else {
  var percent_gelir = '_'
}
let iclas_gelir = "";
let iclas2_gelir = "";
if(100-Number(percent_gelir)>=0) {
  iclas_gelir="fa fa-arrow-down";
  iclas2_gelir = "text-warning mr-2"
} else {
  iclas_gelir="fa fa-arrow-up";
  iclas2_gelir = "text-success mr-2"
} 
/* -- */

var netgelir_filter = Netgelir.filter(ab => new Date(ab.date).getTime()>=dateFrom && new Date(ab.date).getTime()<=dateTo)
if(netgelir_filter===undefined ||  netgelir_filter.length==0) {
  var netgelir_value = 0;
} else {
  var netgelir_value = netgelir_filter.map(bill => bill.value).reduce((acc, bill) => bill + acc);
}
var netgelir_filter_stat = Netgelir.filter(ab => new Date(ab.date).getTime()>=firstDaylasthmonth && new Date(ab.date).getTime()<=lastDaylastmonth)
if(netgelir_filter_stat===undefined ||  netgelir_filter_stat.length==0) {
  var netgelir_value_stat = 0;
} else {
  var netgelir_value_stat = netgelir_filter_stat.map(bill => bill.value).reduce((acc, bill) => bill + acc);
}
if(netgelir_value!=0 && netgelir_value_stat!=0) {
  var percent_netgelir = Number((netgelir_value/netgelir_value_stat)).toFixed(2);
  percent_netgelir *=100
} else {
  var percent_netgelir = '_'
}
let iclas_netgelir = "";
let iclas2_netgelir = "";
if(100-Number(percent_netgelir)>=0) {
  iclas_netgelir="fa fa-arrow-down";
  iclas2_netgelir = "text-warning mr-2"
} else {
  iclas_netgelir="fa fa-arrow-up";
  iclas2_netgelir = "text-success mr-2"
} 
/* -- */

var netqazanc_value = netgelir_value-expense_value;
var netqazanc_stat = netgelir_value_stat-expense_value_stat;
if(netqazanc_value!=0 && netqazanc_stat!=0) {
  var percent_netqazanc = Number((netqazanc_value/netqazanc_stat)).toFixed(2);
  percent_netqazanc *=100
} else {
  var percent_netqazanc = '_'
}
let iclas_netqazanc = "";
let iclas2_netqazanc = "";
if(100-Number(percent_netqazanc)>=0) {
  iclas_netqazanc="fa fa-arrow-down";
  iclas2_netqazanc = "text-warning mr-2"
} else {
  iclas_netqazanc="fa fa-arrow-up";
  iclas2_netqazanc = "text-success mr-2"
} 

/* -- */

var ownerdraw_filter = Ownerdraw.filter(ab => new Date(ab.date).getTime()>=dateFrom && new Date(ab.date).getTime()<=dateTo)
if(ownerdraw_filter===undefined ||  ownerdraw_filter.length==0) {
  var ownerdraw_value = 0;
} else {
  var ownerdraw_value = ownerdraw_filter.map(bill => bill.value).reduce((acc, bill) => bill + acc);
}
var ownerdraw_filter_stat = Ownerdraw.filter(ab => new Date(ab.date).getTime()>=firstDaylasthmonth && new Date(ab.date).getTime()<=lastDaylastmonth)
if(ownerdraw_filter_stat===undefined ||  ownerdraw_filter_stat.length==0) {
  var ownerdraw_value_stat = 0;
} else {
  var ownerdraw_value_stat = ownerdraw_filter_stat.map(bill => bill.value).reduce((acc, bill) => bill + acc);
}
if(ownerdraw_value!=0 && ownerdraw_value_stat!=0) {
  var percent_ownerdraw = Number((ownerdraw_value/ownerdraw_value_stat)).toFixed(2);
  percent_ownerdraw *=100
} else {
  var percent_ownerdraw = '_'
}
let iclas_ownerdraw = "";
let iclas2_ownerdraw = "";
if(100-Number(percent_ownerdraw)>=0) {
  iclas_ownerdraw="fa fa-arrow-down";
  iclas2_ownerdraw = "text-warning mr-2"
} else {
  iclas_ownerdraw="fa fa-arrow-up";
  iclas2_ownerdraw = "text-success mr-2"
} 
/* -- */

var remainder_value = medaxil_value-expense_value;
var remainder_stat = medaxil_value_stat-expense_value_stat;
if(remainder_value!=0 && remainder_stat!=0) {
  var percent_remainder = Number((remainder_value/remainder_stat)).toFixed(2);
  percent_remainder *=100
} else {
  var percent_remainder = '_'
}
let iclas_remainder = "";
let iclas2_remainder = "";
if(100-Number(percent_remainder)>=0) {
  iclas_remainder="fa fa-arrow-down";
  iclas2_remainder = "text-warning mr-2"
} else {
  iclas_remainder="fa fa-arrow-up";
  iclas2_remainder = "text-success mr-2"
} 

/* -- */

var kassa_value = remainder_value-ownerdraw_value;
var kassa_stat = remainder_stat-ownerdraw_value_stat;
if(kassa_value!=0 && kassa_stat!=0) {
  var percent_kassa = Number((kassa_value/kassa_stat)).toFixed(2);
  percent_kassa *=100
} else {
  var percent_kassa = '_'
}
let iclas_kassa = "";
let iclas2_kassa = "";
if(100-Number(percent_kassa)>=0) {
  iclas_kassa="fa fa-arrow-down";
  iclas2_kassa = "text-warning mr-2"
} else {
  iclas_kassa="fa fa-arrow-up";
  iclas2_kassa = "text-success mr-2"
} 


const datetimerange = (ah) => {
  onChange(ah);
}

return (
    <>

        <Navbar page="a" />
        <DateTimeRangePicker onChange={(ah)=>datetimerange(ah)} value={value} format={'y-MM-dd'} />
      <div className="main-content">
    <div className="bg-gradient-primary">
      <div className="container-fluid">
        <h2 className="">Stat</h2>
        <div className="header-body">
          <div className="row">
          <div className="col-xl-3 col-lg-6 boxes">
              <div className="card card-stats mb-4 mb-xl-0">
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <h5 className="card-title text-uppercase text-muted mb-0">Xərclər</h5>
                      <span className="h2 font-weight-bold mb-0">{expense_value}₼ </span>
                    </div>
                    
                  </div>
                  <p className="mt-0 mb-0 text-muted text-sm" id='op'>
                    <span className={iclas2}><i className={iclas}></i>{ percent_expense!='_' ? Math.round(Math.abs(100-percent_expense),2)  : 0}%</span>
                    <span className="text-nowrap"> Keçən aya nisbətən</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 boxes">
              <div className="card card-stats mb-4 mb-xl-0">
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <h5 className="card-title text-uppercase text-muted mb-0">Kapital</h5>
                      <span className="h2 font-weight-bold mb-0">{kapital_value}₼</span>
                    </div>
                    
                  </div>
                  <p className="mt-0 mb-0 text-muted text-sm" id='op'>
                    <span className={iclas2_kapital}><i className={iclas_kapital}></i>{ percent_kapital!='_' ? Math.round(Math.abs(100-percent_kapital),2)  : 0}%</span>
                    <span className="text-nowrap"> Keçən aya nisbətən</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 boxes">
              <div className="card card-stats mb-4 mb-xl-0">
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <h5 className="card-title text-uppercase text-muted mb-0">Depozit</h5>
                      <span className="h2 font-weight-bold mb-0">{depozit_value}₼</span>
                    </div>
                    
                  </div>
                  <p className="mt-0 mb-0 text-muted text-sm" id='op'>
                    <span className={iclas2_depozit}><i className={iclas_depozit}></i>{ percent_depozit!='_' ? Math.round(Math.abs(100-percent_depozit),2)  : 0}%</span>
                    <span className="text-nowrap"> Keçən aya nisbətən</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 boxes">
              <div className="card card-stats mb-4 mb-xl-0">
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <h5 className="card-title text-uppercase text-muted mb-0">Mədaxil</h5>
                      <span className="h2 font-weight-bold mb-0">{medaxil_value}₼</span>
                    </div>
                    
                  </div>
                  <p className="mt-0 mb-0 text-muted text-sm" id='op'>
                    <span className={iclas2_medaxil}><i className={iclas_medaxil}></i>{ percent_medaxil!='_' ? Math.round(Math.abs(100-percent_medaxil),2) : 0}%</span>
                    <span className="text-nowrap"> Keçən aya nisbətən</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 boxes">
              <div className="card card-stats mb-4 mb-xl-0">
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <h5 className="card-title text-uppercase text-muted mb-0">Gəlir</h5>
                      <span className="h2 font-weight-bold mb-0">{gelir_value}₼</span>
                    </div>
                    
                  </div>
                  <p className="mt-0 mb-0 text-muted text-sm" id='op'>
                    <span className={iclas2_gelir}><i className={iclas_gelir}></i>{ percent_gelir!='_' ? Math.round(Math.abs(100-percent_gelir),2)  : 0}%</span>
                    <span className="text-nowrap"> Keçən aya nisbətən</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 boxes">
              <div className="card card-stats mb-4 mb-xl-0">
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <h5 className="card-title text-uppercase text-muted mb-0">Net gəlir</h5>
                      <span className="h2 font-weight-bold mb-0">{netgelir_value}₼</span>
                    </div>
                    
                  </div>
                  <p className="mt-0 mb-0 text-muted text-sm" id='op'>
                    <span className={iclas2_netgelir}><i className={iclas_netgelir}></i>{ percent_netgelir!='_' ? Math.round(Math.abs(100-percent_netgelir),2)  : 0}%</span>
                    <span className="text-nowrap"> Keçən aya nisbətən</span>
                  </p>
                </div>
              </div>
            </div>


            <div className="col-xl-3 col-lg-6 boxes">
              <div className="card card-stats mb-4 mb-xl-0">
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <h5 className="card-title text-uppercase text-muted mb-0">Net qazanc</h5>
                      <span className="h2 font-weight-bold mb-0">{netqazanc_value}₼</span>
                    </div>
                    
                  </div>
                  <p className="mt-0 mb-0 text-muted text-sm" id='op'>
                    <span className={iclas2_netqazanc}><i className={iclas_netqazanc}></i>{ percent_netqazanc!='_' ? Math.round(Math.abs(100-percent_netqazanc),2)  : 0}%</span>
                    <span className="text-nowrap"> Keçən aya nisbətən</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-lg-6 boxes">
              <div className="card card-stats mb-4 mb-xl-0">
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <h5 className="card-title text-uppercase text-muted mb-0">Rəhbərin tirajı</h5>
                      <span className="h2 font-weight-bold mb-0">{ownerdraw_value}₼</span>
                    </div>
                    
                  </div>
                  <p className="mt-0 mb-0 text-muted text-sm" id='op'>
                    <span className={iclas2_ownerdraw}><i className={iclas_ownerdraw}></i>{ percent_ownerdraw!='_' ? Math.round(Math.abs(100-percent_ownerdraw),2)  : 0}%</span>
                    <span className="text-nowrap"> Keçən aya nisbətən</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-lg-6 boxes">
              <div className="card card-stats mb-4 mb-xl-0">
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <h5 className="card-title text-uppercase text-muted mb-0">QALIQ</h5>
                      <span className="h2 font-weight-bold mb-0">{remainder_value}₼</span>
                    </div>
                    
                  </div>
                  <p className="mt-0 mb-0 text-muted text-sm" id='op'>
                    <span className={iclas2_remainder}><i className={iclas_remainder}></i>{ percent_remainder!='_' ? Math.round(Math.abs(100-percent_remainder),2)  : 0}%</span>
                    <span className="text-nowrap"> Keçən aya nisbətən</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-lg-6 boxes">
              <div className="card card-stats mb-4 mb-xl-0">
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <h5 className="card-title text-uppercase text-muted mb-0">KASSA</h5>
                      <span className="h2 font-weight-bold mb-0">{kassa_value}₼</span>
                    </div>
                    <div className="col-auto">
                      <div className="icon icon-shape text-white rounded-circle shadow"style={{float:'right',backgroundColor:'#28364E'}}>
                      <i className="fas fa-cash-register i-cust"></i>
                                                                </div>
                    </div>
                  </div>
                  <p className="mt-0 mb-0 text-muted text-sm" id='op'style={{marginTop:'-40px'}}>
                    <span className={iclas2_kassa}><i className={iclas_kassa}></i>{ percent_kassa!='_' ? Math.round(Math.abs(100-percent_kassa),2)  : 0}%</span>
                    <span className="text-nowrap"> Keçən aya nisbətən</span>
                  </p>
                </div>
              </div>
            </div>



          </div>
        </div>
      </div>
    </div>
  </div>
  <hr />
  {
    <Reminder arg={Todolist} />
  }
    </>
    
  )
}
