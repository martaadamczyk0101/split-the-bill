import Navbar from './Navbar'
import './Navbar.css'

function History({spendingList, history, eventTitle}) {

  return (
    <div className='history'>
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
              {history.length > 0 &&
              <div className='history-outer'>
                  {history.map((record)=>{
                    return <div className='display-history-record' key={record.id}>
                              <div className='history-title-amount'>
                                <p className='history-record-p-up' id='history-record-title'>{record.title}</p>
                                <div className='history-amount-pln'>
                                  <p className='history-record-p-up' id='history-record-amount'>{record.amount}</p>
                                  <p className='pln-p'>PLN</p>
                                </div>
                              </div>
                                <hr className='line2'></hr>
                                <p className='history-record-p'>Paid by: {record.paidBy}</p>
                                <p className='history-record-p'>For: {record.paidFor}</p>
                                <p className='history-record-p'>Amount each: {record.amountEach} zł</p>
                          </div>
                  })}
            </div>
            }
            {history.length === 0 &&
            <div className='history-before'>Add your first expense to see <b>History</b></div>
            }
          </div>
        </div>
    </div>
  )
}
export default History