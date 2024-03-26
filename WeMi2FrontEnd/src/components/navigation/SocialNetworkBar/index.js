/** @format */

import React from 'react';
import {Row} from 'components/ui/Grid';
import styled from 'styled-components';
import FaIcon from 'components/ui/FaIcon';
import AnchorLink from 'components/ui/AnchorLink';

const SocialNetworkRow = styled(Row)`

`
const url = (socialIcon,socialUrl) => {
  if(socialUrl && socialUrl.social )
  switch(socialIcon.linkType) {
    case 'facebook':
    return 'https://www.facebook.com/' + socialUrl.social.txFacebook ;
    case 'twitter':
    return 'https://twitter.com/'+ socialUrl.social.txTwitter ;
    case 'instagram':
    return 'https://www.instagram.com/' + socialUrl.social.txInstagram ;
    case 'mail':
    return `mailto:${socialUrl.mail.txEmail}` ;
    case 'desktop':
    return 'https://'+ socialUrl.social.txWeb;
    default:
    return null;
  }
}
const SocialNetworkBar = ({
    socialBarArray,
    socialUrl,
    fontSize,
    iconColor,
    iconWidth,
    iconHeight,
    iconPadding,
    margin,
    padding,
}) => {

  return (
    <SocialNetworkRow fluid justifycontent="space-between" margin={margin} padding={padding}>
            {socialBarArray.map((socialIcon,index) => (
              <AnchorLink 
              key={index.toString()}
              target="_blank"
              to={
                url(socialIcon,socialUrl)
              }>
               <FaIcon
               socicon={socialIcon.socicon}
               bgcolor={socialIcon.iconBgColor}
               color={socialIcon.iconColor}
               fontSize={fontSize}
               pointer
               radius="50%"
               padding={iconPadding}
               height={iconHeight}
               width={iconWidth}
                icon={ () => {
                  switch(socialIcon.linkType) {
                    case 'facebook':
                    return `\\e028` ;
                    case 'twitter':
                    return "\\e08d" ;
                    case 'instagram':
                    return "\\e044" ;
                    case 'mail':
                    return "\\e050" ;
                    case 'desktop':
                    return "\\f108" ;
                    default:
                    return null;
                  }
                }
              }
               
                /></AnchorLink>))}
    </SocialNetworkRow>
  );
};

SocialNetworkRow.displayName = 'SocialNetworkRow';

export default SocialNetworkBar;