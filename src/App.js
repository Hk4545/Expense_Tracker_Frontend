import logo from './logo.svg';
import './App.css';
import react, {useState} from 'react';
import Graph from './components/Graph';
import Form from './components/Form';
function App() {
  const [refresh, setRefresh] = useState(false);
  const handleRefresh = () => {
    setRefresh(!refresh);
  }
  // const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  // const currentDate = new Date();
  // const currentYear = currentDate.getFullYear();
  return (
    <div className="App">
      <div className="container">
        <h1 className="expensehead">Expense Tracker</h1>
        {/* <div>
          <select style={{height:"25px", minWidth:"200px", marginTop:"10px", marginBottom:"30px"}}>
            <option value="">Select Month</option>
            {months.map((el, index) => (
              <option key={index} value={index + 1}>{el}</option>
            ))}
          </select>

          <select style={{height:"25px", minWidth:"200px", marginTop:"10px", marginBottom:"30px", marginLeft:"15px"}}>
            <option value="">Select Year</option>
            {Array.from({ length: 4 }, (_, index) => (
              <option key={index} value={currentYear - index}>{currentYear - index}</option>
            ))}
          </select>


        </div> */}
        <div className="contentdiv">
          <Graph change={refresh}/>
          <Form onRefresh={handleRefresh}/>
        </div>
      </div>
    </div>
  );
}

export default App;
