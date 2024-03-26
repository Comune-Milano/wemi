import React from 'react';
import Text from 'components/ui/Text';
import italiano_icona_scuola from 'images2/inclusione/italiano_icona_scuola.png';
import italiano_icona_titolo from 'images2/inclusione/italiano_icona_titolo.png';
import italiano_icona_costo from 'images2/inclusione/italiano_icona_costo.png';
import italiano_icona_insegnante from 'images2/inclusione/italiano_icona_insegnante.png';
import italiano_icona_livello from 'images2/inclusione/italiano_icona_livello.png';
import { TextPointer } from '../CorsoItaliano.styled';

export const contentTableTop = (setOpenModalAttestazione, setOpenModalCertificazione, setOpenModalCefr) => (
  [
    {
      src: italiano_icona_scuola,
      textSx: (
        <Text
          value="CORSI DELLA DIREZIONE ECONOMIA URBANA E LAVORO, AREA LAVORO E FORMAZIONE DEL COMUNE DI MILANO"
          lineHeight="175%"
          size="f7"
          letterSpacing="0.05em"
        />
      ),
      textDx: (
        <Text
          value="CPIA (CENTRI PROVINCIALI PER L'ISTRUZIONE DEGLI ADULTI)"
          lineHeight="175%"
          size="f7"
          letterSpacing="0.05em"
        />
      ),
      colorBg: "blue",
      colorBorder: "blue",
      colorText: "blue",
      opacity: true,
    },
    {
      src: italiano_icona_titolo,
      textSx: (
        <>
          <Text
            value="Puoi ottenere la"
            lineHeight="175%"
            size="f7"
          />
      &nbsp;
          <TextPointer
            value="certificazione CISL"
            lineHeight="175%"
            color="blue"
            fontStyle="italic"
            decoration="underline"
            size="f7"
            onClick={() => { setOpenModalCertificazione(true); }}
          />
        </>
      ),
      textDx: (
        <>
          <Text
            value="Puoi ottenere"
            lineHeight="175%"
            size="f7"
          />
      &nbsp;
          <TextPointer
            value="l'attestazione"
            lineHeight="175%"
            color="blue"
            fontStyle="italic"
            decoration="underline"
            size="f7"
            onClick={() => { setOpenModalAttestazione(true); }}
          />
        &nbsp;
          <Text
            value="o"
            lineHeight="175%"
            size="f7"
          />
        &nbsp;
          <TextPointer
            value="l'attestazione CISL"
            lineHeight="175%"
            color="blue"
            fontStyle="italic"
            decoration="underline"
            size="f7"
            onClick={() => { setOpenModalCertificazione(true); }}
          />
        </>
      ),
    },
    {
      src: italiano_icona_costo,
      textSx: (
        <>
          <Text
            value="Corsi a pagamento"
            lineHeight="175%"
            size="f7"
          />
          <br />
          <Text
            value="La"
            lineHeight="175%"
            size="f7"
          />
        &nbsp;
          <TextPointer
            value="certificazione"
            lineHeight="175%"
            color="blue"
            fontStyle="italic"
            decoration="underline"
            size="f7"
            onClick={() => { setOpenModalCertificazione(true); }}
          />
        &nbsp;
          <Text
            value="ha un costo a parte"
            lineHeight="175%"
            size="f7"
          />
        </>
      ),
      textDx: (
        <>
          <Text
            value="Corsi gratuiti o molto economici"
            lineHeight="175%"
            size="f7"
          />
          <br />
          <Text
            value="La"
            lineHeight="175%"
            size="f7"
          />
        &nbsp;
          <TextPointer
            value="certificazione"
            lineHeight="175%"
            color="blue"
            fontStyle="italic"
            decoration="underline"
            size="f7"
            onClick={() => { setOpenModalCertificazione(true); }}
          />
        &nbsp;
          <Text
            value="ha un costo a parte"
            lineHeight="175%"
            size="f7"
          />
        </>
      ),
    },
    {
      src: italiano_icona_insegnante,
      textSx: (
        <Text
          value="Insegnanti professionisti"
          lineHeight="175%"
          size="f7"
        />
      ),
      textDx: (
        <Text
          value="Insegnanti professionisti"
          lineHeight="175%"
          size="f7"
        />
      ),
    },
    {
      src: italiano_icona_livello,
      textSx: (
        <>
          <Text
            value="Livelli"
            lineHeight="175%"
            size="f7"
          />
        &nbsp;
          <TextPointer
            value="A1, A2, B1, B2, C1"
            lineHeight="175%"
            color="blue"
            fontStyle="italic"
            decoration="underline"
            size="f7"
            onClick={() => { setOpenModalCefr(true); }}
          />
        </>
      ),
      textDx: (
        <>
          <Text
            value="Livelli"
            lineHeight="175%"
            size="f7"
          />
        &nbsp;
          <TextPointer
            value="A1, A2, B1, B2, C1"
            lineHeight="175%"
            color="blue"
            fontStyle="italic"
            decoration="underline"
            size="f7"
            onClick={() => { setOpenModalCefr(true); }}
          />
        </>
      ),
    },
  ]
);

