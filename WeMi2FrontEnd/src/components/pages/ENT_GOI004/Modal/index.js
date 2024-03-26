import React, { useState } from 'react';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Button from 'components/ui2/Button';
import Modal from 'components/ui2/Modal';
import Hr from 'components/ui/Hr';
import { graphqlRequest } from 'redux-modules/actions/authActions';
import { connect } from 'react-redux';
import { colors } from 'theme';
import Select from 'components/ui2/Select';

const ModaleServizio = ({
    open,
    setOpen,
    lista,
    submit,
    aggiungiDisabled,
}) => {
  const serviziSelectOptions = lista ?
        lista.map(el => ({
          id: el.value,
          value: `${el.textValue} ${el.catAccreditamento ? `- ${el.catAccreditamento}` : ''}`,
        })) : [];


  const [selectedValue, setSelected] = useState([]);

  const handleAggiungi = () => {
    submit(selectedValue);
  };


  const children = (
    <>
      <Row direction="column">
        <Text value="Nuovo servizio" size="f0" color="primary" />
        <Hr height="0.25em" width="70%" left="0" color="primary" top="2px" bottom="5px" />
      </Row>
      <div style={{ padding: '5em 4em' }}>

        <Row>
          {serviziSelectOptions.length > 0 ? (
            <Select
              enableSearch
              name="Servizi disponibili"
              multi
              items={serviziSelectOptions}
              color="primary"
              label="Servizi disponibili"
              clickedItem={(value) => { setSelected(selectedValue.concat([value])); }}
              clickedSelectedItem={(value) => { setSelected(selectedValue.filter((el) => el.id !== value.id)); }}
              selectedValue={selectedValue}
              placeholder="Servizi disponibili"
            />
                          )
                            : null
                        }

        </Row>
      </div>
      <Row justifycontent="center">
        <Column xs={4} md={5} mdShift="0" padding="2em ">
          <Button
            label="Aggiungi"
            onClick={handleAggiungi}
            disabled={aggiungiDisabled}
          />
        </Column>
      </Row>
    </>
    );

  return (
    <Modal
      noHiddenOver
      open={open}
      setOpenModal={setOpen.bind(this)}
      marginTop="10em"
      border={`1px ${colors.primary} solid`}
      radius="0"
      bgcolorIcon="red"
      iconRadius="50%"
      iconHeight="2em"
      iconWidth="2em"
      responsiveWidth="1.8"
      headerValue="Errore"
      headerHeight="5em"
      width="50%"
      iconcolor="white"
    >
      {children}
    </Modal>
  );
};

const mapDispatchToProps = {
  graphqlRequest,
};

function mapStateToProps(state) {
  const { graphql } = state;
  const { error } = graphql;
  return {
    error,
  };
}

ModaleServizio.displayName = 'ModaleServizio';

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModaleServizio);
