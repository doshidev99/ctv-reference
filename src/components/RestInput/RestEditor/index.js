import React from 'react';
import PropTypes from 'prop-types';
import FormEditor from '../../form/FormEditor';

const RestFormEditor = props => {
  return (
    <FormEditor
      {...props}
    />
  );
};

RestFormEditor.propTypes = {
  source: PropTypes.string,
  record: PropTypes.object,
  defaultValue: PropTypes.string,
};

export default RestFormEditor;
