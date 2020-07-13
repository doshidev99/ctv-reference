import React, { Component } from "react";
import { Switch, Popconfirm } from "antd";
import { connect } from "react-redux";

class SwitchExample extends Component {
  constructor() {
    super();
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    this.setState({ checked });
  }

  render() {
    return props.isShowConfirm ? (
      <Popconfirm
        title={
          !value ? renderMessage(props.confirmMessage) : renderMessage(props.cancelConfirmMessage)
        }
        onConfirm={props.onChange}
        okText={renderMessage('ok')}
        cancelText={renderMessage('cancel')}
      >
        {props.placeholder && (
          <span className="txtPlaceholder" style={{ marginRight: 5 }}>
            {/* <IntlMessages id={props.placeholder} /> */}
            {props.placeholder}
          </span>
        )}
        <Switch checked={value} disabled={!props.onChange} />
      </Popconfirm>
    ) : (
      <div style={{marginTop: '10px'}}>
        {props.placeholder && (
          <span className="txtPlaceholder" style={{ marginRight: '5px' }}>
            {/* <IntlMessages id={props.placeholder} /> */}
            {props.placeholder}
          </span>
        )}
        <Switch checked={value} onChange={props.onChange} disabled={!props.onChange} />
      </div>
    );
  }
}

SwitchExample.propTypes = {
  source: PropTypes.string,
  record: PropTypes.object,
  onChange: PropTypes.func,
  value: PropTypes.bool,
  isShowConfirm: PropTypes.bool,
  confirmMessage: PropTypes.string,
  cancelConfirmMessage: PropTypes.string,
  placeholder: PropTypes.string,
};

const mapStateToProps = (state) => {
  const {
    offset, // offset = (page - 1) * limit;
    limit,
    total,
    productTable,
    currentProperty,
    loading,
  } = state.property;
  return {
    offset, // offset = (page - 1) * limit;
    limit,
    total,
    productTable,
    currentProperty,
    loading,
  };
};

SwitchExample.defaultProps = {
  format: data => data,
};
export default connect(mapStateToProps, mapDispatchToProps)(SwitchExample);
