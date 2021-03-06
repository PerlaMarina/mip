(function() {

	'use strict';

	angular
	.module('authApp')
	.controller('ChartController',ChartController)

	function ChartController($http, $auth, $rootScope,$state,$scope) {

		var vm = this;

		$http.get('api/clasificaciontrampa').success(function(clasificaciones) {
			vm.clasificaciones = clasificaciones;
		}).error(function(error) {
			vm.error = error;
		});


		vm.Graph = function() {
			var filters = {
				idPlanta:$rootScope.selectedPlanta.id,
				dateStart: vm.datestart,
				dateEnd: vm.dateend,
				clasificacionTrampa: vm.selectedClasificacionTrampa
			};


			$http({
				method: 'GET',
				url: 'api/showweekly/filter',
				params: filters,
				headers: {'Content-Type': 'application/json'}
			}).success(function(plagas) {
				console.log(plagas);
				//console.log(JSON.stringify(plagas));

				GenerateChart(plagas);

			}).error(function(response) {
				console.log(response);
			});

		};//vm.Graph

		/**
		* Generate Chart
		*@param {object} plagas
		**/
		function GenerateChart(plagas)
		{
			var row = {};

			var position=0;
			var result=[];//array of rows object.
			var plagaValues=[];//for keys
			var categoriesValues=[];//for axis x
			for(var i =0;i<plagas.length;i++)
			{
				plagaValues.push(plagas[i].plaga);
				if(plagas[position].fechaevento==plagas[i].fechaevento)
				{
					row.name = plagas[i].fechaevento;
					row[plagas[i].plaga]=plagas[i].quantity;
					if(plagas.length-1==i)//is the last row?
					{
						result.push(row);
						categoriesValues.push(plagas[i].fechaevento);
					}
				}
				else {//if date is different, add row to result

					position=i;
					result.push(row);
					row={};
					//add item row,
					row.name = plagas[i].fechaevento;
					row[plagas[i].plaga]=plagas[i].quantity;
					categoriesValues.push(plagas[i-1].fechaevento);
				}

			}
			//Initializing chart properties.
			var chart = c3.generate({
				bindto: '#chart',
				data: {
					json: result,
					/*json:[
					{name:'4/1/2016',palomilla:30,mosquito:50, cuca:100},
					{name:'11/1/2016',palomilla:50,mosquito:60},
					{name:'18/1/2016',palomilla:60,mosquito:90},
					{name:'25/1/2016',palomilla:80,mosquito:40},
					{name:'8/2/2016',palomilla:70,mosquito:100},

				],*/
				keys: {
					//value:['palomilla','mosquito']
					value:plagaValues
				},
				type: 'bar',

			},
			grid:{
				y:{
					show:true
				}
			},
			axis:{
				x: {
					label: 'Semanas',
					type:'category',
					//categories:['4/1/2016','11/1/2016','18/1/2016','25/1/2016','1/2/2016','8/2/2016']
					categories: categoriesValues
				},
				y:{
					label:'Cantidad'
				},

			}

		});//chart
		console.log(result);

	}//GenerateChart

}

})();
