import React, { useState } from 'react';
import AnchorLink from 'components/ui/AnchorLink';
import ModaleRiepilogo from 'components/navigation/CandidaturaLavoratoreTCB/partials/ModaleRiepilogo';
import { connect } from 'react-redux';

const IdWorker = ({ idWorker, locale }) => {
  
  const [openSummaryModal, setOpenSummaryModal] = useState(false);

  return (
    <div style={{textAlign: "left"}}>
    <ModaleRiepilogo 
      idLavoratore={idWorker}
      open={openSummaryModal}
      setOpen={setOpenSummaryModal}
      locale={locale}
    />
      <AnchorLink
        value={idWorker}
        onClick={() => {
          setOpenSummaryModal(true);
        }}
        size="f8"
        align="center"
        style={{
          cursor: "pointer",
          fontSize: ".9rem",
          fontWeight: "normal",
          color: "#005CB9"
        }}
      />
    </div>);
};

IdWorker.displayName = 'IdWorker';

const mapStoreToProps = store =>({
  locale: store.locale,
});

export const ComponentIdWorker = connect(mapStoreToProps)(IdWorker);