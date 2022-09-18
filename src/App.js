import './App.css';
import AddSpending from './components/AddSpending';
import './components/AddSpending.css';
import NewEvent from './components/NewEvent';
import './components/NewEvent.css';
import { useState } from 'react';
import History from './components/History';
import './components/History.css';
import Balance from './components/Balance';
import './components/Balance.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {

  const [spendingList, setSpendingList]=useState([])
  const [eventTitle, setEventTitle]= useState('')
  const [history, setHistory]=useState([])
  const [index, setIndex] = useState(0);

  const getSpendingList=(data)=>{
    setSpendingList(data)
  }

  const getEventTitle=(data)=>{
    setEventTitle(data)
  }

  const getHistory=(data)=>{
    let temp = history;
    if (data.length > 0) {
      data[data.length - 1].id = index;
      temp.push(data[data.length - 1]);
      setIndex(index+1);
    }
    setHistory(temp);
  }

  return (
    <div className="App">
      <BrowserRouter basename='/split-the-bill'>
        <Routes>
              <Route path="/" element={<NewEvent getSpendingList={getSpendingList} getEventTitle={getEventTitle}/>} />
              <Route path="/new-expense" element={<AddSpending spendingList={spendingList} getHistory={getHistory} eventTitle={eventTitle}/>}/>
              <Route path="/history" element={<History spendingList={spendingList} history={history} eventTitle={eventTitle}/>} />
              <Route path="/Balance" element={<Balance spendingList={spendingList} history={history} eventTitle={eventTitle}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
