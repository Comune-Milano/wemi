import React from 'react';
import AnchorLink from 'components/ui/AnchorLink';
import { NavLink } from 'components/router';
import { SUBTYPE_CONTENUTO } from 'types/contenuti/subtypecontenuto';
import Text from 'components/ui/Text';

export const PrivacyContentLink = ({ privacyContent, label }) => {
  const labelText = (
    <Text
      value={label}
      size="f8"
      decoration="underline"
    />
  );

  switch (privacyContent.ty_sottotipo_contenuto) {
    case SUBTYPE_CONTENUTO.LINK_ESTERNO:
      return (
        <AnchorLink
          to={privacyContent.ln_link_1}
          _blank
          align="left"
          display="inline-block"
        >
          { labelText }
        </AnchorLink>
      );
    case SUBTYPE_CONTENUTO.PAGINA_INFORMATIVA:
      return (
        <NavLink
          display="inline-block"
          textDecoration="underline"
          to={`/PaginaInformativa/${privacyContent.id_contenuto}`}
        >
          { labelText }
        </NavLink>
      );
    case SUBTYPE_CONTENUTO.LINK_A_MEDIA_FILE:
      return (
        <AnchorLink
          align="left"
          display="inline-block"
          textDecoration="underline"
          size="f8"
          download={`${privacyContent.oj_media2}`}
          downloadName={privacyContent.nm_nome_media2}
        >
          { labelText }
        </AnchorLink>
      );
    default:
      return null;
  }
};

PrivacyContentLink.displayName = 'PrivacyContentLink';