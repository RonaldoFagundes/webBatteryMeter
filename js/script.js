


const endpoint = "http://localhost:3322";




var fkStation = '';


const btn_list = document.getElementById('list');
const btn_report = document.getElementById('report');


const btn_graph = document.getElementById('graph');
const btn_pdf = document.getElementById('pdf');


const select_battery = document.getElementById('select-battery');
const btn_pdf_report = document.getElementById('pdf-report');


const container_list = document.getElementById('container-list');
const container_report = document.getElementById('container-report');


const p_atention = document.getElementById('p-atention');
const p_critical = document.getElementById('p-critical');



const title_list = document.getElementById('title-list');
const title_report = document.getElementById('title-report');




const table_list = document.getElementById('table-list');
const table_report = document.getElementById('table-report');



const list_battery = [];
const list_report = [];


const label = [];
const dataBattery = [];




btn_list.addEventListener('click', function () {
	container_list.style.display = "block";
	listBattery();

	btn_graph.disabled = false;

	input_search_battery.disabled = true;
	input_search_battery.style.opacity = "0.33"

	input_search_analysis.disabled = true;
	input_search_analysis.style.opacity = "0.33"

});





btn_graph.addEventListener('click', function () {
	//loadGraph();
	lineGraph();
	btn_graph.disabled = true;
});



btn_report.addEventListener('click', function () {
	container_report.style.display = "block";
});




select_battery.onchange = function () {

	/*
	Array.from(document.getElementById('table-report').tBodies).forEach((x, i) => {
		if (i !== -1) x.remove();
	});
	*/

	fkStation = this.value.slice(-2);
	listReportByFk();
}





const radio_ref_id = document.getElementById("radio-ref-id");
radio_ref_id.addEventListener("click", () => {

	input_search_battery.disabled = false;
	input_search_battery.style.opacity = "1"
})




const radio_ref_date = document.getElementById("radio-ref-date");
radio_ref_date.addEventListener("click", () => {

	input_search_analysis.disabled = false;
	input_search_analysis.style.opacity = "1"
})





const input_search_battery = document.getElementById("input-search-battery");
const radio_worst = document.getElementById("radio-worst");
const radio_all_battery = document.getElementById("radio-all-battery");
const tbody_battery = document.getElementById("tbody-battery");

input_search_battery.addEventListener("keyup", (e) => {

	//const search = list_battery.filter(i=> i.obs.toLowerCase().includes(e.target.value.toLowerCase()));

	const search = list_battery.filter(i => i.id.toString().toLowerCase().includes(e.target.value.toLowerCase()));

	displayListBattery(search);

	//console.log(search);	
})



radio_worst.addEventListener("click", () => {
	const search = list_battery.filter((i) =>
		i.condutancia < 3989
	);
	displayListBattery(search);
})


radio_all_battery.addEventListener("click", () => {
	displayListBattery(list_battery);
})







