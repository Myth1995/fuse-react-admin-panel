import mock from '../mock';

const financeDashboardAppDB = {
	widgets: [
		{
			id: 'widget1',
			series: {
				2019: [
					{
						name: 'Sales',
						data: [1.9, 3, 3.4, 2.2, 2.9, 3.9, 2.5, 3.8, 4.1, 3.8, 3.2, 2.9],
						fill: 'start'
					}
				],
				2020: [
					{
						name: 'Sales',
						data: [2.2, 2.9, 3.9, 2.5, 3.8, 3.2, 2.9, 1.9, 3, 3.4, 4.1, 3.8],
						fill: 'start'
					}
				],
				2021: [
					{
						name: 'Sales',
						data: [3.9, 2.5, 3.8, 4.1, 1.9, 3, 3.8, 3.2, 2.9, 3.4, 2.2, 2.9],
						fill: 'start'
					}
				]
			},
			options: {
				chart: {
					type: 'area',
					height: '100%',
					background: 'transparent',
					toolbar: {
						show: false
					},
					zoom: {
						enabled: false
					}
				},
				theme: {
					mode: 'dark'
				},
				dataLabels: {
					enabled: false
				},
				xaxis: {
					categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
					tooltip: {
						enabled: false
					},
					axisBorder: {
						show: false
					}
				},
				yaxis: {
					axisBorder: {
						show: false
					}
				},
				markers: {
					size: 3,
					strokeWidth: 1.5,
					strokeOpacity: 1,
					strokeDashArray: 0,
					fillOpacity: 1,
					shape: 'circle',
					radius: 2,
					hover: {
						size: 5
					}
				},
				fill: {
					type: 'solid',
					opacity: 0.7,
					gradient: {
						shadeIntensity: 0.4,
						opacityFrom: 1,
						opacityTo: 0.5,
						stops: [30, 100, 100]
					}
				},
				grid: {
					show: true,
					strokeDashArray: 3,
					position: 'back',
					xaxis: {
						lines: {
							show: true
						}
					},
					yaxis: {
						lines: {
							show: true
						}
					},
					padding: {
						top: 0,
						right: 0,
						bottom: 0,
						left: 0
					}
				},
				stroke: {
					show: true,
					curve: 'smooth',
					lineCap: 'butt',
					width: 1.5,
					dashArray: 0
				}
			}
		},
		{
			id: 'widget2',
			conversion: {
				value: 49212121,
				ofTarget: 13
			},
			series: [
				{
					name: 'Conversion',
					data: [221, 428, 380, 471, 413, 344, 494]
				}
			],
			options: {
				chart: {
					type: 'area',
					height: '100%',
					sparkline: {
						enabled: true
					}
				},
				fill: {
					type: 'solid',
					opacity: 0.7
				},
				xaxis: {
					categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
				},
				tooltip: {
					followCursor: true,
					theme       : 'dark',
					fixed: {
						enabled: false,
						position: 'topRight',
						offsetX: 0,
						offsetY: 0,
					},
				}
			}
		},
		{
			id: 'widget3',
			impressions: {
				value: '87k',
				ofTarget: 12
			},
			series: [
				{
					name: 'Impression',
					data: [
						67000,
						54000,
						82000,
						57000,
						72000,
						57000,
						87000,
						72000,
						89000,
						98700,
						112000,
						136000,
						110000,
						149000,
						98000
					]
				}
			],
			options: {
				chart: {
					type: 'area',
					height: '100%',
					sparkline: {
						enabled: true
					}
				},
				xaxis: {
					categories: [
						'Jan 1',
						'Jan 2',
						'Jan 3',
						'Jan 4',
						'Jan 5',
						'Jan 6',
						'Jan 7',
						'Jan 8',
						'Jan 9',
						'Jan 10',
						'Jan 11',
						'Jan 12',
						'Jan 13',
						'Jan 14',
						'Jan 15'
					]
				},
				fill: {
					type: 'solid',
					opacity: 0.7
				},
				tooltip: {
					followCursor: true,
					theme       : 'dark',
					fixed: {
						enabled: false,
						position: 'topRight',
						offsetX: 0,
						offsetY: 0,
					},
				}
			}
		},
		{
			id: 'widget4',
			visits: {
				value: 882,
				ofTarget: -9
			},
			series: [
				{
					name: 'Visits',
					data: [432, 428, 327, 363, 456, 267, 231]
				}
			],
			options: {
				chart: {
					type: 'area',
					height: '100%',
					sparkline: {
						enabled: true
					}
				},
				xaxis: {
					categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
				},
				fill: {
					type: 'solid',
					opacity: 0.7
				},
				tooltip: {
					followCursor: true,
					theme       : 'dark',
					fixed: {
						enabled: false,
						position: 'topRight',
						offsetX: 0,
						offsetY: 0,
					},
				}
			}
		},
		{
			id: 'widget5',
			series: {
				today: [
					{
						name: 'Visitors',
						data: [1210, 1380, 1520, 1290, 490, 1390, 1050, 680, 1300, 2140, 1520, 1890]
					},
					{
						name: 'Page Views',
						data: [3000, 3400, 4100, 3800, 2200, 3200, 2900, 1900, 2900, 3900, 2500, 3800]
					}
				],
				yesterday: [
					{
						name: 'Visitors',
						data: [1190, 1300, 2340, 1220, 1590, 1990, 1250, 1080, 2000, 2380, 2420, 2190]
					},
					{
						name: 'Page views',
						data: [2200, 2900, 3900, 2500, 3800, 3200, 2900, 1900, 3000, 3400, 4100, 3800]
					}
				]
			},
			options: {
				chart: {
					type: 'area',
					height: '100%',
					stacked: true,
					foreColor: '#999',
					toolbar: {
						show: false
					},
					zoom: {
						enabled: false
					}
				},
				stroke: {
					curve: 'smooth',
					width: 3
				},
				dataLabels: {
					enabled: false
				},
				markers: {
					size: 0,
					strokeColor: '#fff',
					strokeWidth: 3,
					strokeOpacity: 1,
					fillOpacity: 1,
					hover: {
						size: 6
					}
				},
				xaxis: {
					categories: [
						'12am',
						'2am',
						'4am',
						'6am',
						'8am',
						'10am',
						'12pm',
						'2pm',
						'4pm',
						'6pm',
						'8pm',
						'10pm'
					],
					axisBorder: {
						show: false
					},
					axisTicks: {
						show: false
					}
				},
				yaxis: {
					tooltip: {
						enabled: true
					}
				},
				grid: {
					position: 'back'
				},
				legend: {
					show: false
				},
				fill: {
					type: 'solid',
					opacity: 0.7
				},
				tooltip: {
					followCursor: true,
					theme       : 'dark',
					fixed: {
						enabled: false,
						position: 'topRight',
						offsetX: 0,
						offsetY: 0,
					},
				}
			}
		},
		{
			id: 'widget6',
			series: {
				today: [
					{
						name: 'Visitors',
						data: [1210, 1380, 1520, 1290, 490, 1390, 1050, 680, 1300, 2140, 1520, 1890]
					},
					{
						name: 'Page Views',
						data: [3000, 3400, 4100, 3800, 2200, 3200, 2900, 1900, 2900, 3900, 2500, 3800]
					}
				],
				yesterday: [
					{
						name: 'Visitors',
						data: [1190, 1300, 2340, 1220, 1590, 1990, 1250, 1080, 2000, 2380, 2420, 2190]
					},
					{
						name: 'Page views',
						data: [2200, 2900, 3900, 2500, 3800, 3200, 2900, 1900, 3000, 3400, 4100, 3800]
					}
				]
			},
			options: {
				chart: {
					type: 'area',
					height: '100%',
					stacked: true,
					foreColor: '#999',
					toolbar: {
						show: false
					},
					zoom: {
						enabled: false
					}
				},
				stroke: {
					curve: 'smooth',
					width: 3
				},
				dataLabels: {
					enabled: false
				},
				markers: {
					size: 0,
					strokeColor: '#fff',
					strokeWidth: 3,
					strokeOpacity: 1,
					fillOpacity: 1,
					hover: {
						size: 6
					}
				},
				xaxis: {
					categories: [
						'12am',
						'2am',
						'4am',
						'6am',
						'8am',
						'10am',
						'12pm',
						'2pm',
						'4pm',
						'6pm',
						'8pm',
						'10pm'
					],
					axisBorder: {
						show: false
					},
					axisTicks: {
						show: false
					}
				},
				yaxis: {
					tooltip: {
						enabled: true
					}
				},
				grid: {
					position: 'back'
				},
				legend: {
					show: false
				},
				fill: {
					type: 'solid',
					opacity: 0.7
				},
				tooltip: {
					followCursor: true,
					theme       : 'dark',
					fixed: {
						enabled: false,
						position: 'topRight',
						offsetX: 0,
						offsetY: 0,
					},
				}
			}
		},
		{
			id: 'widget7',
			conversion: {
				value: 492,
				ofTarget: 13
			},
			series: {
				today: [
					{
						name: 'Visitors',
						data: [1210, 1380, 1520, 1290, 490, 1390, 1050, 680, 1300, 2140, 1520, 1890]
					},
					{
						name: 'Page Views',
						data: [3000, 3400, 4100, 3800, 2200, 3200, 2900, 1900, 2900, 3900, 2500, 3800]
					}
				],
				yesterday: [
					{
						name: 'Visitors',
						data: [1190, 1300, 2340, 1220, 1590, 1990, 1250, 1080, 2000, 2380, 2420, 2190]
					},
					{
						name: 'Page views',
						data: [2200, 2900, 3900, 2500, 3800, 3200, 2900, 1900, 3000, 3400, 4100, 3800]
					}
				]
			},
			options: {
				chart: {
					type: 'area',
					height: '100%',
					stacked: true,
					foreColor: '#999',
					toolbar: {
						show: false
					},
					zoom: {
						enabled: false
					}
				},
				stroke: {
					curve: 'smooth',
					width: 3
				},
				dataLabels: {
					enabled: false
				},
				markers: {
					size: 0,
					strokeColor: '#fff',
					strokeWidth: 3,
					strokeOpacity: 1,
					fillOpacity: 1,
					hover: {
						size: 6
					}
				},
				xaxis: {
					categories: [
						// '12am',
						// '2am',
						// '4am',
						// '6am',
						// '8am',
						// '10am',
						// '12pm',
						// '2pm',
						// '4pm',
						// '6pm',
						// '8pm',
						// '10pm'
						'',
						'',
						'',
						'',
						'',
						'',
						'',
						'',
						'',
						'',
						'',
						''
					],
					axisBorder: {
						show: false
					},
					axisTicks: {
						show: false
					}
				},
				yaxis: {
					tooltip: {
						enabled: true
					}
				},
				grid: {
					position: 'back'
				},
				legend: {
					show: false
				},
				fill: {
					type: 'solid',
					opacity: 0.7
				},
				tooltip: {
					followCursor: true,
					theme       : 'dark',
					fixed: {
						enabled: false,
						position: 'topRight',
						offsetX: 0,
						offsetY: 0,
					},
				}
			}
		},
		{
			id: 'widget9',
			visits: {
				value: 882,
				ofTarget: -9
			},
			series: [
				{
					name: 'Visits',
					data: [432, 428, 327, 363, 456, 267, 231]
				}
			],
			options: {
				chart: {
					type: 'area',
					height: '100%',
					sparkline: {
						enabled: true
					}
				},
				xaxis: {
					categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
				},
				fill: {
					type: 'solid',
					opacity: 0.7
				},
				tooltip: {
					followCursor: true,
					theme       : 'dark',
					fixed: {
						enabled: false,
						position: 'topRight',
						offsetX: 0,
						offsetY: 0,
					},
				}
			}
		},
	],
	incomes: [
		{
			id: '5725a680b3249760ea21de52',
			name: 'Abbott',
			lastName: 'Keitch',
			avatar: 'assets/images/avatars/Abbott.jpg',
			nickname: 'Royalguard',
			company: 'Saois',
			jobTitle: 'Digital Archivist',
			email: 'abbott@withinpixels.com',
			phone: '+1-202-555-0175',
			address: '933 8th Street Stamford, CT 06902',
			birthday: undefined,
			notes: ''
		},
	],
	transactions: [
		{
			id: '1',
			name: 'A Walk Amongst Friends - Canvas Print',
			handle: 'a-walk-amongst-friends-canvas-print',
			description:
				'Officia amet eiusmod eu sunt tempor voluptate laboris velit nisi amet enim proident et. Consequat laborum non eiusmod cillum eu exercitation. Qui adipisicing est fugiat eiusmod esse. Sint aliqua cupidatat pariatur mollit ad est proident reprehenderit. Eiusmod adipisicing laborum incididunt sit aliqua ullamco.',
			categories: ['Canvas Print', 'Nature'],
			tags: ['canvas-print', 'nature'],
			featuredImageId: '1',
			images: [
				{
					id: '0',
					url: 'assets/images/ecommerce/a-walk-amongst-friends.jpg',
					type: 'image'
				},
				{
					id: '1',
					url: 'assets/images/ecommerce/braies-lake.jpg',
					type: 'image'
				},
				{
					id: '2',
					url: 'assets/images/ecommerce/fall-glow.jpg',
					type: 'image'
				},
				{
					id: '3',
					url: 'assets/images/ecommerce/first-snow.jpg',
					type: 'image'
				},
				{
					id: '4',
					url: 'assets/images/ecommerce/lago-di-braies.jpg',
					type: 'image'
				},
				{
					id: '5',
					url: 'assets/images/ecommerce/lago-di-sorapis.jpg',
					type: 'image'
				},
				{
					id: '6',
					url: 'assets/images/ecommerce/never-stop-changing.jpg',
					type: 'image'
				},
				{
					id: '7',
					url: 'assets/images/ecommerce/reaching.jpg',
					type: 'image'
				},
				{
					id: '8',
					url: 'assets/images/ecommerce/morain-lake.jpg',
					type: 'image'
				},
				{
					id: '9',
					url: 'assets/images/ecommerce/yosemite.jpg',
					type: 'image'
				}
			],
			priceTaxExcl: 9.309,
			priceTaxIncl: 10.24,
			taxRate: 10,
			comparedPrice: 19.9,
			quantity: 3,
			sku: 'A445BV',
			width: '22cm',
			height: '24cm',
			depth: '15cm',
			weight: '3kg',
			extraShippingFee: 3.0,
			active: true
		},
	]
};

