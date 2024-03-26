import React, { useContext } from 'react';
import { contentContext } from "../../ContentContext";
import AnchorLink from 'components/ui/AnchorLink';

export const AnchorModal = ({ content, index }) => {
  const context = useContext(contentContext);

  const { setPopupInformativo, setIndice } = context;

  return (
    <AnchorLink key={content.id_contenuto}
        onClick={() => {
          setPopupInformativo(true);
          setIndice(index);
        }}
        value={content.tl_testo_1 ? content.tl_testo_1.it : ''}
        size="f8" decoration="underline" color="darkGrey" />
  );
}