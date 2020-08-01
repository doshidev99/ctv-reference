import React from 'react';
import PropTypes from 'prop-types';
import { Form, InputNumber } from 'antd';
import FormTitle, { IconWrapper } from '../FormTitle';
// import IntlMessages from '../../utility/IntlMessages';

const FormItem = Form.Item
const FormInput = props => {
  const {
    prefixIcon,
    source,
    title,
    required,
    requiredMessage,
    icon,
    placeholder,
    form,
    defaultValue,
    type,
    disabled,
    min,
    max,
    rules,
    className,
    addonBefore,
    addonAfter,
    wrapInputClass,
  } = props;
  return (
    <div id={placeholder}>
      <FormItem className={`boxInput ${className}`}>
        {title && <FormTitle title={title} icon={icon} required={required} />}
        <div style={{ position: 'relative' }} className={wrapInputClass}>
          {form.getFieldDecorator(source, {
              rules: [{ required, message: requiredMessage }, ...rules],
              initialValue: defaultValue,
            })(
              <InputNumber
                  min={min}
                  max={max}
                  prefix={prefixIcon ? <IconWrapper type={prefixIcon} /> : null}
                  disabled={disabled}
                  type={type || 'number'}
                  placeholder={placeholder}
                  style={{ width: '100%' }}
                  className={className}
                  addonBefore={addonBefore}
                  addonAfter={addonAfter}
                />
            )}
        </div>
      </FormItem>
    </div>
  );
};

FormInput.propTypes = {
  source: PropTypes.string,
  title: PropTypes.any,
  required: PropTypes.bool,
  requiredMessage: PropTypes.node,
  icon: PropTypes.string,
  placeholder: PropTypes.string,
  form: PropTypes.object,
  defaultValue: PropTypes.any,
  disabled: PropTypes.bool,
  max: PropTypes.number,
  rules: PropTypes.array,
  min: PropTypes.number,
  prefixIcon: PropTypes.string,
  type: PropTypes.string,
  addonBefore: PropTypes.any,
  addonAfter: PropTypes.any,
  wrapInputClass: PropTypes.string,
  className: PropTypes.string,
};
FormInput.defaultProps = {
  required: false,
  requiredMessage: 'The field is required',
  rules: [],
  valuePropName: 'value',
  placeholder: 'placeholder.undefined',
  format: data => data,
};

export default FormInput;
