/**
 * Nome-cognome del lavoratore e tipologia di servizio offerto.
 */

export function rightColumnHeader(pdfData) {
  const { nomeUtente, cognomeUtente, serviziTcb, brandColor, attributiCompetenzeCuraDellaCasaColf } = pdfData;

  if (attributiCompetenzeCuraDellaCasaColf?.length
    && attributiCompetenzeCuraDellaCasaColf.some(el => el.checked)
    && serviziTcb.some(el => el.servizio !== 'COLF')) {
    serviziTcb.push({ servizio: 'COLF' });
  }

  const nomeLavoratore = nomeUtente.toUpperCase();
  const cognomeLavoratore = cognomeUtente.toUpperCase();

  return [
 /**
   * NOME E COGNOME.
   */
    {
      table: {
        widths: ['auto'],
        margin: [0, 0, 0, 0],
        body: [
          [
            {
              text: nomeLavoratore,
              fillColor: brandColor,
              border: [false, false, false, false],
              color: '#FFF',
              fontSize: 14,
              margin: [0, 0, 0, 0],
            },
          ],
        ],
      },
      margin: [0, 20, 0, 2],
    },
    {
      table: {
        widths: ['auto'],
        body: [
          [
            {
              text: cognomeLavoratore,
              fillColor: brandColor,
              border: [false, false, false, false],
              color: '#FFF',
              fontSize: 14,
            },
          ],
        ],
      },
    },
   /**
     *  end of NOME E COGNOME.
    */

   /**
     * TIPO CANDIDATURA.
    */
    {
      text: serviziTcb.map(el => el.servizio).join(' | '),
      bold: true,
      fontSize: 9,
      color: brandColor,
      margin: [0, 10, 0, 30],
    },
   /**
     * end of TIPO CANDIDATURA.
     */
  ];
}
