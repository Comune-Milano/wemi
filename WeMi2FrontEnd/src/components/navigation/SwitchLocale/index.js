/** @format */

import React from 'react';
import { connect } from 'react-redux';
import { localeSelector } from 'redux-modules/selectors/localeSelectors';

const SwitchLocale = () => {
  const Locale = () => (
    <> </>
    // <NavLink key={lang} to={`/${lang}${pathname}`}>
    //   <Item selected={lang === locale}>
    //     <Text value={`Locale.link.${lang}`} intlFormatter color="white" size="f7" />
    //   </Item>
    // </NavLink>
  );
  Locale.displayName = 'Locale';

  // return <Wrapper>{valuesTranslations.map(Locale)}</Wrapper>;
  return null;
};

SwitchLocale.displayName = 'SwitchLocale';
// SwitchLocale.propTypes = SwitchLocalePropTypes;

const mapStoreToProps = store => ({
  pathname: store.routing.pathname,
  locale: localeSelector(store),
});

export default connect(mapStoreToProps)(SwitchLocale);
