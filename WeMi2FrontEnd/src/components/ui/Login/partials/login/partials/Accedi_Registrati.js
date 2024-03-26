import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import Button from 'components/ui2/Button';
import Text from 'components/ui/Text';
import Image from 'components/ui/Image';
import AnchorLink from 'components/ui/AnchorLink';
import { __AUTH_DEV__, __BASE_URL__, __AUTH_PROD__ } from 'utils/environment/variables';
import { LOGIN_URL } from 'types/loginurl';
import { useExternalRedirectManager } from 'hooks/externalRedirect/useExternalRedirect';
import LoginModalJson from './LoginModalJson';

const AccediRegistrati = ({ openModal, setShowComponent, showComponent, array, setState }) => {
  const extRedirectManager = useExternalRedirectManager();

  return (
    <Row fluid>
      <Column padding="1em">
        <Image src={LoginModalJson.login.img} />
      </Column>
      <Column fluid sizepadding={{ md: '1em 5em 1em 5em' }} padding="1em">
        <div style={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <Text value={LoginModalJson.login.text} size="f6" align="center" />
        </div>
      </Column>
      <Row fluid>
        <Column sizepadding={{ md: '1em 7em 1em 7em' }} padding="1em">
          <Button
            label={LoginModalJson.login.button}
            onClick={() => {
              setShowComponent(!showComponent);
            }}
          />

        </Column>
      </Row>
    </Row>

  );
};

AccediRegistrati.displayName = 'Accedi registrati';

export default AccediRegistrati;
