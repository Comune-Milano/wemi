import React from 'react';
import ComeFunzionaSottoHomePage from 'components/shared/ComeFunzionaSottoHomePage';
import { Wrapper } from '../components.styled';
import { HOME_DOMICILIARITA_ANCHORS, stepList } from '../constants';

const ComeFunziona = () => (
  <>
    <Wrapper id={HOME_DOMICILIARITA_ANCHORS.comeFunziona}>
      <ComeFunzionaSottoHomePage
        color="primary"
        stepList={stepList}
        text="Puoi cercare, personalizzare e acquistare l'offerta integrata di servizi per il benessere e la cura personale, familiare e domestica, gratuiti o a pagamento, disponibili in città ed erogati dalla rete di"
      />
    </Wrapper>
  </>
);

ComeFunziona.displayName = 'ComeFunziona';
export default ComeFunziona;
