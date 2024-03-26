
import path from 'path';
import { FontAwesomeCharset } from 'assets/fonts/FontAwesome/charset';

/**
 * Left column of pdf doc.
 */
const leftColumn = {
	border: [false, false, false, false],
	margin: [0, 0, 20, 0],
	stack: [
		/**
		 * IMMAGINE PROFILO.
		 */
		{
			image: path.join(__dirname, 'assets/images/user-placeholder.png'),
			fit: [100, 100],
			alignment: 'left',
			margin: [20, 0, 0, 0]
		},
		/**
		 * end of IMMAGINE PROFILO.
		 */

		/**
		 * DATI PERSONALI.
		 */
		{
			unbreakable: true,
			stack: [
				{
					text: 'DATI PERSONALI',
					bold: true,
					fontSize: 9,
					color: '#77BC1F',
					margin: [0, 20, 0, 3],
				},
				{
					margin: [0, 0, 0, 3],
					text: [
						{ text: 'ETÀ ', bold: true, fontSize: 8, },
						{ text: '30 anni', fontSize: 10, },
					],
				},
				{
					margin: [0, 0, 0, 3],
					text: [
						{ text: 'NATA IN ', bold: true, fontSize: 8, },
						{ text: 'Spagna', fontSize: 10, },
					],
				},
				{
					margin: [0, 0, 0, 3],
					text: [
						{ text: 'NAZIONALITÀ ', bold: true, fontSize: 8, },
						{ text: 'Spagnola', fontSize: 10, },
					],
				},
				{
					margin: [0, 0, 0, 3],
					text: [
						{ text: 'CITTADINANZA ', bold: true, fontSize: 8, },
						{ text: 'Italiana', fontSize: 10, },
					],
				},
				{
					margin: [0, 0, 0, 3],
					text: [
						{ text: 'IN ITALIA DAL ', bold: true, fontSize: 8, },
						{ text: '1999', fontSize: 10, },
					],
				},
				{
					margin: [0, 0, 0, 3],
					text: [
						{ text: 'DOMICILIO ', bold: true, fontSize: 8, },
						{ text: 'Milano, Municipio 1', fontSize: 10, },
					],
				},
				{
					margin: [0, 0, 0, 3],
					text: [
						{ text: 'TELEFONO ', bold: true, fontSize: 8, },
						{ text: '02 60 72 694 - 329 43 94 586', fontSize: 10, },
					],
				},
				{
					margin: [0, 0, 0, 3],
					text: [
						{ text: 'EMAIL ', bold: true, fontSize: 8, },
						{ text: 'maria.sanchez@gmail.com', fontSize: 10, },
					],
				},
				{
					margin: [0, 3, 0, 3],
					text: [
						{
							text: `${FontAwesomeCharset.get('ok')}`,
							style: 'icon',
							color: '#77BC1F',
						},
						{
							text: ' Patente',
							fontSize: 10,
							bold: true,
						}
					],
				},
				{
					margin: [0, 0, 0, 3],
					text: [
						{
							text: `${FontAwesomeCharset.get('cancel')}`,
							style: 'icon',
							color: '#8A8A8D',
						},
						{
							text: ' Automunita',
							fontSize: 10,
							bold: true,
						}
					],
				},
			],
		},
		/**
		 * end of DATI PERSONALI.
		 */

		/**
		 * DOCUMENTI.
		 */
		{
			unbreakable: true,
			stack: [
				{
					text: 'DOCUMENTI',
					bold: true,
					fontSize: 10,
					color: '#77BC1F',
					margin: [0, 20, 0, 3]
				},
				{
					margin: [0, 3, 0, 3],
					text: [
						{
							text: `${FontAwesomeCharset.get('ok')}`,
							style: 'icon',
							color: '#77BC1F',
						},
						{
							text: ' Carta di identità',
							fontSize: 10,
							bold: true,
						}
					],
				},
				{
					margin: [0, 0, 0, 3],
					text: [
						{
							text: `${FontAwesomeCharset.get('ok')}`,
							style: 'icon',
							color: '#77BC1F',
						},
						{
							text: ' Permesso di soggiorno',
							fontSize: 10,
							bold: true,
						}
					],
				},
			],
		},
		/**
		 * end of DOCUMENTI.
		 */

		/**
		 * ISTRUZIONE E FORMAZIONE.
		 */
		{
			unbreakable: true,
			stack: [
				{
					text: 'ISTRUZIONE E FORMAZIONE',
					bold: true,
					fontSize: 10,
					color: '#77BC1F',
					margin: [0, 20, 0, 3],
				},
				{
					text: 'TITOLO DI STUDIO',
					bold: true,
					fontSize: 8,
					margin: [0, 0, 0, 3],
				},
				{
					text: 'Laurea in scienza dell\'educazione',
					fontSize: 10,
					margin: [0, 0, 0, 3],
				},
				{
					text: 'CORSI DI FORMAZIONE',
					bold: true,
					fontSize: 8,
					margin: [0, 0, 0, 3],
				},
				{
					text: 'Assistente all\'infanzia',
					fontSize: 10,
					margin: [0, 0, 0, 3],
				},
			],
		},
		/**
		 * end of ISTRUZIONE E FORMAZIONE.
		 */

		/**
		 * LINGUE.
		 */
		{
			unbreakable: true,
			stack: [
				{
					text: 'LINGUE',
					bold: true,
					fontSize: 10,
					color: '#77BC1F',
					margin: [0, 20, 0, 3],
				},
				{
					layout: {
						paddingLeft: () => 0,
						paddingRight: () => 0,
					},
					table: {
						widths: ['*', 'auto'],
						body: [
							[
								{
									text: 'Italiano ',
									fontSize: 10,
									border: [false, false, false, true],
									borderColor: ['#B8B8B8', '#B8B8B8', '#B8B8B8', '#B8B8B8'],
								},
								{
									noWrap: true,
									border: [false, false, false, true],
									margin: [0, 3, 0, 0],
									borderColor: ['#B8B8B8', '#B8B8B8', '#B8B8B8', '#B8B8B8'],
									text: [
										{
											text: `${FontAwesomeCharset.get('circle')}`,
											style: 'icon',
											color: '#77BC1F',
										},
										{ text: ' ', fontSize: 6 },
										{
											text: `${FontAwesomeCharset.get('circle')}`,
											style: 'icon',
											color: '#77BC1F',
											margin: [2, 10, 2, 10],
										},
										{ text: ' ', fontSize: 6 },
										{
											text: `${FontAwesomeCharset.get('circle')}`,
											style: 'icon',
											color: '#77BC1F',
										},
										{ text: ' ', fontSize: 6 },
										{
											text: `${FontAwesomeCharset.get('circle')}`,
											style: 'icon',
											color: '#77BC1F',
										},
										{ text: ' ', fontSize: 6 },
										{
											text: `${FontAwesomeCharset.get('circle')}`,
											style: 'icon',
											color: '#B8B8B8',
										},
									],
								},
							],
						]
					},
				},
				{
					layout: {
						paddingLeft: () => 0,
						paddingRight: () => 0,
					},
					table: {
						widths: ['*', 'auto'],
						body: [
							[
								{
									text: 'Inglese ',
									fontSize: 10,
									border: [false, false, false, true],
									borderColor: ['#B8B8B8', '#B8B8B8', '#B8B8B8', '#B8B8B8'],
								},
								{
									noWrap: true,
									border: [false, false, false, true],
									margin: [0, 3, 0, 0],
									borderColor: ['#B8B8B8', '#B8B8B8', '#B8B8B8', '#B8B8B8'],
									text: [
										{
											text: `${FontAwesomeCharset.get('circle')}`,
											style: 'icon',
											color: '#77BC1F',
										},
										{ text: ' ', fontSize: 6 },
										{
											text: `${FontAwesomeCharset.get('circle')}`,
											style: 'icon',
											color: '#77BC1F',
											margin: [2, 10, 2, 10],
										},
										{ text: ' ', fontSize: 6 },
										{
											text: `${FontAwesomeCharset.get('circle')}`,
											style: 'icon',
											color: '#77BC1F',
										},
										{ text: ' ', fontSize: 6 },
										{
											text: `${FontAwesomeCharset.get('circle')}`,
											style: 'icon',
											color: '#B8B8B8',
										},
										{ text: ' ', fontSize: 6 },
										{
											text: `${FontAwesomeCharset.get('circle')}`,
											style: 'icon',
											color: '#B8B8B8',
										},
									],
								},
							],
						]
					},
				},
				{
					layout: {
						paddingLeft: () => 0,
						paddingRight: () => 0,
					},
					table: {
						widths: ['*', 'auto'],
						body: [
							[
								{
									text: 'Spagnolo ',
									fontSize: 10,
									border: [false, false, false, true],
									borderColor: ['#B8B8B8', '#B8B8B8', '#B8B8B8', '#B8B8B8'],
								},
								{
									text: 'MADRELINGUA ',
									fontSize: 8,
									bold: true,
									color: '#77BC1F',
									margin: [0, 2, 0, 0],
									border: [false, false, false, true],
									borderColor: ['#B8B8B8', '#B8B8B8', '#B8B8B8', '#B8B8B8'],
								},
							],
						]
					},
				},
			],
		},
		/**
		 * end of LINGUE.
		 */

		/**
		 * RETRIBUZIONE ORARIA.
		 */
		{
			unbreakable: true,
			stack: [
				{
					text: 'RETRIBUZIONE ORARIA RICHIESTA ',
					bold: true,
					fontSize: 10,
					color: '#77BC1F',
					margin: [0, 20, 0, 3],
				},
				{
					text: '€6,5 - €7 (netti)',
					fontSize: 10,
				},
			],
		},
		/**
		 * end of RETRIBUZIONE ORARIA.
		 */

		/**
		 * CAPACITÀ COMUNICATIVE.
		 */
		{
			unbreakable: true,
			stack: [
				{
					text: 'CAPACITÀ COMUNICATIVE',
					bold: true,
					fontSize: 10,
					color: '#77BC1F',
					margin: [0, 20, 0, 3],
				},
				{
					layout: {
						paddingLeft: () => 0,
						paddingRight: () => 0,
					},
					table: {
						widths: ['*', 'auto'],
						body: [
							[
								{
									text: 'Comunicative ',
									fontSize: 10,
									border: [false, false, false, true],
									borderColor: ['#B8B8B8', '#B8B8B8', '#B8B8B8', '#B8B8B8'],
								},
								{
									noWrap: true,
									border: [false, false, false, true],
									borderColor: ['#B8B8B8', '#B8B8B8', '#B8B8B8', '#B8B8B8'],
									margin: [0, 3, 0, 0],
									text: [
										{
											text: `${FontAwesomeCharset.get('circle')}`,
											style: 'icon',
											color: '#77BC1F',
										},
										{ text: ' ', fontSize: 6 },
										{
											text: `${FontAwesomeCharset.get('circle')}`,
											style: 'icon',
											color: '#77BC1F',
											margin: [2, 10, 2, 10],
										},
										{ text: ' ', fontSize: 6 },
										{
											text: `${FontAwesomeCharset.get('circle')}`,
											style: 'icon',
											color: '#77BC1F',
										},
										{ text: ' ', fontSize: 6 },
										{
											text: `${FontAwesomeCharset.get('circle')}`,
											style: 'icon',
											color: '#77BC1F',
										},
										{ text: ' ', fontSize: 6 },
										{
											text: `${FontAwesomeCharset.get('circle')}`,
											style: 'icon',
											color: '#B8B8B8',
										},
									],
								},
							],
						]
					},
				},
				{
					layout: {
						paddingLeft: () => 0,
						paddingRight: () => 0,
					},
					table: {
						widths: ['*', 'auto'],
						body: [
							[
								{
									text: 'Di adattamento ',
									fontSize: 10,
									border: [false, false, false, true],
									borderColor: ['#B8B8B8', '#B8B8B8', '#B8B8B8', '#B8B8B8'],
								},
								{
									noWrap: true,
									border: [false, false, false, true],
									borderColor: ['#B8B8B8', '#B8B8B8', '#B8B8B8', '#B8B8B8'],
									margin: [0, 3, 0, 0],
									text: [
										{
											text: `${FontAwesomeCharset.get('circle')}`,
											style: 'icon',
											color: '#77BC1F',
										},
										{ text: ' ', fontSize: 6 },
										{
											text: `${FontAwesomeCharset.get('circle')}`,
											style: 'icon',
											color: '#77BC1F',
											margin: [2, 10, 2, 10],
										},
										{ text: ' ', fontSize: 6 },
										{
											text: `${FontAwesomeCharset.get('circle')}`,
											style: 'icon',
											color: '#77BC1F',
										},
										{ text: ' ', fontSize: 6 },
										{
											text: `${FontAwesomeCharset.get('circle')}`,
											style: 'icon',
											color: '#B8B8B8',
										},
										{ text: ' ', fontSize: 6 },
										{
											text: `${FontAwesomeCharset.get('circle')}`,
											style: 'icon',
											color: '#B8B8B8',
										},
									],
								},
							],
						]
					},
				},
				{
					layout: {
						paddingLeft: () => 0,
						paddingRight: () => 0,
					},
					table: {
						widths: ['*', 'auto'],
						body: [
							[
								{
									text: 'Di gestione del tempo ',
									fontSize: 10,
									border: [false, false, false, true],
									borderColor: ['#B8B8B8', '#B8B8B8', '#B8B8B8', '#B8B8B8'],
								},
								{
									noWrap: true,
									border: [false, false, false, true],
									borderColor: ['#B8B8B8', '#B8B8B8', '#B8B8B8', '#B8B8B8'],
									margin: [0, 3, 0, 0],
									text: [
										{
											text: `${FontAwesomeCharset.get('circle')}`,
											style: 'icon',
											color: '#77BC1F',
										},
										{ text: ' ', fontSize: 6 },
										{
											text: `${FontAwesomeCharset.get('circle')}`,
											style: 'icon',
											color: '#77BC1F',
											margin: [2, 10, 2, 10],
										},
										{ text: ' ', fontSize: 6 },
										{
											text: `${FontAwesomeCharset.get('circle')}`,
											style: 'icon',
											color: '#77BC1F',
										},
										{ text: ' ', fontSize: 6 },
										{
											text: `${FontAwesomeCharset.get('circle')}`,
											style: 'icon',
											color: '#B8B8B8',
										},
										{ text: ' ', fontSize: 6 },
										{
											text: `${FontAwesomeCharset.get('circle')}`,
											style: 'icon',
											color: '#B8B8B8',
										},
									],
								},
							],
						]
					},
				},
				{
					layout: {
						paddingLeft: () => 0,
						paddingRight: () => 0,
					},
					table: {
						widths: ['*', 'auto'],
						body: [
							[
								{
									text: 'Relazionali ',
									fontSize: 10,
									border: [false, false, false, true],
									borderColor: ['#B8B8B8', '#B8B8B8', '#B8B8B8', '#B8B8B8'],
								},
								{
									noWrap: true,
									border: [false, false, false, true],
									borderColor: ['#B8B8B8', '#B8B8B8', '#B8B8B8', '#B8B8B8'],
									margin: [0, 3, 0, 0],
									text: [
										{
											text: `${FontAwesomeCharset.get('circle')}`,
											style: 'icon',
											color: '#77BC1F',
										},
										{ text: ' ', fontSize: 6 },
										{
											text: `${FontAwesomeCharset.get('circle')}`,
											style: 'icon',
											color: '#77BC1F',
											margin: [2, 10, 2, 10],
										},
										{ text: ' ', fontSize: 6 },
										{
											text: `${FontAwesomeCharset.get('circle')}`,
											style: 'icon',
											color: '#77BC1F',
										},
										{ text: ' ', fontSize: 6 },
										{
											text: `${FontAwesomeCharset.get('circle')}`,
											style: 'icon',
											color: '#B8B8B8',
										},
										{ text: ' ', fontSize: 6 },
										{
											text: `${FontAwesomeCharset.get('circle')}`,
											style: 'icon',
											color: '#B8B8B8',
										},
									],
								},
							],
						]
					},
				},
			],
		},
		/**
		 * end of CAPACITÀ COMUNICATIVE.
		 */

		/**
		 * CARATTERE.
		 */
		{
			unbreakable: true,
			stack: [
				{
					text: 'CARATTERE',
					bold: true,
					fontSize: 10,
					color: '#77BC1F',
					margin: [0, 20, 0, 3],
				},
				{
					text: 'Solare',
					fontSize: 10,
					margin: [0, 0, 0, 3],
				},
				{
					text: 'Gioioso',
					fontSize: 10,
					margin: [0, 0, 0, 3],
				},
				{
					text: 'Paziente',
					fontSize: 10,
					margin: [0, 0, 0, 3],
				},
			],
		},
		/**
		 * end of CARATTERE.
		 */

		/**
		 * HOBBY E INTERESSI.
		 */
		{
			unbreakable: true,
			stack: [
				{
					text: 'HOBBY E INTERESSI',
					bold: true,
					fontSize: 10,
					color: '#77BC1F',
					margin: [0, 20, 0, 3],
				},
				{
					text: 'Cinema',
					fontSize: 10,
					margin: [0, 0, 0, 3],
				},
				{
					text: 'Teatro',
					fontSize: 10,
					margin: [0, 0, 0, 3],
				},
				{
					text: 'Sport',
					fontSize: 10,
					margin: [0, 0, 0, 3],
				},
				{
					text: 'Fotografia',
					fontSize: 10,
					margin: [0, 0, 0, 3],
				},
				{
					text: 'Volontariato',
					fontSize: 10,
					margin: [0, 0, 0, 3],
				},
			],
		},
		/**
		 * end of HOBBY E INTERESSI.
		 */

		 /**
		 * DISPONIBILITÀ AGGIUNTIVE.
		 */
		{
			unbreakable: true,
			stack: [
				{
					text: 'DISPONIBILITÀ AGGIUNTIVE',
					bold: true,
					fontSize: 10,
					color: '#77BC1F',
					margin: [0, 20, 0, 3]
				},
				{
					margin: [0, 3, 0, 3],
					text: [
						{
							text: `${FontAwesomeCharset.get('ok')}`,
							style: 'icon',
							color: '#77BC1F',
						},
						{
							text: ' Lavoro in presenza di animali',
							fontSize: 10,
						}
					],
				},
				{
					margin: [0, 0, 0, 3],
					text: [
						{
							text: `${FontAwesomeCharset.get('ok')}`,
							style: 'icon',
							color: '#77BC1F',
						},
						{
							text: ' Cura degli animali',
							fontSize: 10,
						}
					],
				},
				{
					margin: [0, 0, 0, 3],
					text: [
						{
							text: `${FontAwesomeCharset.get('ok')}`,
							style: 'icon',
							color: '#77BC1F',
						},
						{
							text: ' Trasferte brevi',
							fontSize: 10,
						}
					],
				},
				{
					margin: [0, 0, 0, 3],
					text: [
						{
							text: `${FontAwesomeCharset.get('cancel')}`,
							style: 'icon',
							color: '#8A8A8D',
						},
						{
							text: ' Trasferte lunghe',
							fontSize: 10,
						}
					],
				},
				{
					margin: [0, 0, 0, 3],
					text: [
						{
							text: `${FontAwesomeCharset.get('cancel')}`,
							style: 'icon',
							color: '#8A8A8D',
						},
						{
							text: ' Vacanze con la famiglia',
							fontSize: 10,
						}
					],
				},
				{
					margin: [0, 0, 0, 3],
					text: [
						{
							text: `${FontAwesomeCharset.get('ok')}`,
							style: 'icon',
							color: '#77BC1F',
						},
						{
							text: ' Straordinari',
							fontSize: 10,
						}
					],
				},
			],
		}
		/**
		 * end of DISPONIBILITÀ AGGIUNTIVE.
		 */
	],
	style: 'mainLayoutLeftCol'
};

/**
 * Right column of pdf doc.
 */
const rightColumn = {
	border: [false, false, false, false],
	stack: [
		/**
		 * NOME E COGNOME.
		 */
		{
			table: {
				widths: ['auto'],
				body: [
					[
						{
							text: 'MARIA LUISA LOSITO',
							fillColor: '#77BC1F',
							border: [false, false, false, false],
							color: '#FFF',
							fontSize: 16,
						},
					],
				]
			},
		},
		/**
		 * end of NOME E COGNOME.
		 */

		/**
		 * TIPO CANDIDATURA.
		 */
		{
			text: 'BABY-SITTER | COLF',
			bold: true,
			fontSize: 10,
			color: '#77BC1F',
			margin: [0, 10, 0, 26]
		},
		/**
		 * end of TIPO CANDIDATURA.
		 */

		/**
		 * ESPERIENZE PROFESSIONALI.
		 */
		{
			unbreakable: true,
			stack: [
				{
					text: 'ESPERIENZE PROFESSIONALI',
					bold: true,
					fontSize: 10,
					color: '#77BC1F',
					margin: [0, 0, 0, 3]
				},
				{
					text: '2016 - 2018 | BABY-SITTER',
					bold: true,
					fontSize: 8,
					color: '#77BC1F',
					margin: [0, 0, 0, 3],
				},
				{
					text: 'Famiglia Rossi, Milano',
					fontSize: 10,
					bold: true,
					margin: [0, 0, 0, 3],
				},
				{
					text: 'Per questa famiglia mi sono occupata della cura di due bambini, uno di 3-5 anni ed uno di 8-10 anni. In particolare, mi sono occupata di: Accompagnamento a/da scuola e a/da attività;Disponibilità a prendere parte alle vacanze con la famiglia.',
					fontSize: 10,
					margin: [0, 0, 0, 20],
				},
			],
		},
		{
			unbreakable: true,
			stack: [
				{
					text: '2014 - 2016 | BABY-SITTER',
					bold: true,
					fontSize: 8,
					color: '#77BC1F',
					margin: [0, 0, 0, 3],
				},
				{
					text: 'Famiglia Bianchi, Roma',
					fontSize: 10,
					bold: true,
					margin: [0, 0, 0, 3],
				},
				{
					text: 'Per questa famiglia mi sono occupata della cura di una bambina di 2-4 anni. In particolare, mi sono occupata di: Cura dell’igiene e aiuto nel vestirsi (bagnett  o, doccia, denti); Preparazione e somministrazione di pappa e/o pasti; Gioco e intr  attenimento in casa e fuori casa.',
					fontSize: 10,
					margin: [0, 0, 0, 20],
				},
			],
		},
		{
			unbreakable: true,
			stack: [
				{
					text: '2012 - 2014 | BABY-SITTER',
					bold: true,
					fontSize: 8,
					color: '#77BC1F',
					margin: [0, 0, 0, 3],
				},
				{
					text: 'Famiglia Palazzo, Roma',
					fontSize: 10,
					bold: true,
					margin: [0, 0, 0, 3],
				},
				{
					text: 'Per questa famiglia mi sono occupata della cura di una bambina di 4-6 anni. In particolare, mi sono occupata di: Cura dell’igiene e aiuto nel vestirsi (bagnett  o, doccia, denti); Preparazione e somministrazione di pappa e/o pasti; Gioco e intr  attenimento in casa e fuori casa; Cucina semplice.',
					fontSize: 10,
					margin: [0, 0, 0, 20],
				},
			],
		},
		{
			unbreakable: true,
			stack: [
				{
					text: '2008 - 2010 | COLF',
					bold: true,
					fontSize: 8,
					color: '#77BC1F',
					margin: [0, 0, 0, 3],
				},
				{
					text: 'Famiglia Verini, Verona',
					fontSize: 10,
					bold: true,
					margin: [0, 0, 0, 3],
				},
				{
					text: 'Per questa famiglia mi sono occupata della pulizia della casa (100 mq). In particolare, mi sono occupata di: Riordino stanze; Lavaggio e stiratura capi; Spesa e piccole commissioni.',
					fontSize: 10,
					margin: [0, 0, 0, 20],
				},
			],
		},
		/**
		 * end of ESPERIENZE PROFESSIONALI.
		 */

		/**
		 * REFERENZE.
		 */
		{
			unbreakable: true,
			stack: [
				{
					text: 'REFERENZE',
					bold: true,
					fontSize: 10,
					color: '#77BC1F',
					margin: [0, 20, 0, 0]
				},
				{
					table: {
						widths: ['*', 'auto'],
						body: [
							[
								{
									text: 'Famiglia Palazzo',
									bold: true,
									fontSize: 10,
									border: [false, false, false, true],
									borderColor: ['#B8B8B8', '#B8B8B8', '#B8B8B8', '#B8B8B8'],
								},
								{
									text: [
										{
											text: `${FontAwesomeCharset.get('circle')}`,
											style: 'icon',
											color: '#77BC1F',
										},
										{ text: ' ', fontSize: 6 },
										{
											text: `${FontAwesomeCharset.get('circle')}`,
											style: 'icon',
											color: '#77BC1F',
											margin: [2, 10, 2, 10],
										},
										{ text: ' ', fontSize: 6 },
										{
											text: `${FontAwesomeCharset.get('circle')}`,
											style: 'icon',
											color: '#77BC1F',
										},
										{ text: ' ', fontSize: 6 },
										{
											text: `${FontAwesomeCharset.get('circle')}`,
											style: 'icon',
											color: '#77BC1F',
										},
										{ text: ' ', fontSize: 6 },
										{
											text: `${FontAwesomeCharset.get('circle')}`,
											style: 'icon',
											color: '#B8B8B8',
										},
									],
									noWrap: true,
									border: [false, false, false, true],
									margin: [0, 3, 0, 0],
									borderColor: ['#B8B8B8', '#B8B8B8', '#B8B8B8', '#B8B8B8'],
								},
							],
						]
					},
					layout: {
						paddingLeft: () => 0,
						paddingRight: () => 0,
					},
				},
				{
					text: 'Luisa è una persona disponibile, e affidabile. I miei bambini si sono trovati benissimo con lei.',
					fontSize: 10,
					margin: [0, 0, 0, 10]
				},
			],
		},
		{
			unbreakable: true,
			stack: [
				{
					table: {
						widths: ['*', 'auto'],
						body: [
							[
								{
									text: 'Famiglia Rossi',
									bold: true,
									fontSize: 10,
									border: [false, false, false, true],
									borderColor: ['#B8B8B8', '#B8B8B8', '#B8B8B8', '#B8B8B8'],
								},
								{
									noWrap: true,
									border: [false, false, false, true],
									margin: [0, 3, 0, 0],
									borderColor: ['#B8B8B8', '#B8B8B8', '#B8B8B8', '#B8B8B8'],
									text: [
										{
											text: `${FontAwesomeCharset.get('circle')}`,
											style: 'icon',
											color: '#77BC1F',
										},
										{ text: ' ', fontSize: 6 },
										{
											text: `${FontAwesomeCharset.get('circle')}`,
											style: 'icon',
											color: '#77BC1F',
											margin: [2, 10, 2, 10],
										},
										{ text: ' ', fontSize: 6 },
										{
											text: `${FontAwesomeCharset.get('circle')}`,
											style: 'icon',
											color: '#77BC1F',
										},
										{ text: ' ', fontSize: 6 },
										{
											text: `${FontAwesomeCharset.get('circle')}`,
											style: 'icon',
											color: '#77BC1F',
										},
										{ text: ' ', fontSize: 6 },
										{
											text: `${FontAwesomeCharset.get('circle')}`,
											style: 'icon',
											color: '#B8B8B8',
										},
									],
								},
							],
						]
					},
					layout: {
						paddingLeft: () => 0,
						paddingRight: () => 0,
					},
				},
				{
					text: 'Luisa è una persona affidabile, ma poco paziente con i bambini. Pulisce benissimo la casa.',
					fontSize: 10,
					margin: [0, 0, 0, 20]
				},
			],
		},
		/**
		 * end of REFERENZE.
		 */

		/**
		 * COMPETENZE - CURA DEI BAMBINI.
		 */
		{
			unbreakable: true,
			stack: [
				{
					text: 'COMPETENZE - CURA DEI BAMBINI',
					bold: true,
					fontSize: 10,
					color: '#77BC1F',
					margin: [0, 20, 0, 3]
				},
				{
					text: [
						{
							text: `${FontAwesomeCharset.get('ok')}`,
							style: 'icon',
							color: '#77BC1F',
						},
						{
							text: ' Cura dell’igiene e aiuto nel vestirsi (bagnetto, doccia, denti)',
							fontSize: 10,
						}
					],
					margin: [0, 3, 0, 3],
				},
				{
					text: [
						{
							text: `${FontAwesomeCharset.get('ok')}`,
							style: 'icon',
							color: '#77BC1F',
						},
						{
							text: ' Preparazione e somministrazione di pappa e/o pasti',
							fontSize: 10,
						}
					],
					margin: [0, 0, 0, 3],
				},
				{
					text: [
						{
							text: `${FontAwesomeCharset.get('ok')}`,
							style: 'icon',
							color: '#77BC1F',
						},
						{
							text: ' Gioco e intrattenimento in casa e fuori casa',
							fontSize: 10,
						}
					],
					margin: [0, 0, 0, 3],
				},
				{
					text: [
						{
							text: `${FontAwesomeCharset.get('cancel')}`,
							style: 'icon',
							color: '#8A8A8D',
						},
						{
							text: ' Animazione di feste',
							fontSize: 10,
						}
					],
					margin: [0, 0, 0, 3],
				},
				{
					text: [
						{
							text: `${FontAwesomeCharset.get('cancel')}`,
							style: 'icon',
							color: '#8A8A8D',
						},
						{
							text: ' Aiuto nello svolgimento dei compiti',
							fontSize: 10,
						}
					],
					margin: [0, 0, 0, 3],
				},
				{
					text: [
						{
							text: `${FontAwesomeCharset.get('ok')}`,
							style: 'icon',
							color: '#77BC1F',
						},
						{
							text: ' Accompagnamento a/da scuola e a/da attività extrascolastiche',
							fontSize: 10,
						}
					],
					margin: [0, 0, 0, 3],
				},
			],
		},
		/**
		 * end of COMPETENZE - CURA DEI BAMBINI.
		 */

		/**
		 * COMPETENZE - CURA DELLA CASA.
		 */
		{
			unbreakable: true,
			stack: [
				{
					text: 'COMPETENZE - CURA DELLA CASA',
					bold: true,
					fontSize: 10,
					color: '#77BC1F',
					margin: [0, 20, 0, 3]
				},
				{
					text: [
						{
							text: `${FontAwesomeCharset.get('ok')}`,
							style: 'icon',
							color: '#77BC1F',
						},
						{
							text: ' Pulizia ordinaria',
							fontSize: 10,
						}
					],
					margin: [0, 3, 0, 3],
				},
				{
					text: [
						{
							text: `${FontAwesomeCharset.get('ok')}`,
							style: 'icon',
							color: '#77BC1F',
						},
						{
							text: ' Pulizia straordinaria',
							fontSize: 10,
						}
					],
					margin: [0, 0, 0, 3],
				},
				{
					text: [
						{
							text: `${FontAwesomeCharset.get('ok')}`,
							style: 'icon',
							color: '#77BC1F',
						},
						{
							text: ' Riordino delle stanze',
							fontSize: 10,
						}
					],
					margin: [0, 0, 0, 3],
				},
				{
					text: [
						{
							text: `${FontAwesomeCharset.get('cancel')}`,
							style: 'icon',
							color: '#8A8A8D',
						},
						{
							text: ' Utilizzo elettrodomestici',
							fontSize: 10,
						}
					],
					margin: [0, 0, 0, 3],
				},
				{
					text: [
						{
							text: `${FontAwesomeCharset.get('cancel')}`,
							style: 'icon',
							color: '#8A8A8D',
						},
						{
							text: ' Lavaggio e stiratura capi',
							fontSize: 10,
						}
					],
					margin: [0, 0, 0, 3],
				},
				{
					text: [
						{
							text: `${FontAwesomeCharset.get('ok')}`,
							style: 'icon',
							color: '#77BC1F',
						},
						{
							text: ' Cucina semplice',
							fontSize: 10,
						}
					],
					margin: [0, 0, 0, 3],
				},
			],
		},
		/**
		 * end of COMPETENZE - CURA DELLA CASA.
		 */
	],
	style: 'mainLayoutRightCol'
};

/**
 * The content of the pdf document.
 */
const docContent = {
	table: {
		widths: [ '40%', '60%' ],
		body: [
			[
				leftColumn,
				rightColumn,
			],
		]
	}
};

/**
 * Generates the footer of the pdf document.
 * @param {*} currentPage
 * @param {*} pageCount
 */
function docFooter(currentPage, pageCount) {
	return {
		text:  `Pagina ${currentPage.toString()}/${pageCount}`,
		fontSize: 10,
		margin: [45, 5, 0, 0],
	};
}

/**
 * Generates the header of the pdf document.
 * @param {*} currentPage
 * @param {*} pageCount
 */
function docHeader() {
	return {
		table: {
			widths: ['100%'],
			body: [
				[
					
					{
						text: [
							{ text: 'CV | ', bold: true, fontSize: 8, },
							{ text: 'Maria Luisa Losito', color: '#77BC1F', bold: true, fontSize: 8, }
						],
						alignment: 'right',
						border: [false, false, false, false],
						margin: [0, 20, 40, 0],
					},
				],
			]
		},
		layout: {
			paddingLeft: () => 0,
			paddingRight: () => 0,
		},
	};
}


/**
 * The styles of pdf doc.
 */
const docStyles = {
	icon: {
		font: 'FontAwesome',
		fontSize: 9,
		color: '#77BC1F'
	},
	mainLayoutLeftCol: {
		margin: [0, 0, 0, 0]
	},
	mainLayoutRightCol: {
		margin: [10, 0, 0, 0]
	}
};

/**
 * The default style of pdf doc.
 */
const docDefaultStyle = {
	font: 'Montserrat',
	color: '#55565A'
};

/**
 * The background of pdf doc.
 */
const docBackground = {
	table: {
		widths: [ '40%' ],
		heights: [ 836 ],
		body: [
			[
				{
					border: [false, false, false, false],
					fillColor: '#F0F2F1',
					stack: []
				}
			]
		],
	}
};

/**
 * The properties of every doc page.
 */
const pageProps = {
  pageMargins: [ 40, 60, 40, 60 ],
};

/**
 * The definition of pdf doc. 
 */
export const pdfDocDefinition = {
	header: docHeader,
	footer: docFooter,
	background: docBackground,
	...pageProps,
	content: [ docContent ],
	defaultStyle: docDefaultStyle,
	styles: docStyles,
};