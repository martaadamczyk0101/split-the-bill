import React from 'react'
import { useState, useEffect} from 'react';
import Navbar from './Navbar'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'
import { AllCheckerCheckbox, Checkbox, CheckboxGroup } from '@createnl/grouped-checkboxes';

function AddSpending({spendingList, getHistory, eventTitle}) {

  const [expense, setExpense]= useState(0);
  const [checkedPeople, setCheckedPeople] = useState([]);
  const [payingPersonID, setPayingPersonID]= useState(0);
  const [title, setTitle]= useState('');
  const [history, setHistory]=useState([]);
  const [expenseButton, setExpenseButton]=useState(true);
  const [buttonText, setButtonText]=useState(['ADD EXPENSE']);
  const [isSaved, setIsSaved]=useState(false);
  var priceEach;
  var payingPersonName= spendingList[0].name;
  var paidForNames='';
  var checked=[];
  let navigate=useNavigate();

  spendingList.map((person) => (
    checked.push(person.id)
  ))

  useEffect(()=>{
    checkButton()
  },[checkedPeople, title, expense])

  const deletePerson=(del_id)=>{
    setCheckedPeople(checkedPeople.filter(id=> id !== del_id))
  } 

  const handleCheckbox = (e, person) => {
    if(e.target.checked){
      setCheckedPeople([...checkedPeople, person.id])
    }
    else{
      deletePerson(person.id)
    }
  };

  const handleCheckboxEveryone=(e)=> {
    if(e.target.checked){
        setCheckedPeople(checked)
    }
    else{
        setCheckedPeople([])
      }
    }

  useEffect(()=>{
    getHistory(history)
  },[history])

  const handleDropdown=(e)=>{
      setPayingPersonID(e.target.value)
      checkButton()
  }

  const checkButton=()=>{
    if(checkedPeople.length>0 & title!=='' & expense !==0){
      setExpenseButton(false)
    }
    else{
      setExpenseButton(true)
    }
  }

  const makeNewExpense=()=>{
    setButtonText('EXPENSE SAVED')
    setIsSaved(current => !current)

      spendingList.map((person) => {
        if(person.id === payingPersonID){
          payingPersonName= person.name;
          person.spending+=Number(expense)
          person.saldo=person.spending-person.debt
        }
      })

      priceEach=expense/checkedPeople.length;

      spendingList.map((person) => {
        checkedPeople.map((id) => {
          if(person.id === id){
            if(checkedPeople.length === spendingList.length){
              paidForNames='Everyone'
            }
            else if(paidForNames !== ''){
              paidForNames= paidForNames+', '+person.name
            }
            else{
              paidForNames= paidForNames+person.name
            }
            person.debt+=priceEach
            person.saldo=person.spending-person.debt
          }
        })
      })

      setHistory([...history, {title:title.charAt(0).toUpperCase() + title.slice(1), amount:expense ,paidBy:payingPersonName, paidFor:paidForNames, dividedBy: checkedPeople.length, amountEach:(expense/checkedPeople.length).toFixed(2)}])
      setTimeout(() => navigate('/history'), 1000);
  }
  return (
    <div className='add-spending-div'>
      <img className='people-img' id='people2-img' alt='people' src={require('./img/people2.png')}></img>
          <div className='event-div-outer'>
            <div className='event-circles-title'>
            <div className='circles-div'>
                <div className='circle'></div>
                <div className='circle'></div>
                <div className='circle'></div>
            </div>
            <div className='event-title-top'><div className='event-title-tab'><p className='event-title-tab-text'>{eventTitle}</p></div></div>
            </div>
      <div className='event-div'>
        <Navbar/>
        <div className='add-div'>
          <div>
            <label className='label'>Who paid?
            <div className='select'>
              <select className='input-top' onChange={(e)=>{handleDropdown(e)}}>
                {spendingList.map((person) => {
                          return <option value={person.id} key={person.id}>{person.name}</option>
                      })}
              </select>
              <div className="select-arrow"></div>
            </div>
            </label>
          </div>
          <div>
            <CheckboxGroup>
              <label className='label'><p id='for-who-label'>For who?</p><label className='everyone-checkbox'><AllCheckerCheckbox className='everyone-checkbox-input' onChange={(e)=>handleCheckboxEveryone(e)}/>Everyone</label>
            <div className='for-who-div'>
            {spendingList.map((person) => {
                        return <label key={person.id}><Checkbox className='for-who-row' key={person.id} onChange={(e)=>handleCheckbox(e, person)}></Checkbox>{person.name}</label>
                    })}
            </div>   
            </label>
            </CheckboxGroup>
          </div>
          <label className='label'>For what?<input className='input-top' placeholder='Spending title...' onChange={(event) => {
                  setTitle(event.target.value)
                  checkButton()
                }}></input></label>
          <label        
              className='label'>How much?<input className='input-top' placeholder='Amount...'  type='number' min='0' onChange={(event) => {
                  setExpense(event.target.value)
                  checkButton()
              }}></input><div className='currency-holder'><p className='currency' >PLN</p></div></label>
          <button 
                  style={{
                    backgroundColor: isSaved ? 'rgb(190,229,176)' : '',
                    borderStyle: isSaved ? 'solid': '',
                    boxShadow: isSaved ? '0px 0px 0px 1px rgba(0,0,0,0.3)':'',}}
          className='make-expense-button'disabled={expenseButton} onClick={makeNewExpense}>{buttonText}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddSpending