import react, {useState, useEffect} from 'react'
import axios from 'axios'


function Label(props){

    const change4 = props.change3;
    const [transactionArray, setTransactionArray] = useState([]);
    const [incount, setincount] = useState(0)
    const [excount, setexcount] = useState(0)
    const [savcount, setsavcount] = useState(0)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/transaction");
                setTransactionArray(response.data);
                console.log(response.data);
                if(!response.data){
                    return;
                }
                let temp = 0;
                let temp1 = 0; 
                let temp2 = 0;
                response.data.forEach((el) => {
                    if(el.type === "Investment"){
                        temp += el.amount
                        // setincount(incount + el.amount)
                    }
                    else if (el.type === "Savings"){
                        // setsavcount(savcount + el.amount)
                        temp1 += el.amount
                    }
                    else{
                        // setexcount(excount + el.amount)
                        temp2 += el.amount
                    }
                })

                setincount(temp);
                setexcount(temp2);
                setsavcount(temp1);

            } catch (error) {
                console.log("Error fetching data:", error);
            }
        };

        fetchData(); 
    }, [change4]);

    // useEffect(() => {
    //     if(!transactionArray){
    //         return;
    //     }
    //     transactionArray.forEach((el) => {
    //         if(el.type === "Investment"){
    //             setincount(incount + el.amount)
    //         }
    //         else if (el.type === "Savings"){
    //             setsavcount(savcount + el.amount)
    //         }
    //         else{
    //             setexcount(excount + el.amount)
    //         }
    //     })
    // }, [transactionArray])
    
    return(<>
        <div style={{display:"flex", justifyContent:"space-between"}}>
            <div style={{display:"flex", gap:"6px", marginTop:"20px"}}>
                <div style={{width:"5px", height:"5px", borderRadius:"2px", background:"rgb(255, 99, 132)", padding:"3px 0px", marginTop:"6px"}}></div>
                <span>Savings</span>
            </div>
            <h3>{Math.round((savcount/(savcount+incount+excount)) * 100)} %</h3>

        </div>
        <div style={{display:"flex", justifyContent:"space-between"}}>
        <div style={{display:"flex", gap:"6px", marginTop:"20px"}}>
            <div style={{width:"5px", height:"5px", borderRadius:"2px", background:"rgb(54, 162, 235)", padding:"3px 0px", marginTop:"6px"}}></div>
            <span>Investment</span>
        </div>
        <h3>{Math.round((incount/(savcount+incount+excount)) * 100)} %</h3>

    </div>
    <div style={{display:"flex", justifyContent:"space-between"}}>
    <div style={{display:"flex", gap:"6px", marginTop:"20px"}}>
        <div style={{width:"5px", height:"5px", borderRadius:"2px", background:"rgb(255, 205, 86)", padding:"3px 0px", marginTop:"6px"}}></div>
        <span>Expenses</span>
    </div>
    <h3>{Math.round((excount/(savcount+incount+excount)) * 100)} %</h3>

</div></>
    )
}

export default Label