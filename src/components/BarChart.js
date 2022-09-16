import React from 'react'
import {HorizontalBar} from 'react-chartjs-3'
import './Balance.css'

const BarChart = ({spendingList}) => {

    var labelNames=[]
    var negativeSaldo=[]
    var positiveSaldo=[]

    var copySpending=structuredClone(spendingList)
    copySpending.sort((a,b)=> b.saldo - a.saldo)

    copySpending.map((person)=>{

        labelNames.push(person.name + ' [' + person.saldo.toFixed(2) + ']  ')

        if(person.saldo <= 0){
          negativeSaldo.push(person.saldo.toFixed(2))
          positiveSaldo.push(0)
        }
        else{
          negativeSaldo.push(0)
          positiveSaldo.push(person.saldo.toFixed(2))
        }
    })

    return(
        <div className='barchart-div-inside'>
            <HorizontalBar
                data= {{
                    labels: labelNames,
                    datasets: [
                        {
                          stack: "Stack 0",
                          backgroundColor: "rgb(230,35,40)",
                          data: negativeSaldo,
                        },
                        {
                          stack: "Stack 0",
                          backgroundColor: "rgb(115, 199, 112)",
                          data: positiveSaldo,
                        },
                      ],
                }} 
                height={200}
                width={300}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        xAxes: [{
                            gridLines: {
                              display: false,
                            },
                            ticks: {
                              display:false,
                            }
                          }],
                          yAxes: [{
                            gridLines: {
                              display: false,
                            },
                            ticks: {
                              fontColor: "black",
                              fontFamily: "'Exo 2', sans-serif",
                              beginAtZero: true,
                              fontSize: 23,
                            }
                          }]
                        
                    },
                    legend: {
                        display: false
                    },              
                }}
            />
        </div>
    )
}

export default BarChart