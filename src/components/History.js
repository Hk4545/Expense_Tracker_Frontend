import react, { useEffect, useState } from 'react'
import 'boxicons';
import axios from 'axios'


function History(props){
    const { submit, onRefresh } = props;
    const [transactionArray, setTransactionArray] = useState([]);
    const [refresh, setrefresh] = useState(false);
    const [modal, setModal] = useState(false);
    const [selectedId, setSelectedId] = useState("")
    const [details, setDetails] = useState({
        name:"",
        type:"Investment",
        amount:""
       })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/transaction");
                setTransactionArray(response.data);
                console.log(response.data);
            } catch (error) {
                console.log("Error fetching data:", error);
            }
        };

        fetchData(); 
    }, [refresh, submit]);

    const deleteTransaction = async(id) => {
        try {
            const res = await axios.delete(`http://localhost:8080/api/delete_transaction/${id}`);
            console.log(res.data);
            setrefresh((prevRefresh) => !prevRefresh);
            onRefresh();
        } catch (error) {
            console.error("Error deleting transaction:", error);
        }
    }

    const pencilclicked = (ele) => {
        setModal(true);

        setDetails({
            name: ele.name,
            type: ele.type,
            amount: ele.amount
        })
        setSelectedId(ele._id);

    }

   
        const handleChange = (e) => {
            const lab = e.target.name;
            const {value} = e.target;
            setDetails(prevDetails => ({
                ...prevDetails,
                [lab]: value
            }));
        }
    

        const handleedit = async () => {
            try {
                if(details.name == ""){
                    alert("Name can't be null")
                    return;
                }
                const res = await axios.put(`http://localhost:8080/api/update_transaction/${selectedId}`, {
                    name: details.name,
                    type: details.type,
                    amount: details.amount
                });
                console.log(res.data);
                console.log(selectedId);
                setrefresh((prevRefresh) => !prevRefresh);
                onRefresh();
                setModal(false);
            } catch (error) {
                console.error("Error updating transaction:", error);
                
            }
        };
        


    return (
        <div style={{display:"flex", flexDirection:"column", gap:"5px", padding:"10px 0px"}}>
            <h2>History</h2>
            
            {transactionArray.map((el) => {
                let color = el.type === "Investment" ? "rgb(54, 162, 235)" : el.type === "Expense" ? "rgb(255, 205, 86)" : "rgb(255, 99, 132)";

                return (
                    <div style={{ border: "1px solid lightgray", borderRight: `2px solid ${color}`, display: "flex", justifyContent: "space-between", padding: "5px 20px 5px 10px", borderRadius: "5px", minWidth: "280px", marginTop: "10px" }} key={el._id}>
                        <div><button style={{ border: "none", background: "white", cursor: "pointer" }} onClick={() => deleteTransaction(el._id)}>
                            <box-icon size="15px" name='trash'></box-icon>
                        </button>
                        <button style={{ border: "none", background: "white", cursor: "pointer" }} onClick={() => pencilclicked(el)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                            </svg>
                        </button></div>
                        <span style={{ display: "block", fontWeight:"bold" }} >{el.name}</span>
                        <span style={{ display: "block" }}><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-currency-rupee" viewBox="0 0 16 16">
                            <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4z"/>
                            </svg>{el.amount}</span>
                    </div>
                );
            })}

            {modal && (<div style={{ width: "100%", height: "100%", zIndex: "4", position: "fixed", top: 0, left: 0, backdropFilter: "blur(5px)", background: "rgba(255, 255, 255, 0.8)" }}>
            <div style={{ position: "absolute", top: '35%', left: "40%", border:"2px solid black", padding:"15px", borderRadius:"8px" }}>
                <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <input name='name' type='text' placeholder='Rent, SIP, etc' style={{width:"250px", marginBottom: "15px", height:"25px"}} value={details.name} onChange={handleChange}/>
                    <select name="type" value={details.type} style={{width:"260px", marginBottom: "15px", height:"30px"}} onChange={handleChange}>
                        <option value='Investment'>Investment</option>
                        <option value='Savings'>Savings</option>
                        <option value='Expense'>Expense</option>
                    </select>
                    <input  name='amount' value={details.amount} type='number' onChange={handleChange} style={{width:"250px", marginBottom: "15px", height:"25px"}}/>
                    <div style={{display:"flex", gap:"10px"}}>
                        <button style={{width:"130px", marginBottom: "15px", height:"30px", backgroundColor:"white", color:"#7534ed", border:"1px solid #7534ed", borderRadius:"5px", cursor:"pointer"}} onClick={() => setModal(false)}>
                            Cancel
                        </button>
                        <button style={{width:"130px", marginBottom: "15px", height:"30px", backgroundColor:"#7534ed", color:"white", border:"none", borderRadius:"5px", cursor:"pointer"}} onClick={handleedit}>
                            Save
                        </button>
                    
                    </div>
                </div>
            </div>
            </div>)}



    
        </div>
    )
}

export default History;