const displayListBattery = list_battery => {

	title_list.innerHTML = "List Battery";

	tbody_battery.innerHTML = "";


	list_battery.forEach(e => {

		let status = "";
		let sign = "";

		let ref = 3989;
		let dif = e.condutancia - ref;
		let desvio = (dif / ref * 100).toFixed(0);


        // console.log(e.condutancia + " " + percent + "%"); 

        if (desvio >= -21 && desvio <= -20) {
			//console.log(" Atenção " + percent);
			status = "yellow";
			p_atention.innerHTML = `${desvio}%  id ${e.id}`;			
			p_atention.style.color = "yellow";			
		
		} else if (desvio >= -45 && desvio <= -44) {
			//console.log(" Critico " + percent);
			status = "red";
			p_critical.innerHTML = `${desvio}%  id ${e.id}`;
			p_critical.style.color = "#871409";

		}else {
			status = "green";
		}


		label.push(e.id);
		//dataBattery.push((e.condutancia / 5000 * 100).toFixed(0));
		dataBattery.push(desvio);


       /*
		if (e.condutancia <= 4000) {
			status = "red";
			p_critical.innerHTML = `${(e.condutancia / 5000 * 100).toFixed(0)}%  id ${e.id}`;
			//p_critical.style.backgroundColor = "#748181"; 
			p_critical.style.color = "#871409";
			//p_critical.style.width = "40%";			
			//p_critical.style.width = "auto";		

		} else if (e.condutancia > 4000 && e.condutancia <= 4200) {
			status = "yellow";
			p_atention.innerHTML = `${(e.condutancia / 5000 * 100).toFixed(0)}%  id ${e.id}`;
			//p_atention.style.backgroundColor = "#748181"; 
			p_atention.style.color = "yellow";
			//p_atention.style.width = "40%";
			//p_atention.style.width = "auto";
		} else {
			status = "green";
		}
        */


		if (e.id < 2) {
			sign = "gray"
		} else {
			sign = "green"
		}


	  tbody_battery.innerHTML +=
			`	
	  <tbody>       
	      <td data-title="ID">${e.id}</td>
	      <td data-title="Tensao">${e.tensao}</td>
	      <td data-title="Condutancia">${e.condutancia}</td>
	      <td data-title="Desvio">${desvio}%</td>
	      <td data-title="Obs">${e.obs}</td>	
		  
		  <td data-title="Status">
		     <i class='fa fa-circle' style="color: ${status}; font-size:30px;"></i>
		  </td>	
		  
          <td data-title="Sign">
		     <i class='fa fa-signal' style="color: ${sign}; font-size:30px;"></i>
		  </td>
	  </tbody>	
	 `
	})

}







const input_search_analysis = document.getElementById("input-search-analysis");
const radio_last = document.getElementById("radio-last");
const radio_all_report = document.getElementById("radio-all-report");
const tbody_report = document.getElementById("tbody-report");



input_search_analysis.addEventListener("keyup", (e) => {
	const search = list_report.filter(i => i.date.toLowerCase().includes(e.target.value.toLowerCase().replace(/[^0-9]/g, '')));
	displayData(search);
})

//window.addEventListener("load", displayData.bind(null, list_report));

radio_last.addEventListener("click", () => {
	const search = list_report.slice(-1);
	displayData(search);
})


radio_all_report.addEventListener("click", () => {
	displayData(list_report);
})




const displayData = list_report => {

	title_report.innerHTML = "List Analysis";

	tbody_report.innerHTML = "";

	list_report.forEach(e => {

		tbody_report.innerHTML +=
			`	
	  <tbody>       
	      <td data-title="ID"          style="width: auto;">${e.id}</td>
	      <td data-title="Tensao"      style="width: auto;">${e.tensao}</td>
	      <td data-title="Corrente"    style="width: auto;">${e.corrente}</td>
	      <td data-title="Temperatura" style="width: auto;">${e.temperatura}º</td>
	      <td data-title="Obs"         style="width: auto;">${e.obs}</td>
	      <td data-title="Date"        style="width: auto;">${e.date}</td>
	      <td data-title="Time"        style="width: auto;">${e.time}</td>
	      <td data-title="FK"          style="width: auto;">${e.fk}</td>       
	  </tbody>	
	 `
	})

}










btn_pdf.addEventListener('click', function () {

	const options = {
		margin: [10, 10, 10, 10],
		filename: "file.pdf",
		html2canvas: { scale: 2 },
		jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
	};

	html2pdf().set(options).from(content_list).save();
});






btn_pdf_report.addEventListener('click', function () {

	const options = {
		margin: [10, 10, 10, 10],
		filename: "file.pdf",
		html2canvas: { scale: 2 },
		jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
	};

	html2pdf().set(options).from(container_report).save();
});





/*
btn_surch_ref.onclick = function () {
	Array.from(document.getElementById('table-report').tBodies).forEach((x, i) => {
		if (i !== -1) x.remove();
	});
	listReportByDate();
}
*/


/*
btn_surch_last.onclick = function () {

	Array.from(document.getElementById('table-report').tBodies).forEach((x, i) => {
		if (i !== -1) x.remove();
	});
	listLastReport();
};
*/






