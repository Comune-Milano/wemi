import React from 'react';

import useWindowSize from 'hooks/useWindowSize';

import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileHeader';
import AddressModalBody from './AddressModalBody';

const BodyHeader = ({
  indirizzo,
  numeroEntiSelezionati,
  filtriComponente,
  filtriHeader,
  handleSingleFilter,
  setModalData,
  handleForward,
  addressInputRef,
}) => {
  const windowSize = useWindowSize();
  const breakpoints = ['md', 'lg', 'xl', 'xxl', 'xxxl'];
  const closeModal = () => {
    setModalData({
      title: '',
      open: false,
      children: null,
      focusTarget: addressInputRef.current,
    });
  };
  const children = (
    <AddressModalBody
      addressInputRef={addressInputRef}
      closeModal={closeModal}
      handleForward={handleForward}
    />
  );
  const openModal = () => {
    setModalData({
      title: 'RICORDATI CHE PUOI PERSONALIZZARE LA TUA RICHIESTA',
      open: true,
      children,
    });
  };
  if (breakpoints.indexOf(windowSize) >= 0) {
    return (
      <DesktopHeader
        numeroEntiSelezionati={numeroEntiSelezionati}
        filtriHeader={filtriHeader}
        handleSingleFilter={handleSingleFilter}
        indirizzo={indirizzo}
        openModal={openModal}
        handleForward={handleForward}
      />
    );
  }
  return (
    <MobileHeader
      numeroEntiSelezionati={numeroEntiSelezionati}
      filtri={filtriComponente}
      filtriHeader={filtriHeader}
      handleSingleFilter={handleSingleFilter}
      indirizzo={indirizzo}
      openModal={openModal}
      handleForward={handleForward}
    />
  );
};

BodyHeader.displayName = 'Body header';

export default React.memo(BodyHeader);
