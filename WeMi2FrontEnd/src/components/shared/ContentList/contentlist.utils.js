import React from 'react';
import { noop } from 'utils/functions/noop';
import { capitalizeString } from 'utils/extensions/stringExtensions';
import { Draft, Published, Deactivated } from './partials';
import { CONTENT_STATE } from './contentlist.constants';

export const addActions = (contents = [], actions = {}) => contents.map(content => {
  const row = {};
  const contentState = content.state?.id;
  const { onPublish = noop, onModify = noop, onDisable = noop, lockActions = false } = actions;

  row.id = content.id;

  row.testo_1 = content.title;

  if ('catAccreditamento' in content) {
    row.categoria = content.catAccreditamento;
  }
  row.progressivo = content.progressive;
  row.codiceContenuto = content.code || '';

  row.state = capitalizeString(content.state?.description || '');

  if (contentState === CONTENT_STATE.DRAFT) {
    row.azioni = <Draft id={content.id} description={content.title} onDisable={onDisable} onPublish={onPublish} onModify={onModify} lockActions={lockActions} />;
  }

  if (contentState === CONTENT_STATE.PUBLISHED) {
    row.azioni = <Published id={content.id} description={content.title} onDisable={onDisable} onModify={onModify} lockActions={lockActions} />;
  }

  if (contentState === CONTENT_STATE.DEACTIVATED) {
    row.azioni = <Deactivated id={content.id} description={content.title} onPublish={onPublish} onModify={onModify} lockActions={lockActions} />;
  }

  return row;
});
