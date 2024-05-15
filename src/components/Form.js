import react, { useEffect, useState } from 'react'
import History from './History'
import axios from 'axios';


function Form({ onRefresh }){
   const [details, setDetails] = useState({
    name:"",
    type:"Investment",
    amount:""
   })
   const [refresh, setrefresh] = useState(false);

    const handleSubmit = async () => {

        if(details.name == ""){
            alert("Name can't be null")
            return;
        }

        const res = await axios.post("http://localhost:8080/api/transaction", details)
        setDetails({
            name:"",
            type:"Investment",
            amount:""
        })
        setrefresh(!refresh)
        onRefresh();
    }

    const handleChange = (e) => {
        const lab = e.target.name;
        const {value} = e.target;
        setDetails(prevDetails => ({
            ...prevDetails,
            [lab]: value
        }));
    }
    
    return(
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <h2>Transaction</h2>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <input name='name' value={details.name} onChange={handleChange} type='text' placeholder='Rent, SIP, etc' style={{width:"250px", marginBottom: "15px", height:"25px"}}/>
                <select name="type" value={details.type} style={{width:"260px", marginBottom: "15px", height:"30px"}} onChange={handleChange}>
                    <option value='Investment'>Investment</option>
                    <option value='Savings'>Savings</option>
                    <option value='Expense'>Expense</option>
                </select>
                <input  name='amount' value={details.amount} type='number' onChange={handleChange} style={{width:"250px", marginBottom: "15px", height:"25px"}}/>
                <button style={{width:"260px", marginBottom: "15px", height:"30px", backgroundColor:"#7534ed", border:"none", color:"white", cursor:"pointer"}} onClick={handleSubmit}>
                    Save
                </button>
            </div>
            <History submit={refresh}  onRefresh={onRefresh}/>
</div>



    )
}

export default Form
