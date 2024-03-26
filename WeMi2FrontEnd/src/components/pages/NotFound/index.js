/** @format */

import React from 'react';
import Title from 'components/navigation/Title';
import NotFoundPagePropTypes from './propTypes';

const NotFoundPage = () => <Title value="Page.NotFound.title" />;

NotFoundPage.displayName = 'NotFoundPage';
NotFoundPage.propTypes = NotFoundPagePropTypes;

export default NotFoundPage;