const listBattery = async () => {

	await fetch(endpoint + "?action=list_battery", {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
	})
		.then((res) => res.json())
		.then(

			(result) => {

				result.map(

					(item) =>

						list_battery.push(

							{
								id: item.id_bty,
								tensao: item.tensao_bty,
								condutancia: item.condutancia_bty,
								desvio: item.desvio_bty,
								obs: item.obs_bty,
							}

						)

				)

				list_battery.forEach((index) => {
					option = new Option(["Batery nº " + index.id]);
					select_battery.options[select_battery.options.length] = option;
				});

				//onLoadListBattery();
				//createTableList();
				displayListBattery(list_battery);

			}
		)

};






 

        

 function lineGraph() {

   const ctx = document.getElementById('myChart');

   var graph = Chart.getChart("graph");

	if (graph) {
		graph.detroy();
	}

   graph = new Chart(ctx, {
		type: 'line',
		data: {
			labels: label,
			datasets: [{
				label: '% desvio',
				data: dataBattery,

				borderWidth: 2,
				borderColor: '#579f79',
				backgroundColor:'transparent',
				

			}]
		},
		options: {  

			scales: {

				y: {
					beginAtZero: true,

			    	grid: {
                      color: 'rgba(0, 0, 0, 0.3)',
                    },

                    ticks: {
                      color: 'black' ,
					    font: {
                         size: 12,  
                         weight: 'bold' 
                        },
                    }

				},


				x: {
					beginAtZero: true,

			    	grid: {
                      color: 'rgba(0, 0, 0, 0.1)'					  
                    },

                    ticks: {
                        color: 'black' ,
					    font: {
                         size: 12,   
                         weight: 'bold' 
                        },
                    }

				}


			},
		},

	});
	
 }











function loadGraph() {

	const ctx = document.getElementById('myChart');

	var graph = Chart.getChart("graph");

	if (graph) {
		graph.detroy();
	}

	graph = new Chart(ctx, {
		type: 'bar',
		data: {
			labels: label,
			datasets: [{
				label: '% condutância',
				data: dataBattery,
				borderWidth: 2
			}]
		},
		options: {
			scales: {
				y: {
					beginAtZero: true
				}
			}
		},

	});

}






const listReportByFk = async () => {

	if (list_report.length > 0) {
		list_report.length = 0;
	}

	await fetch(endpoint + "?action=list_analysis_by_fk", {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},

		body: JSON.stringify({
			fkStation
		})

	})
		.then((res) => res.json())
		.then(

			(result) => {

				//console.log(result)

				if (result != "notfound") {

					result.map(

						(item) =>

							list_report.push(

								{
									id: item.id_anl,
									tensao: item.tensao_anl,
									corrente: item.corrente_anl,
									temperatura: item.temperatura_anl,
									obs: item.obs_anl,
									date: item.date_anl,
									time: item.time_anl,
									fk: item.fk_bty,
								}

							)

					)

					//createTableReport();


				} else {

					list_report.push(

						{
							fk: 0,
						}

					)
				}

			}
		)

	displayData(list_report);

	//console.log("return " + list_report[0].fk);

	return list_report[0].fk;

};








