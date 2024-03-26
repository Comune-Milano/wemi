import React from 'react';
import { Row } from 'components/ui/Grid';
import { UnderlineBlueTextSpan } from 'components/navigation/InfoApprendimentoLingua/components.style';
import { listaPartner } from '../constants';

const ListaPartner = () => (
  <>
    <Row fluid margin="2em 0 0 0">
      <ul>
        {listaPartner.map((partner) => (
          <li key={partner.nome}>
            <a href={partner.link} target="_blank">
              <UnderlineBlueTextSpan>
                {partner.nome}
              </UnderlineBlueTextSpan>
            </a>
          </li>
        ))}
      </ul>
    </Row>
  </>
);

ListaPartner.displayName = 'ListaPartner';
export default ListaPartner;
