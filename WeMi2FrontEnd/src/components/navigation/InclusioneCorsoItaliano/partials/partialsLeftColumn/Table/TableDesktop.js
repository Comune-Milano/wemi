import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import SingleHeaderTable from './SingleHeaderTable';
import DoubleHeaderTable from './DoubleHeaderTable';
import { RowBorder, ColumnBorderBg } from './Table.styled';

const TableDesktop = ({
  color,
  titleColumns,
  titleColumnSx,
  titleColumnDx,
  content = []
}) => (
  <Row fluid>
    <Row fluid padding="0" flex justifycontent="center" sizemargin={{ xs: '0', md: '0 0 0.8em 0', lg: '0 0 0.8em 0' }}>
      {
        titleColumns ? (
          <SingleHeaderTable
            title={titleColumns}
            color={color}
          />
        )
          : (
            <DoubleHeaderTable
              titleSx={titleColumnSx}
              titleDx={titleColumnDx}
              color={color}
            />
        )}
    </Row>
    {
      content?.map((textImg, index) => (
        <RowBorder fluid borderSize="1px" borderColor={textImg.colorBorder || "darkGrey"} key={`contentTable-${index}-${titleColumns || titleColumnSx}`}>
          <ColumnBorderBg lg="1" md="2" padding="0" flex justifycontent="center" alignitems="center">
            <img
              src={textImg.src}
              width="70%"
              height="auto"
              alt="img"
            />
          </ColumnBorderBg>
          <ColumnBorderBg opacity={textImg.opacity} color={textImg.colorBg || "greyCardInclusione"} flex lg="5" md="5" xs="6" padding="0.8em" flex justifycontent="center" alignitems="center">
            <Text
              value={textImg.textSx}
              lineHeight="175%"
              align="center"
              color={textImg.colorText}
              size="f7"
            />
          </ColumnBorderBg>
          <Column lg="6" md="5" xs="6" padding="0 0 0 1em" flex justifycontent="center" alignitems="center" >
            <ColumnBorderBg height="100%" opacity={textImg.opacity} color={textImg.colorBg || "greyCardInclusione"} flex padding="0.8em" flex justifycontent="center" alignitems="center">
              <Text
                value={textImg.textDx}
                lineHeight="175%"
                align="center"
                color={textImg.colorText}
                size="f7"
              />
            </ColumnBorderBg>
          </Column>
        </RowBorder>
      ))
    }
  </Row>
);

TableDesktop.displayName = 'TableDesktopNavigation';

export default TableDesktop;