import React from 'react';
import ModifyAuthorizations from './ModifyAuthorizations';
import ModifyProfileValidityDates from './ModifyProfileValidityDates';
import Buttons from './Buttons';

const ModifyUserPermissionsForm = React.memo(({
  dataset,
  setFormField,
  availableAuthorizationsItems,
  isFormDirty,
  errors,
  isFormValid,
  onCancel,
  onSave
}) => {
  return (
    <>
      <ModifyProfileValidityDates
        dataset={dataset}
        setFormField={setFormField}
        errors={errors}
      />
      <ModifyAuthorizations
        userAuthorizations={dataset.autorizzazioni}
        availableAuthorizationsItems={availableAuthorizationsItems}
        setFormField={setFormField}
        dataset={dataset}
      />
      <Buttons
        isFormDirty={isFormDirty}
        isFormValid={isFormValid}
        onCancel={onCancel}
        onSave={onSave}
        dataset={dataset}
      />
    </>
  )
});

ModifyUserPermissionsForm.displayName = 'ModificaUtenzaNavigation - ModifyUserPermissionsForm';

export default ModifyUserPermissionsForm;