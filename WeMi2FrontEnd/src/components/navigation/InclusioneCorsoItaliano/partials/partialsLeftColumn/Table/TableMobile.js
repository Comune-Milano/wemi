import React from 'react';
import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import SingleHeaderTableMobile from './SingleHeaderTableMobile';
import { RowBorder, ColumnBorderBg } from './Table.styled';

const TableMobile = ({
  color,
  titleColumns,
  titleColumnSx,
  titleColumnDx,
  content = []
}) => (
  <Row fluid>
    <Row fluid padding="0" flex justifycontent="center" >
      <SingleHeaderTableMobile
        title={titleColumns || titleColumnSx}
        color={color}
      />
    </Row>
    {
      content?.map((textImg, index) => (
        <RowBorder fluid borderSize="1px" borderColor={textImg.colorBorder || "darkGrey"} key={`contentTableDx-${index}-${titleColumns || titleColumnSx}`}>
          <ColumnBorderBg sm="2" xs="3" padding="0" flex justifycontent="center" alignitems="center">
            <img
              src={textImg.src}
              width="50%"
              height="auto"
            />
          </ColumnBorderBg>
          <ColumnBorderBg opacity={textImg.opacity} color={textImg.colorBg || "greyCardInclusione"} flex sm="10" xs="9" padding="0.8em" flex justifycontent="center" alignitems="center">
            <Text
              value={textImg.textSx}
              lineHeight="175%"
              align="center"
              color={textImg.colorText}
              size="f7"
            />
          </ColumnBorderBg>
        </RowBorder>
      ))
    }

    {
      titleColumnDx ? (
        <Row fluid padding="0" flex justifycontent="center" margin="3em 0 0 0">
          <SingleHeaderTableMobile
            title={titleColumnDx}
            color={color}
          />
        </Row>
      )
        : null
    }
    <Row fluid margin={titleColumnDx ? "" : "3em 0 0 0 "}>
      {
        content?.map((textImg, index) => (
          <RowBorder fluid borderSize="1px" borderColor={textImg.colorBorder || "darkGrey"} key={`contentTableSx-${index}-${titleColumns || titleColumnSx}`}>
            <ColumnBorderBg sm="2" xs="3" padding="0" flex justifycontent="center" alignitems="center">
              <img
                src={textImg.src}
                width="50%"
                height="auto"
              />
            </ColumnBorderBg>
            <ColumnBorderBg opacity={textImg.opacity} color={textImg.colorBg || "greyCardInclusione"} flex sm="10" xs="9" padding="0.8em" flex justifycontent="center" alignitems="center">
              <Text
                value={textImg.textDx}
                lineHeight="175%"
                align="center"
                color={textImg.colorText}
                size="f7"
              />
            </ColumnBorderBg>
          </RowBorder>
        ))
      }
    </Row>
  </Row>
);

TableMobile.displayName = 'TableMobileNavigation';

export default TableMobile;