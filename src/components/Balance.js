import React from 'react'
import Navbar from './Navbar'
import './Navbar.css'
import BarChart from './BarChart'
import { useState } from 'react'

function Balance({spendingList, history, eventTitle}) {

  var transfers=[]
  const [transferData, setTransferData]= useState([])
  const [nextPage, setNextPage]= useState(true)
  
  const cashTransfers=()=>{
    var copySpending=structuredClone(spendingList)
    copySpending.sort((a,b)=> b.saldo - a.saldo)

    copySpending= structuredClone(copySpending.filter(person => person.saldo !== 0))
    var lastIndex= copySpending.length-1

    while(copySpending.length>1){
      if(copySpending[0].saldo > Number(Math.abs(copySpending[lastIndex].saldo))){
        transfers.push({payingPerson: copySpending[lastIndex].name, amount:Number(Math.abs(copySpending[lastIndex].saldo).toFixed(2)), payingTo: copySpending[0].name})

        copySpending[0].saldo = Number(copySpending[0].saldo - Math.abs(copySpending[lastIndex].saldo).toFixed(2));
        copySpending[lastIndex].saldo = 0;

      }
      else if(copySpending[0].saldo < Number(Math.abs(copySpending[lastIndex].saldo))){
        transfers.push({payingPerson: copySpending[lastIndex].name, amount: Number(copySpending[0].saldo.toFixed(2)), payingTo: copySpending[0].name})

        copySpending[lastIndex].saldo = Number((copySpending[lastIndex].saldo + copySpending[0].saldo).toFixed(2));
        copySpending[0].saldo = 0;
      }
      else{
        transfers.push({payingPerson: copySpending[lastIndex].name, amount: Number(copySpending[0].saldo.toFixed(2)), payingTo: copySpending[0].name})

        copySpending[0].saldo = 0;
        copySpending[lastIndex].saldo = 0;
      }

      copySpending= structuredClone(copySpending.filter(person => person.saldo !== 0))
      lastIndex= copySpending.length-1
      copySpending.sort((a,b) => b.saldo - a.saldo)
    }

    transfers=transfers.sort((a,b)=> a.payingPerson.localeCompare(b.payingPerson))
    setTransferData(transfers)
}

  return (
    <div className='saldo-div'>
      <div className='event-div-outer'>
      <div className='event-circles-title'>
            <div className='circles-div'>
                <div className='circle'></div>
                <div className='circle'></div>
                <div className='circle'></div>
            </div>
            <div className='event-title-top'><div className='event-title-tab'><p className='event-title-tab-text'>{eventTitle}</p></div></div>
            </div>
            <div className='event-div' id='event-div-saldo'>
          <Navbar/>
          { history.length > 0 &&
            <>
            { nextPage ?
            <div className='barchart-button-div'>
              <div className='barchart-div'>
                <BarChart spendingList={spendingList}/>
              </div>
              <button className='next-page-button' onClick= {()=>{
                setNextPage(false)
                cashTransfers()
              }}></button>
            </div>
            :
            <>
            <p className='transfers-title'>How to settle debts?</p>
              <div className='barchart-button-div transfers'>
                <button className='next-page-button previous' onClick= {()=>{
                  setNextPage(true)
                }}></button>              
                <div className='transfers-div'>
                {transferData.map((transfer) => {
                    return <div className='transfer-row'>
                        <div className='transfer-icon'></div>
                        <div className='transfer-row-text'>
                          <p className='transfer-name'>{transfer.payingPerson}<p className='small-text-transfers'>TRANSFERS</p>{transfer.payingTo}</p> 
                          <hr className='line'></hr>
                          <div className='transfer-amount'><p className='transfer-amount-text'>{transfer.amount}</p><p className='pln-amount'>PLN</p></div>
                        </div>
                      </div>
                })}
                </div>
              </div>
              </>
            }</>
            }

            {history.length === 0 && 
            <div className='saldo-before'>Add your first expense to see <b>Balance</b></div>}
          </div>
        </div>
    </div>
  )
}

export default Balance