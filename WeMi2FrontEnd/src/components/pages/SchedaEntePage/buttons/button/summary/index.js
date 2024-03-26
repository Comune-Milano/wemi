import React, { Fragment, useState } from 'react';
import Button from 'components/ui2/Button';
import { noop } from 'utils/functions/noop';
import SchedaEnteModal from 'components/shared/ModaleSchedaEnte';
import { connect } from 'react-redux';
import { useFormContext } from 'libs/Form/hooks/useFormContext';
import { SaveDirtyModal } from './savemodal';

const SummaryButtonComponent = ({
  disabled,
  institutionId,
  locale,
  onSave = noop,
  onClose = noop,
}) => {
  const { isFormDirty } = useFormContext();
  const [riepilogo, setOpenRiepilogo] = useState(false);
  const [salvataggio, setOpenSalvataggio] = useState(false);
  const [isVisibleButton, setIsVisible] = useState(true);

  return (
    <Fragment>
      <Button
        label="Riepilogo"
        disabled={disabled}
        onClick={() => {
          if (isFormDirty) {
            setOpenSalvataggio(true);
          } else {
            setOpenRiepilogo(true);
          }
        }}
        color="blue"
      />
      {salvataggio ? (
        <SaveDirtyModal
          open={salvataggio}
          setOpen={setOpenSalvataggio}
          onNo={() => {
            setOpenRiepilogo(true);
          }}
          onYes={async () => {
            setIsVisible(false);
            await onSave();
            setOpenRiepilogo(true);
          }}
          disabled={isVisibleButton}
        />
      )
        : null}
      {riepilogo ?
        (
          <SchedaEnteModal
            idEnte={institutionId}
            open={riepilogo}
            locale={locale}
            setOpen={async () => {
              setOpenRiepilogo(false);
              await onClose();
            }}
          />
        )

        : null}
    </Fragment>
  );
};

SummaryButtonComponent.displayName = 'Button summary institution card';

const mapStoreToProps = (store) => ({
  locale: store.locale,
});

export const SummaryButton = connect(mapStoreToProps)(SummaryButtonComponent);
