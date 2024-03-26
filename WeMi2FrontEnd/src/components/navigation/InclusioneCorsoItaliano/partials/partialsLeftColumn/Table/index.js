import React from 'react';
import TableDesktop from './TableDesktop';
import TableMobile from './TableMobile';
import useWindowSize from 'hooks/useWindowSize';
import { WINDOW_SIZE } from 'types/windowSize';

const Table = ({
  color,
  titleColumns,
  titleColumnSx,
  titleColumnDx,
  content = [],
}) => {
  const windowSize = useWindowSize();
  const isMobile = WINDOW_SIZE.windowSizesLarge.concat(WINDOW_SIZE.windowSizesMedium).indexOf(windowSize) === -1;

  if (isMobile) {
    return (
      <TableMobile
        color={color}
        titleColumns={titleColumns}
        titleColumnSx={titleColumnSx}
        titleColumnDx={titleColumnDx}
        content={content}
      />
    );
  }

  return (
    <TableDesktop
      color={color}
      titleColumns={titleColumns}
      titleColumnSx={titleColumnSx}
      titleColumnDx={titleColumnDx}
      content={content}
    />
  );
};

Table.displayName = 'TableNavigation';

export default Table;