/*
const createTableList = () => {

	title_list.innerHTML = " List Battery ";

	for (var i = 0; i < list_battery.length; i++) {

		label.push(list_battery[i].id);
		dataBattery.push((list_battery[i].condutancia / 5000 * 100).toFixed(0));

		const t_body = document.createElement('tbody');
		t_body.style.textAlign = "center";

		const t_td_one = document.createElement('td');
		t_td_one.setAttribute('data-title','Id');
		t_td_one.innerHTML = list_battery[i].id;

		const t_td_two = document.createElement('td');
		t_td_two.setAttribute('data-title','Tensão');
		t_td_two.innerHTML = list_battery[i].tensao;

		const t_td_three = document.createElement('td');
		t_td_three.setAttribute('data-title','Condutancia');
		t_td_three.innerHTML = list_battery[i].condutancia;

		const t_td_four = document.createElement('td');
		t_td_four.setAttribute('data-title','Desvio');
		t_td_four.innerHTML = list_battery[i].desvio;

		const t_td_five = document.createElement('td');
		t_td_five.setAttribute('data-title','Obs');
		t_td_five.innerHTML = list_battery[i].obs;

		const t_td_six = document.createElement('td');
		t_td_six.setAttribute('data-title','Status');
		//t_td_six.style.paddingLeft = "40px"

		const t_td_seven = document.createElement('td');
		t_td_seven.setAttribute('data-title','Sign');
		//t_td_seven.style.paddingLeft = "40px"

		const p_atention = document.createElement('p');
		const p_critical = document.createElement('p');

		const p_status = document.createElement('p');
		p_status.style.height = "30px";
		p_status.style.width = "30px";
		p_status.style.borderRadius = "50px";

		const p_sign = document.createElement('p');
		p_sign.style.height = "30px";
		p_sign.style.width = "30px";
		p_sign.style.borderRadius = "50px";
		p_sign.style.backgroundColor = "gray";

		const iconSign = document.createElement('i');
		iconSign.classList.add('fa', 'fa-signal');
		iconSign.style = "font-size:30px;";

		if (list_battery[i].condutancia < 4200 && list_battery[i].condutancia > 3980) {

			p_atention.innerHTML = `Atenção ${list_battery[i].condutancia} id ${list_battery[i].id}`;
			p_atention.style.color = "yellow";
			p_atention.style.backgroundColor = "#000000";
			p_atention.style.padding = "10px";
			p_atention.style.width = "auto";

			content_alert.appendChild(p_atention);
			content_alert.style.display ="block";
			content_alert.style.width = "30%";
			content_alert.style.padding = "10px";
			content_alert.style.backgroundColor = "#ffffff";
			
			//console.log(`Condutancia ${list_battery[i].condutancia} id ${list_battery[i].id}`);

			p_status.style.backgroundColor = "yellow";

		} else if (list_battery[i].condutancia < 3980) {

			p_critical.innerHTML = `Critico ${list_battery[i].condutancia} id ${list_battery[i].id}`;
			p_critical.style.color = "red";
			p_critical.style.backgroundColor = "#000000";
			p_critical.style.padding = "10px";
			p_critical.style.width = "auto";

			content_alert.appendChild(p_critical);
			content_alert.style.display ="block";
			content_alert.style.width = "30%";
			content_alert.style.padding = "10px";
			content_alert.style.backgroundColor = "#ffffff";

			//console.log(`Condutancia ${list_battery[i].condutancia} id ${list_battery[i].id}`);

			p_status.style.backgroundColor = "red";

		} else {
			p_status.style.backgroundColor = "green";
		}

		if (list_battery[i].id > 1) {
			iconSign.style = "color:green;";
		} else {
			iconSign.style = "color:gray;";
		}

		t_td_six.appendChild(p_status);

		t_td_seven.appendChild(iconSign);

		t_body.appendChild(t_td_one);
		t_body.appendChild(t_td_two);
		t_body.appendChild(t_td_three);
		t_body.appendChild(t_td_four);
		t_body.appendChild(t_td_five);
		t_body.appendChild(t_td_six);
		t_body.appendChild(t_td_seven);

		table_list.appendChild(t_body);

	}

}
*/





/*

const listLastReport = async () => {

	if (list_report.length > 0) {
		list_report.length = 0;
	}


	await fetch(endpoint + "?action=list_analysis_last_by_fk", {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},

		body: JSON.stringify({
			fkStation
		})

	})
		.then((res) => res.json())
		.then(

			(result) => {

				console.log(result)

				if (result != "notfound") {

					result.map(

						(item) =>

							list_report.push(

								{
									id: item.id_anl,
									tensao: item.tensao_anl,
									corrente: item.corrente_anl,
									temperatura: item.temperatura_anl,
									obs: item.obs_anl,
									date: item.date_anl,
									time: item.time_anl,
									fk: item.fk_bty,
								}

							)

					)

					//createTableReport();

				} else {

					list_report.push(

						{
							fk: 0,
						}

					)
				}

			}
		)

	console.log("return " + list_report[0].fk);
	return list_report[0].fk;

};
*/





