import React from "react";
import { HorizontalBar, Doughnut, Pie } from "react-chartjs-2";

const UserBarData = props => {

  if (!props.categoryArray){
    return <div> Loading </div>
  }

  if (!props.userInfo){
    return <div> Loading </div>
  }

  // console.log("Inside CategoryDATA", props.categoryArray)
  // console.log("Inside UserDATA", props.userInfo.categories)


  const userCategories = props.userInfo.categories.map(category => {
    return category.name
  })

  const uniqueCatKeys = () => {
    // console.log('uniqueCAT')
    let newObj = {}
      for (let i = 0; i < userCategories.length; i++) {
        if (!newObj[`${userCategories[i]}`]) {
        newObj[`${userCategories[i]}`] = 1
    }   else {
        newObj[`${userCategories[i]}`] += 1
    }
  }
  // console.log("HERE", Object.keys(newObj))
  let newObjKeys = Object.keys(newObj)
  // uniqueCatValues(newObj);
  return newObjKeys
}

const uniqueCatValues = () => {
  // console.log('uniqueCAT')
  let newObj = {}
    for (let i = 0; i < userCategories.length; i++) {
      if (!newObj[`${userCategories[i]}`]) {
      newObj[`${userCategories[i]}`] = 1
  }   else {
      newObj[`${userCategories[i]}`] += 1
  }
}
// console.log("HERE", Object.values(newObj))
let newObjValues = Object.values(newObj)
// uniqueCatValues(newObj);
return newObjValues
}

// const uniqueCatValues = obj => {
//   console.log("inside uniqueCatValues");
//   console.log("obj is", obj);
//   console.log("--------------------------");
//   let objValues = Object.values(obj);
//   return objValues;
// }
// REFACTOR TO REDUCE FUNCTION
  // console.log("TESTING", uniqueCatKeys())
  //
  //
  // console.log("THIS", userCategories)


  const data = {
  		// labels: [props.coinHisto.map(coin => timeConverter(coin.time))],
      labels: [].concat(uniqueCatKeys()),
      datasets: [
        {
          label: 'Frequency',
          data:[
            // 10,
            // 3,
            // 6,
            // 4,
            // 7,
            // 2
          ].concat(uniqueCatValues()),

          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(100, 99, 132, 0.6)'
          ],
          borderWidth:1,
          borderColor: '#777',
          hoverBorderWidth:3,
          hoverBorderColor:'#000'
        }
      ]
  	};

  const options = {
    title:{
      display:true,
      text: 'Social Activist Tracker',
      fontSize: 25
    },
    legend: {
      display: true,
      position: 'below'
    }
  }


  return (
  		<div>
  			<HorizontalBar data={data} options={options} />
  		</div>
  	)

}

export default UserBarData;
