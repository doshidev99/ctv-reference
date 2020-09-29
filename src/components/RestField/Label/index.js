import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import { getRecordData } from '../../../utils/tools';
import Text from '../../common/Text';

const RestLabel = ({ record, source, loading, highlight, fontWeight, format }) => {
    // eslint-disable-next-line no-console
  // console.log(record, 'record');
  console.log(source, 'source');
  return loading && !getRecordData(record, source) ? (
    <Spin />
  ) : (
    <Text type={highlight ? 'bodyHighLight' : 'body'} fontWeight={fontWeight}>
      {getRecordData(record, source) ? (
        format(getRecordData(record, source))
      ) : (
        <i>
          {/* <IntlMessages id="text.waitingUpdate" />
           */}
          <span />
        </i>
      )}
    </Text>
  );
};

RestLabel.propTypes = {
  source: PropTypes.string,
  record: PropTypes.object,
  format: PropTypes.func,
  highlight: PropTypes.bool,
  loading: PropTypes.bool,
  fontWeight: PropTypes.string,
};

RestLabel.defaultProps = {
  format: data => data,
};
export default RestLabel;
