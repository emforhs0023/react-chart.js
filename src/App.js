import React, { useState, useEffect } from "react"
import { Card, DatePicker, Row } from "antd"
import { dataList } from "./data"
import {Bar} from 'react-chartjs-2';

const { Meta } = Card
const { RangePicker } = DatePicker

function systemDataInfo(value){
	let count = Object.keys(value).length
	let data = []

	for(let i = 0; i < count; i++){
		let titleData = Object.keys(value)[i]
		let valueData = Object.values(value)[i]

		const jsonData = {
			title : titleData,
			contents : valueData,
		}

		data.push(jsonData)
	}

	return data
}

function row(value){
	let temp = []
	let gerpDev = 0
	let gerpQas = 0
	let gmdmDev = 0
	let gmdmQas = 0
	
	
	for (let i = 0; i < value.length; i++){
		if(value[i].title === "GERPDEV" || value[i].title === "PASSWORDGERPDEV"){
			gerpDev = value[i].contents
		}
		if(value[i].title === "GERPQAS" || value[i].title === "PASSWORDGERPQAS"){
			gerpQas = value[i].contents
		}
		if(value[i].title === "GMDMDEV" || value[i].title === "PASSWORDGMDMDEV"){
			gmdmDev = value[i].contents
		}
		if(value[i].title === "GMDMQAS" || value[i].title === "PASSWORDGMDMQAS"){
			gmdmQas = value[i].contents
		}
	}
	temp = [ gerpDev ,gerpQas ,gmdmDev ,gmdmQas ]

	return temp
}

function App() {
	const countInfo = dataList
	const [totalList, setTotalList] = useState([])
	const [barData, setBarData]= useState()
	const [reqTime, setReqTime]= useState([])
	const [ idList, setIdList ] = useState()

	useEffect(() => {
		if(countInfo != undefined){
			let userIdCount = null
			let idPsCount = null
			
			for(let i = 0; i < countInfo.length; i++){
				
				if(Object.keys(countInfo[i])  == "userIdCountData"){
					console.log("fdasasdf")
					userIdCount = countInfo[i].userIdCountData
				// 	// console.log(countInfo[i].userIdCountData)	
				}
				if(Object.keys(countInfo[i])  == "userIdPsCountData"){
					idPsCount = countInfo[i].userIdPsCountData
				}
			}
			const userIdInfo = systemDataInfo(userIdCount)
			const userIdRowData = row(userIdInfo)

			const idPsInfo = systemDataInfo(idPsCount)
			const psRowData = row(idPsInfo)

			console.log(userIdRowData)
			setBarData({
				labels: ['GERP DEV', 'GERP QAS', 'GMDM DEV', 'GMDM QAS'],
				datasets: [
					{
					  label: '사용자 유저 건수',
					  backgroundColor: 'rgba(255,99,132,0.2)',
					  borderColor: 'rgba(255,99,132,1)',
					  borderWidth: 1,
					  hoverBackgroundColor: 'rgba(255,99,132,0.4)',
					  hoverBorderColor: 'rgba(255,99,132,1)',
					  data: [...userIdRowData]
					},
					{
						label: '패스워드 수',
						backgroundColor: 'rgba(54,162,235,0.2)',
						borderColor: 'rgba(54,162,235,1)',
						borderWidth: 1,
						hoverBackgroundColor: 'rgba(255,99,132,0.4)',
						hoverBorderColor: 'rgba(255,99,132,1)',
						data: [...psRowData]
					}
				]
			})

		}
	}, [])

	const options = {
		scales: {
		  yAxes: [
			{
			  ticks: {
				beginAtZero: true,
			  },
			},
		  ],
		},
	  };

	const dataInfo={
		labels:[],
		datasets:[]
	}

  	return (
		<div>
			 <Bar data={barData != undefined ? barData : dataInfo} options={options} />
		</div>
  	);
}

export default App;
