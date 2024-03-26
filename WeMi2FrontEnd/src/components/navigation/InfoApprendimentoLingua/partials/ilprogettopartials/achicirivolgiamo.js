import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import React from 'react';
import { TextSpan } from '../../components.style';

const AChiCiRivolgiamo = () => (
  <>
    <Row fluid margin="1.8em 0 0 0">
      <Text
        weight="bold"
        size="f7"
        value="A CHI CI RIVOLGIAMO"
        lineHeight="175%"
        color="blue"
        letterSpacing="0.05em"
      />
    </Row>
    <Row fluid>
      <TextSpan>
        Ci rivolgiamo ad una popolazione variegata, trasversale a tutti gli ambiti della società.

        Nel corso degli anni si è sviluppata una crescente consapevolezza sull&apos;importanza

        dell&apos;apprendimento della lingua italiana per l&apos;efficacia del processo di inclusione e per la

        prevenzione di condizioni di marginalità. Il nostro servizio si rivolge alla cittadinanza nella sua

        totalità; inoltre offriamo supporto ai Servizi territoriali che si occupano di casi specifici,

        realizzando percorsi di accompagnamento integrato per i titolari di protezione Internazionale

        accolti nel SAI.

        Coltiviamo una relazione di reciproco scambio con le scuole, le realtà che si occupano di

        Italiano L2 a Milano e non solo.

        <p>
          Collaboriamo infine con gli Spazi del sistema WeMi per promuovere una rete cittadina di

          punti capillari capaci di rispondere alle esigenze del territorio.
        </p>
      </TextSpan>
    </Row>
  </>
  );

AChiCiRivolgiamo.displayName = 'AChiCiRivolgiamo';
export default AChiCiRivolgiamo;