/*

const listReportByDate = async () => {

	if (list_report.length > 0) {
		list_report.length = 0;
	}


	await fetch(endpoint + "?action=list_analysis_by_date", {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},

		body: JSON.stringify({
			analysi
		})


	})
		.then((res) => res.json())
		.then(

			(result) => {

				console.log(result)

				if (result != "notfound") {

					result.map(

						(item) =>

							list_report.push(

								{
									id: item.id_anl,
									tensao: item.tensao_anl,
									corrente: item.corrente_anl,
									temperatura: item.temperatura_anl,
									obs: item.obs_anl,
									date: item.date_anl,
									time: item.time_anl,
									fk: item.fk_bty,
								}

							)

					)

					createTableReport();

				} else {

					list_report.push(

						{
							fk: 0,
						}

					)
				}

			}
		)

	console.log("return " + list_report[0].fk);
	return list_report[0].fk;

};

*/



/*
const createTableReport = () => {

	title_report.innerHTML = " Report ";

	for (var i = 0; i < list_report.length; i++) {

		const t_body = document.createElement('tbody');
		t_body.style.textAlign = "center";

		const t_td_one = document.createElement('td');
		t_td_one.innerHTML = list_report[i].id;

		const t_td_two = document.createElement('td');
		t_td_two.innerHTML = list_report[i].tensao;

		const t_td_three = document.createElement('td');
		t_td_three.innerHTML = list_report[i].corrente;

		const t_td_four = document.createElement('td');
		t_td_four.innerHTML = list_report[i].temperatura;

		const t_td_five = document.createElement('td');
		t_td_five.innerHTML = list_report[i].obs;

		const t_td_six = document.createElement('td');
		t_td_six.innerHTML = list_report[i].date;

		const t_td_seven = document.createElement('td');
		t_td_seven.innerHTML = list_report[i].time;

		const t_td_eight = document.createElement('td');
		t_td_eight.innerHTML = list_report[i].fk;

		t_body.appendChild(t_td_one);
		t_body.appendChild(t_td_two);
		t_body.appendChild(t_td_three);
		t_body.appendChild(t_td_four);
		t_body.appendChild(t_td_five);
		t_body.appendChild(t_td_six);
		t_body.appendChild(t_td_seven);
		t_body.appendChild(t_td_eight);

		table_report.appendChild(t_body);

	}

}

*/



/*
const onLoadListBattery = () =>{

   title_list.innerHTML ="List Battery";

   tbody_battery.innerHTML ="";

   list_battery.forEach(e => {

		label.push(e.id);
		dataBattery.push((e.condutancia / 5000 * 100).toFixed(0));

		let status = "";
		let sign = "";       

		if (e.condutancia <= 4000) {           
			status = "red";
			p_critical.innerHTML = `Critico ${e.condutancia} id ${e.id}`; 
			p_critical.style.backgroundColor = "black"; 
			p_critical.style.color = "red";
		}else if(e.condutancia > 4000 && e.condutancia <= 4200){
			status = "yellow";
			p_atention.innerHTML = `Atenção ${e.condutancia} id ${e.id}`; 
			p_atention.style.backgroundColor = "black"; 
			p_atention.style.color = "yellow";
		}else{
			status = "green";
		}        

	   if(e.id < 2 ){
		 sign = "gray"
	   }else{
		 sign = "green"
	   }        


	 tbody_battery.innerHTML += 
	 `	
	  <tbody>  

		  <td data-title="ID"          style="width: auto;">${e.id}</td>

		  <td data-title="Tensao"      style="width: auto;">${e.tensao}</td>

		  <td data-title="Condutancia" style="width: auto;">${e.condutancia}</td>

		  <td data-title="Desvio"      style="width: auto;">${e.desvio}</td>

		  <td data-title="Obs"         style="width: auto;">${e.obs}</td>	

		  <td data-title="Status">
			 <i class='fa fa-circle' style="color: ${status};"></i>
		  </td>	
		  
		  <td data-title="Sign">
			 <i class='fa fa-signal' style="color: ${sign};"></i>
		  </td>		  

	  </tbody>	
	 `
  })

}
*/





