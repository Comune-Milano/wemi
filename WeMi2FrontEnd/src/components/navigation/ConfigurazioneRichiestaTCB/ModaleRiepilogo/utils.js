import React from 'react';
import moment from 'moment';
import Text from 'components/ui/Text';

export function formattedDate(date) {
    return moment(date).format('DD/MM/YYYY');
};

export const TextCampoObbligatorio = ({value}) => (
    <Text
        value={value}
        fontStyle="italic"
        size="f7"
        color="red"
    />
);