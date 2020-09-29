import React from 'react';
import PropTypes from 'prop-types';
import { getRecordData } from '../../../utils/tools';

const RestFieldItem = ({
  record,
  source,
  format,
  formatSubmitData,
  valueProp,
  component,
  onChangeRecord,
}) => {
  const element = React.cloneElement(component, {
    record,
    [valueProp]: format(getRecordData(record, source), record),
    onChange: value => {
      onChangeRecord(formatSubmitData(value));
    },
  });
  return element;
};
RestFieldItem.propTypes = {
  record: PropTypes.any,
  source: PropTypes.string,
  format: PropTypes.func,
  formatSubmitData: PropTypes.func,
  onChangeRecord: PropTypes.func,
};

RestFieldItem.defaultProps = {
  format: data => data,
  formatSubmitData: data => data,
  onChangeRecord: () => {},
  component: <span />,
  valueProp: 'children',
};

export default RestFieldItem;
