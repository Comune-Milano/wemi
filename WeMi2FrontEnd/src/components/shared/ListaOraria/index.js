import React from 'react';
import Text from 'components/ui/Text';
import { Column, Row } from 'components/ui/Grid';

const ListaOraria = ({
  timetables = [],
}) => (
  <Row fluid>
    {
      timetables.map((orario, index) => (
        <Row fluid key={`comeContattarciTimetables-${index.toString()}`}>
          <Column padding="0" md="4" xs="4">
            <Text
              value={orario.day}
              lineHeight="175%"
              size="f7"
            />
          </Column>
          <Column padding="0" md="4" xs="4">
            <Text
              value="dalle"
              lineHeight="175%"
              size="f7"
            />
              &nbsp;
            <Text
              value={orario.from}
              lineHeight="175%"
              size="f7"
            />
              &nbsp;
            <Text
              value="alle"
              lineHeight="175%"
              size="f7"
            />
              &nbsp;
            <Text
              value={orario.to}
              lineHeight="175%"
              size="f7"
            />
          </Column>
        </Row>
      ))
    }
  </Row>
);

ListaOraria.displayName = 'InclusioneComeFunziona - ListaOraria';
export default ListaOraria;
