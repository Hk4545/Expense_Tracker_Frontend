import react, {useState, useEffect} from 'react'
import './Graph.css'
import {Doughnut} from 'react-chartjs-2'
import {Chart, ArcElement} from 'chart.js'
import Label from './Label'
import axios from'axios';

Chart.register(ArcElement)


//   const config = {
//     data: {
//         datasets: [{
//             data: [300, 50, 100],
//             backgroundColor: [
//               'rgb(255, 99, 132)',
//               'rgb(54, 162, 235)',
//               'rgb(255, 205, 86)'
//             ],
//             hoverOffset: 4,
//             borderRadius: 10,
//             spacing: 5
//           }]
//     },
//     options: {
//         cutout: 100
//     }
//   }

function Graph (props){
    const change2 = props.change;
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
                        
                    }
                    else if (el.type === "Savings"){
                        
                        temp1 += el.amount
                    }
                    else{
                        
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
    }, [change2]);

    const config = {
        data: {
            datasets: [{
                data: [savcount, incount, excount],
                backgroundColor: [
                  'rgb(255, 99, 132)',
                  'rgb(54, 162, 235)',
                  'rgb(255, 205, 86)'
                ],
                hoverOffset: 4,
                borderRadius: 10,
                spacing: 5
              }]
        },
        options: {
            cutout: 100
        }
      }

    return(
        <div className='graphmain'>
            <div>
                <div className='chart'>
                    <Doughnut {...config}/>
                    <h3 style={{marginBottom:"4px", position:"absolute", top:"40%", left:"36%"}}>Total <span style={{color:"green"}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-currency-rupee" viewBox="0 0 16 16">
  <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4z"/>
</svg>{incount+excount+savcount}</span></h3>
                </div>
                <div>
                    <Label change3={change2}/>
                </div>
            </div>
        </div>
    )
}


export default Graph;