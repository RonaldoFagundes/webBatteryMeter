


const endpoint = "http://localhost:3322";

//const endpoint = "http://localhost:3322/phpApiFinancial";



const btn_list = document.getElementById('list');

const container_list = document.getElementById('container-list');

const title_list = document.getElementById('title-list');
title_list.innerHTML = " Title " ;

const btn_graph = document.getElementById('graph');
const btn_pdf = document.getElementById('pdf');

const p_atention = document.getElementById('p-atention');
p_atention.innerHTML = "Atenção" ;

const p_critical = document.getElementById('p-critical');
p_critical.innerHTML = "Critico" ;




const container_report = document.getElementById('container-report');

const title_report = document.getElementById('title-report');
title_report.innerHTML = " Title " ;

const btn_report = document.getElementById('report');

const btn_pdf_report = document.getElementById('pdf-report');







const select_battery = document.getElementById('select-battery');

/* 
const languagesList = ["Ruby", "JavaScript", "Python", "GoLang"];

languagesList.forEach((language) => {
  option = new Option(language, language.toLowerCase());
  select_battery.options[select_battery.options.length] = option;
});
 */

const languagesList = {
  ruby: "Ruby",
  javascript: "JavaScript",
  python: "Python",
  golang: "GoLang"
};

for(language in languagesList) {
  option = new Option(languagesList[language], language);
  select_battery.options[select_battery.options.length] = option;  
}

//select_battery.options.length = 0;

/*
select_battery.addEventListener('click', function () {
	console.log("opá");	 
});
*/








btn_list.addEventListener('click', function () {
	listBattery();	 
});


btn_graph.addEventListener('click', function () {	
	loadGraph();
	// console.log(dataBattery);
	//console.log(label);	
});


btn_report.addEventListener('click', function () {	
	listReport();	
});






btn_pdf.addEventListener('click', function () {

	//const container_report = document.getElementById('container-report');

	const options = {
		margin: [10, 10, 10, 10],
		filename: "file.pdf",
		html2canvas: { scale: 2 },
		jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
	};

	html2pdf().set(options).from(container_list).save();
});




btn_pdf_report.addEventListener('click', function () {

	//const container_report = document.getElementById('container-report');

	const options = {
		margin: [10, 10, 10, 10],
		filename: "file.pdf",
		html2canvas: { scale: 2 },
		jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
	};

	html2pdf().set(options).from(container_report).save();
});












const list_stations = [];

const listStation = async () => {
	await fetch(endpoint + "?action=list_station", {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		/*
		body: JSON.stringify({
			surch
		})
	   */
	})
		.then((res) => res.json())
		.then(

			(result) => {

				//console.log(result);
				result.map(

					(item) =>

						list_stations.push(

							{
								id: item.id_sta,
								ref: item.ref_sta,
							}

						)

				)

				//const title_list = document.getElementById('title-list');
				title_list.innerHTML = "  " + list_stations[0].id;

				for (var i = 0; i < list_stations.length; i++) {

					const table_list = document.getElementById('table-list');
					const t_body = document.createElement('tbody');
					t_body.style.textAlign = "center";

					const t_td_one = document.createElement('td');
					t_td_one.innerHTML = list_stations[i].id;

					const t_td_two = document.createElement('td');
					t_td_two.innerHTML = list_stations[i].ref;

					t_body.appendChild(t_td_one);
					t_body.appendChild(t_td_two);

					table_list.appendChild(t_body);
				}
			}
		)
};






//const list = [];

const list_battery = [];

const listBattery = async () => {
	await fetch(endpoint + "?action=list_battery", {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		/*
		body: JSON.stringify({
			surch
		})
	   */
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





				//const title_list = document.getElementById('title-list');
				title_list.innerHTML = " List Battery ";

				for (var i = 0; i < list_battery.length; i++) {


                   if (list_battery[i].condutancia < 4200 && list_battery[i].condutancia > 3980 ) {
					 p_critical.innerHTML = `Atenção ${list_battery[i].condutancia} id ${list_battery[i].id}`;
					 p_critical.style.color = "yellow";					
					 p_critical.style.backgroundColor = "gray";
					 p_critical.style.padding = "10px";
                     console.log(`Condutancia ${list_battery[i].condutancia} id ${list_battery[i].id}`);
                    }else if(list_battery[i].condutancia < 3980 ) {
					 p_atention.innerHTML = `Critico ${list_battery[i].condutancia} id ${list_battery[i].id}` ;
					 p_atention.style.color = "red";
					 p_atention.style.backgroundColor = "gray";
					 p_atention.style.padding = "10px";
                     console.log(`Condutancia ${list_battery[i].condutancia} id ${list_battery[i].id}`);
                    }

     
                    label.push(list_battery[i].id); 

                    dataBattery.push( (list_battery[i].condutancia/5000*100).toFixed(0));
					 
					const table_list = document.getElementById('table-list');
					const t_body = document.createElement('tbody');
					t_body.style.textAlign = "center";

					const t_td_one = document.createElement('td');
					t_td_one.innerHTML = list_battery[i].id;

					const t_td_two = document.createElement('td');
					t_td_two.innerHTML = list_battery[i].tensao;

					const t_td_three = document.createElement('td');
					t_td_three.innerHTML = list_battery[i].condutancia;

					const t_td_four = document.createElement('td');
					t_td_four.innerHTML = list_battery[i].desvio;

					const t_td_five = document.createElement('td');
					t_td_five.innerHTML = list_battery[i].obs;

					t_body.appendChild(t_td_one);
					t_body.appendChild(t_td_two);
					t_body.appendChild(t_td_three);
					t_body.appendChild(t_td_four);
					t_body.appendChild(t_td_five);

					table_list.appendChild(t_body);

				}

			}

		)

};









const label = [];
const dataBattery =[];

function loadGraph(){

   const ctx = document.getElementById('myChart');

   var graph = Chart.getChart("graph");

   if(graph){
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








const list_report = [];

const listReport = async () => {
	await fetch(endpoint + "?action=list_analysis", {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		/*
		body: JSON.stringify({
			surch
		})
	   */
	})
		.then((res) => res.json())
		.then(

			(result) => {


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
								fk:item.fk_bty,
							}

						)

				)

				//const title_list = document.getElementById('title-list');
				title_report.innerHTML = " Report ";

				for (var i = 0; i < list_report.length; i++) {  
					 
					const table_list = document.getElementById('table-report');
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

					table_list.appendChild(t_body);

				}

			}

		)


};