mock.onGet('/api/finance-dashboard-app/widgets').reply(config => {
	return [200, financeDashboardAppDB.widgets];
});

mock.onGet('/api/finance-dashboard-app/incomes').reply(config => {
	return [200, financeDashboardAppDB.incomes];
});


mock.onPost('/api/finance-dashboard-app/add-income').reply(request => {
	const data = JSON.parse(request.data);
	const newIncome = {
		...data.newIncome,
		id: FuseUtils.generateGUID()
	};
	financeDashboardAppDB.incomes = [...financeDashboardAppDB.incomes, newIncome];
	return [200, newIncome];
});

mock.onPost('/api/finance-dashboard-app/update-income').reply(request => {
	const data = JSON.parse(request.data);

	financeDashboardAppDB.incomes = financeDashboardAppDB.incomes.map(income => {
		if (data.income.id === income.id) {
			return data.income;
		}
		return income;
	});

	return [200, data.income];
});

mock.onPost('/api/finance-dashboard-app/remove-income').reply(request => {
	const data = JSON.parse(request.data);
	const event = financeDashboardAppDB.incomes.find(_event => data.eventId === _event.id);
	financeDashboardAppDB.incomes = financeDashboardAppDB.incomes.filter(_event => _event.id !== event.id);

	return [200, event];
});

mock.onGet('/api/finance-dashboard-app/transactions').reply(config => {
	return [200, financeDashboardAppDB.transactions];
});