/*
//const input_search = document.querySelector("input[type='search']");


const dados = [
 
  { id: 1 , tensao: '2.27' , corrente: '2.27', temperatura: '2.27', obs: '2.27', date:'20/04/2025' ,time: '18:27', fk: 1},

  { id: 2 , tensao: '2.28' , corrente: '2.27', temperatura: '2.27', obs: '2.27', date:'21/05/2025' ,time: '18:27', fk: 1},

  { id: 3 , tensao: '2.24' , corrente: '2.27', temperatura: '2.27', obs: '2.27', date:'22/06/2025' ,time: '18:27', fk: 1},

  { id: 4 , tensao: '2.29' , corrente: '2.27', temperatura: '2.27', obs: '2.27', date:'23/07/2025' ,time: '18:27', fk: 1},
];

const displayData = dados =>{

   content_search.innerHTML ="";

   dados.forEach(e => {

	 content_search.innerHTML += 
	 `
	  <div class="card"> 
	   <p>${e.id}</p>
	   <p>${e.tensao}</p>
	   <p>${e.date}</p>
	  </div> 
	 `
  })

}

input_search.addEventListener("keyup",(e)=>{
	const search = dados.filter(i=> i.date.toLowerCase().includes(e.target.value.toLowerCase().replace(/[^0-9]/g, '')));
	displayData(search);
})

window.addEventListener("load", displayData.bind(null,dados));
*/




/*
 const displayData = list_report =>{


	title_report.innerHTML = " Report ";


	 list_report.forEach(e => {

		const t_body = document.createElement('tbody');
		t_body.style.textAlign = "center";

		const t_td_one = document.createElement('td');		
		t_td_one.innerHTML = e.id;

		const t_td_two = document.createElement('td');		
		t_td_two.innerHTML = e.tensao;

		const t_td_three = document.createElement('td');		
		t_td_three.innerHTML = e.corrente;

		const t_td_four = document.createElement('td');		
		t_td_four.innerHTML = e.temperatura;

		const t_td_five = document.createElement('td');		
		t_td_five.innerHTML = e.obs;

		const t_td_six = document.createElement('td');		
		t_td_six.innerHTML = e.date;

		const t_td_seven = document.createElement('td');		
		t_td_seven.innerHTML = e.time;

		const t_td_eight = document.createElement('td');		
		t_td_eight.innerHTML = e.fk;

		t_body.appendChild(t_td_one);
		t_body.appendChild(t_td_two);
		t_body.appendChild(t_td_three);
		t_body.appendChild(t_td_four);
		t_body.appendChild(t_td_five);
		t_body.appendChild(t_td_six);
		t_body.appendChild(t_td_seven);
		t_body.appendChild(t_td_eight);

		table_report.appendChild(t_body);

	})

}
*/



/*
 const displayData = list_report =>{


	title_report.innerHTML = " Report ";

	for (var i = 0; i < list_report.length; i++) {


		const t_body = document.createElement('tbody');
		t_body.style.textAlign = "center";

		const t_td_one = document.createElement('td');
		t_td_one.innerHTML = list_report[i].id;
		

		const t_td_two = document.createElement('td');
		t_td_two.innerHTML = list_report[i].tensao;
		

		const t_td_three = document.createElement('td');
		t_td_three.innerHTML = list_report[i].corrente;
		

		const t_td_four = document.createElement('td');
		t_td_four.innerHTML = list_report[i].temperatura;
		

		const t_td_five = document.createElement('td');
		t_td_five.innerHTML = list_report[i].obs;
		

		const t_td_six = document.createElement('td');
		t_td_six.innerHTML = list_report[i].date;
		

		const t_td_seven = document.createElement('td');
		t_td_seven.innerHTML = list_report[i].time;
		

		const t_td_eight = document.createElement('td');
		t_td_eight.innerHTML = list_report[i].fk;
		

		t_body.appendChild(t_td_one);
		t_body.appendChild(t_td_two);
		t_body.appendChild(t_td_three);
		t_body.appendChild(t_td_four);
		t_body.appendChild(t_td_five);
		t_body.appendChild(t_td_six);
		t_body.appendChild(t_td_seven);
		t_body.appendChild(t_td_eight);

		table_report.appendChild(t_body);

	}

}
*/
