import React from 'react';
import { SUBTYPE_CONTENUTO } from 'types/contenuti/subtypecontenuto';
import { matchServicesAreaIdentifier } from 'utils/functions/serviceareaidentifier';
import { isExternalUrl } from 'utils/functions/isexternalurl';
import NavLink from 'components/router/NavLink';
import { PAGE_HOME_URL } from 'types/url';
import { HOME_ANCHORS } from 'components/pages/Home/constants/anchors';
import { useEventBus } from 'hooks/eventBus/useEventBus';
import Text from 'components/ui/Text';
import AnchorLink from 'components/ui/AnchorLink';
import { StyledListItem, StyledHashLink } from './StyledList';

const MenuLiv2Component = ({ liv2, locale }) => {
  const eventBus = useEventBus();

  return (
    <>
      {liv2.map((listItem2, index) => {
        if (listItem2.sottotipo === SUBTYPE_CONTENUTO.PAGINA_INFORMATIVA) {
          return (
            <StyledListItem
              role="none"
              clickable
              key={index.toString()}
            >
              <NavLink
                role="menuitem"
                to={`/PaginaInformativa/${listItem2.idLiv2}`}
                align="left"
                margin="auto"
                width="100%"
              >
                <Text
                  size="f7"
                  value={listItem2.txLiv2[locale]}
                  align="left"
                  letterSpacing="0.05em"
                />
              </NavLink>
            </StyledListItem>
          );
        }

        if (listItem2.sottotipo === SUBTYPE_CONTENUTO.LINK_ESTERNO) {
          if (!matchServicesAreaIdentifier(listItem2.linkLiv2)) {
            return (
              <StyledListItem
                key={index.toString()}
                clickable
                role="none"
              >
                {
                  isExternalUrl(listItem2.linkLiv2) ?
                    (
                      <AnchorLink
                        align="left"
                        role="menuitem"
                        // cursordefault
                        _blank
                        to={listItem2.linkLiv2}
                        width="100%"
                      >
                        <Text
                          size="f7"
                          value={listItem2.txLiv2[locale]}
                          align="left"
                          letterSpacing="0.05em"
                        />
                      </AnchorLink>

                    ) : (
                      <NavLink
                        role="menuitem"
                        cursordefault
                        to={listItem2.linkLiv2}
                        margin="0"
                        alignitems="center"
                        width="auto"
                      >
                        <Text
                          tag="span"
                          size="f7"
                          value={listItem2.txLiv2[locale]}
                          align="left"
                          letterSpacing="0.05em"
                        />
                      </NavLink>
                    )
                }
              </StyledListItem>
            );
          }

          return (
            <StyledListItem
              key={index.toString()}
              role="none"
              clickable
            >
              <StyledHashLink
                role="menuitem"
                key={index.toString()}
                to={{
                  pathname: PAGE_HOME_URL,
                  hash: `#${HOME_ANCHORS.scopriServizi}`,
                  search:`?id=${listItem2.linkLiv2.replace('AREA_SERVIZI_', '')}`
                }}
                scroll={el => {
                  const servicesAreaCode = listItem2.linkLiv2.replace('AREA_SERVIZI_', '');
                  eventBus.publish('CHANGE_SERVICES_AREA', parseInt(servicesAreaCode, 10));
                }}
              >
                <Text
                  tag="span"
                  size="f7"
                  value={listItem2.txLiv2[locale]}
                  transform="uppercase"
                  align="left"
                  letterSpacing="0.05em"
                />
              </StyledHashLink>
            </StyledListItem>
          );
        }
        if (listItem2.sottotipo === SUBTYPE_CONTENUTO.LINK_A_MEDIA_FILE) {
          return (
            <StyledListItem role="none" key={index.toString()} clickable>
              <AnchorLink
                role="menuitem"
                align="left"
                clickable
                cursordefault
                download={`${listItem2.media1.oj_media}`}
                downloadName={listItem2.media1.nm_nome_media}
              >
                <Text
                  weight="bold"
                  size="f7"
                  value={listItem2.txLiv2[locale]}
                  align="left"
                  letterSpacing="0.05em"
                />
              </AnchorLink>
            </StyledListItem>
          );
        }
        return null;
      })
      }
    </>
  );
};
MenuLiv2Component.displayName = 'MenuLiv2';

export const MenuLiv2 = MenuLiv2Component;
