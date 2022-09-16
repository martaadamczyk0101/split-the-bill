import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function NewEvent({getSpendingList, getEventTitle}) {

    const [name, setName]=useState('')
    const [index, setIndex]=useState(0)
    const [spendingList, setSpendingList]= useState([])
    const [buttonValue, setButtonValue]=useState(true);
    const [eventName, setEventName]=useState('');
    const [isCreated, setIsCreated]=useState(false);
    const [createdButtonText, setCreatedButtonText]=useState(['CREATE A SPENDING RECORD']);
    let navigate=useNavigate();

    const deletePerson=(del_id)=>{
        setSpendingList(spendingList.filter((person)=> person.id !== del_id))
        if(spendingList.length<3){
            setButtonValue(true)
        }
    }

    const addPerson=()=>{
        if(name)
        {
            setSpendingList([...spendingList, {id:index,name:name.charAt(0).toUpperCase() + name.slice(1), spending:0, debt:0, saldo:0}]);
            setIndex(index+1)
        }
        setName("");
        if(spendingList.length >0){
            setButtonValue(false)
        }
    }

    const startRecord=()=>{
        getSpendingList(spendingList)
        getEventTitle(eventName.charAt(0).toUpperCase() + eventName.slice(1))
        setCreatedButtonText('SPENDING RECORD CREATED')
        setIsCreated(current => !current)

        setTimeout(() => navigate("/new-expense"), 1000);
    }

  return (
    <div className='event-body'>
        <img className='people-img' alt='people' src={require('./img/people.png')}></img>
        <div className='event-div-outer'>
            <div className='circles-div'>
                <div className='circle'></div>
                <div className='circle'></div>
                <div className='circle'></div>
            </div>
        <div className='event-div'>
            <h1 className='event-title'>NEW SPENDING RECORD</h1>
            <hr className='hr-line'/>
            <label className='input-label'>Event title<input className='create-event-input' id='input-title' type='text' spellcheck="false" value={eventName} maxLength="30" placeholder='Title...' onChange={(event) => {
                        setEventName(event.target.value)
                }}></input></label>
            <div className='add-person-div'>
                <label className='input-label' id='input-label-name'>Who takes part?<input className='create-event-input' id='input-name' type='text' spellcheck="false" value={name} maxLength="20" placeholder="Name..." onChange={(event) => {
                        setName(event.target.value)
                        }}></input></label>
                <button className='save-button' id='add-name-button' onClick={addPerson} ><p className='button-image'>+</p></button>
            </div>
            <div className='display-names'>
                    {spendingList.map((person) => {
                        return <p className='person-name' key={person.id}>{person.name} 
                            <button className='delete-button'onClick={()=>deletePerson(person.id)}>x</button>
                        </p>
                    })}
            </div>
            <button disabled={buttonValue} className='save-button' id='create-spending-button' onClick={startRecord} 
            style={{
                backgroundColor: isCreated ? 'rgb(190,229,176)' : '',
                borderStyle: isCreated ? 'solid': '',
                boxShadow: isCreated ? '0px 0px 0px 1px rgba(0,0,0,0.3)':'',}}
            >{createdButtonText}</button>
        </div>
        </div>
    </div>
  )
}

export default NewEvent