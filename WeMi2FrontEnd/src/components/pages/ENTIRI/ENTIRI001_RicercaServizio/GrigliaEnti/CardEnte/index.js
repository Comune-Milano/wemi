import React from 'react';
import Text from 'components/ui/Text';
import Tooltip from 'components/ui2/Tooltip';
import Button from 'components/ui2/Button';
import ButtonIcon from 'components/ui2/FaIcon/ButtonIcon';
import AnchorLink from 'components/ui/AnchorLink';
import Checkbox from 'components/ui2/Checkbox';
import Rating from 'components/ui2/Rating';
import { Row, Column } from 'components/ui/Grid';
import { moneyFormat } from 'utils/formatters/moneyFormat';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import instagramImg from 'images2/social/Instagram.svg';
import facebookImg from 'images2/social/Facebook.svg';
import twitterImg from 'images2/social/Twitter.svg';
import youtubeImg from 'images2/social/Youtube.svg';
import {
  EstraiAltreInfoEnte,
} from '../../SearchGraphQL';
import BodyTooltipPrezzo from './BodyTooltipPrezzo';
import { Card, ColumnEnteName, WrapperSocial } from './CardEnte.styled';

const CardEnte = ({
  ente,
  isSelected,
  reviewMode = false,
  toggleEnte,
  removeEnte,
  backgroundColor,
  openModaleRecensioni,
  openModaleSchedaEnte,
  openModaleServizioEnte,
  quantita,
  locale = 'it',
}) => {
  const [altreInfoEnte] = useGraphQLRequest(
    undefined,
    EstraiAltreInfoEnte,
    { id_ente: ente.idEnte },
    true,
    res => res.js_altre_info
  );

  const txFacebook = getObjectValue(altreInfoEnte.data, 'txFacebook', undefined);
  const txYoutube = getObjectValue(altreInfoEnte.data, 'txYoutube', undefined);
  const txInstagram = getObjectValue(altreInfoEnte.data, 'txInstagram', undefined);
  const txTwitter = getObjectValue(altreInfoEnte.data, 'txTwitter', undefined);

  const socialList = [
    {
      link: txFacebook,
      image: facebookImg,
      socialName: 'facebook',
    },
    {
      link: txInstagram,
      image: instagramImg,
      socialName: 'instagram',
    },
    {
      link: txTwitter,
      image: twitterImg,
      socialName: 'twitter',
    },
    {
      link: txYoutube,
      image: youtubeImg,
      socialName: 'youtube',
    },
  ];

  return (
    <Card selected={isSelected} onClick={toggleEnte} backgroundColor={backgroundColor}>
      <Row fluid justifycontent="space-between" alignitems="center" className="ent-header">
        <ColumnEnteName xs="10" padding="0">
          {
            !reviewMode ?
              (
                <Checkbox
                  noWrap
                  value={isSelected}
                  onChange={() => { }}
                  checkcolor="primary"
                  label={ente.nomeEnte}
                  fontSize="f6"
                  spacing="0"
                />
              )
              :
              (
                <Text
                  value={ente.nomeEnte}
                  size="f6"
                  color="black"
                  transform="uppercase"
                  letterSpacing="0.05em"
                  weight="bold"
                />
              )
          }
        </ColumnEnteName>
        <Column xs="1" padding="0" flex justifycontent="flex-end" className="header-buttons">
          <Tooltip
            position="bottom"
            color="white"
            bgcolor="blue"
            posAdjustment="-425%"
            value="Visualizza la scheda dell'ente e scopri gli altri servizi offerti"
            id="information-tooltip"
          >
            <ButtonIcon
              color="primary"
              icon="info"
              ariaButtonIconLabel="information-tooltip"
              fontSize="f9"
              onClick={(event) => {
                event.stopPropagation();
                openModaleSchedaEnte();
              }}
            />
          </Tooltip>
          {
            reviewMode &&
            (
              <Tooltip
                position="bottom"
                color="white"
                bgcolor="blue"
                posAdjustment="-425%"
                value={`Rimuovi ${ente.nomeEnte}`}
              >
                <ButtonIcon
                  color="red"
                  icon="times"
                  ariaButtonIconLabel={`Rimuovi ${ente.nomeEnte}`}
                  fontSize="f9"
                  onClick={removeEnte}
                />
              </Tooltip>
            )
          }
        </Column>
      </Row>
      <Row fluid tagName="small" className="ent-details">
        {
          ente.spaziWeMi.length > 0 ?
            (
              <ul>
                {ente.spaziWeMi.map((el) => (
                  <li key={el.id}>
                    <Text tag="span" value={el.label} />
                  </li>
                ))}
              </ul>
            )
            :
            null
        }
      </Row>
      <Row fluid justifycontent="space-between" alignitems="center" className="ent-body">
        <Column xs="4" className="price" padding="0">
          {
            ente.cdTipoOffertaServizio !== 3 &&
            (
              <Text
                tag="span"
                size="f6"
                value="Gratuito"
                tabIndex="0"
              />
            )
          }
          {
            ente.cdTipoOffertaServizio === 3 &&
            (
              <Tooltip
                position="top"
                color="white"
                bgcolor="blue"
                value={<BodyTooltipPrezzo ente={ente} quantita={quantita} locale={locale} />}
                posAdjustment="-75%"
                emWidth="28"
              >
                <Text
                  tag="span"
                  value={moneyFormat(ente.prezzoMinimoDaMostrare, true)}
                  size="f5"
                  tabIndex="0"
                />
              </Tooltip>
            )
          }
        </Column>
        <Column
          xs="8"
          flex
          justifycontent="flex-end"
          className="modal-buttons"
          padding="0"
        >
          <Tooltip
            position="bottom"
            color="white"
            bgcolor="blue"
            value="Qui puoi trovare maggiori informazioni su come questo ente gestisce il servizio"
          >
            <Button
              label="Dettagli"
              color="primary"
              fontSize="f7"
              padding="0.4em 0"
              onClick={(event) => {
                event.stopPropagation();
                openModaleServizioEnte();
              }}
            />
          </Tooltip>
        </Column>
      </Row>
      <Row
        className="ent-footer"
      >
        <Column lg="5" md="5" sm="5" xs="5" padding="0">
          <Row fluid>
            {socialList.map((social) => {
              if (social.link) {
                return (
                  <WrapperSocial key={social.socialName}>
                    <AnchorLink
                      to={social.link}
                      aria-label={`link ${social.socialName}`}
                      role="menuitem"
                      _blank
                      onClick={(event) => {
                        event.stopPropagation();
                      }}
                    >
                      <img
                        src={social.image}
                        alt={social.socialName}
                      />
                    </AnchorLink>
                  </WrapperSocial>
                );
              }
              return <React.Fragment key={social.socialName}></React.Fragment>;
            })}
          </Row>
        </Column>
        <Column lg="7" md="7" sm="7" xs="7" flex justifycontent="flex-end" padding="0">
          <Tooltip
            position="bottom"
            fontSize="f8"
            color="white"
            bgcolor="blue"
            value="Leggi le recensioni"
          >
            <a
              className="reviews"
              onClick={(event) => {
                event.stopPropagation();
                openModaleRecensioni();
              }}
            >
              <Text
                tag="span"
                tabIndex="0"
                value={`${ente.numeroRecensioni} ${ente.numeroRecensioni === 1 ? ' recensione' : ' recensioni'}`}
                fontSize="f7"
                color="darkGrey"
              />
            </a>
          </Tooltip>
          <span className="rating">
            <Rating
              readOnly
              stars={ente.mediaRecensioni}
              spacingRight="0.1em"
              fontSize="f8"
              tabIndex="0"
            />
          </span>
        </Column>
      </Row>
    </Card>
  );
};

CardEnte.displayName = 'Card ente';

export default React.memo(CardEnte);