export const contentTableBottom = (setOpenModalAttestazione, setOpenModalCertificazione, setOpenModalCefr) => (
  [
    {
      src: italiano_icona_scuola,
      textSx: (
        <Text
          value="COOPERATIVE, FONDAZIONI, ASSOCIAZIONI DI VOLONTARIATO, PARROCCHIE, ..."
          lineHeight="175%"
          size="f7"
          letterSpacing="0.05em"
        />
      ),
      textDx: (
        <Text
          value="SCUOLE PRIVATE"
          lineHeight="175%"
          size="f7"
          letterSpacing="0.05em"
        />
      ),
      colorBg: "blue",
      colorBorder: "blue",
      colorText: "blue",
      opacity: true,
    },
    {
      src: italiano_icona_titolo,
      textSx: (
        <>
          <Text
            value="Puoi ottenere un attestato di frequenza e prepararti a sostenere l’esame di"
            lineHeight="175%"
            size="f7"
          />
      &nbsp;
          <TextPointer
            value="certificazione"
            lineHeight="175%"
            color="blue"
            fontStyle="italic"
            decoration="underline"
            size="f7"
            onClick={() => { setOpenModalCertificazione(true); }}
          />
        </>
      ),
      textDx: (
        <>
          <Text
            value="Solitamente puoi ottenere la"
            lineHeight="175%"
            size="f7"
          />
      &nbsp;
          <TextPointer
            value="certificazione"
            lineHeight="175%"
            fontStyle="italic"
            color="blue"
            decoration="underline"
            size="f7"
            onClick={() => { setOpenModalCertificazione(true); }}
          />
        </>
      ),
    },
    {
      src: italiano_icona_costo,
      textSx: (
        <>
          <Text
            value="Corsi sia gratuiti che a pagamento"
            lineHeight="175%"
            size="f7"
          />
          <br />
          <Text
            value="La"
            lineHeight="175%"
            size="f7"
          />
        &nbsp;
          <TextPointer
            value="certificazione"
            lineHeight="175%"
            color="blue"
            fontStyle="italic"
            decoration="underline"
            size="f7"
            onClick={() => { setOpenModalCertificazione(true); }}
          />
        &nbsp;
          <Text
            value="ha un costo a parte"
            lineHeight="175%"
            size="f7"
          />
        </>
      ),
      textDx: (
        <>
          <Text
            value="Corsi a pagamento"
            lineHeight="175%"
            size="f7"
          />
        </>
      ),
    },
    {
      src: italiano_icona_insegnante,
      textSx: (
        <Text
          value="Insegnanti sia volontari che professionisti"
          lineHeight="175%"
          size="f7"
        />
      ),
      textDx: (
        <Text
          value="Insegnanti professionisti"
          lineHeight="175%"
          size="f7"
        />
      )
    },
    {
      src: italiano_icona_livello,
      textSx: (
        <>
          <Text
            value="Livelli"
            lineHeight="175%"
            size="f7"
          />
        &nbsp;
          <TextPointer
            value="A1, A2, B1, B2, C1"
            lineHeight="175%"
            fontStyle="italic"
            color="blue"
            decoration="underline"
            size="f7"
            onClick={() => { setOpenModalCefr(true); }}
          />
        </>
      ),
      textDx: (
        <>
          <Text
            value="Livelli"
            lineHeight="175%"
            size="f7"
          />
        &nbsp;
          <TextPointer
            value="A1, A2, B1, B2, C1, C2"
            lineHeight="175%"
            color="blue"
            fontStyle="italic"
            decoration="underline"
            size="f7"
            onClick={() => { setOpenModalCefr(true); }}
          />
        </>
      ),
    },
  ]
);
