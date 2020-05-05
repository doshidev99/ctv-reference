import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import Editor from "../../common/Editor"
import { getRecordData } from '../../../utils/tools';

const FormItem = Form.Item;

const FormEditor = props => {
  const { record, form } = props;
  return (
    <FormItem>
      {form.getFieldDecorator(props.source, {

      })(
        <Editor
          content={
            props.defaultValue || getRecordData(record, props.source)
          }
        />,
      )}
    </FormItem>
  );
};

FormEditor.propTypes = {
  source: PropTypes.string,
  record: PropTypes.object,
  defaultValue: PropTypes.string,
};

export default FormEditor;
