import React from 'react';
import PropTypes from 'prop-types';
import FormInputNumber from '../../form/FormInputNumber';
import { getRecordData } from '../../../utils/tools';

const RestFormInputNumber = props => {
  return (
    <FormInputNumber
      {...props}
      defaultValue={props.defaultValue || getRecordData(props.record, props.source)}
    />
  );
};

RestFormInputNumber.propTypes = {
  source: PropTypes.string,
  record: PropTypes.object,
  defaultValue: PropTypes.string,
};

export default RestFormInputNumber;
