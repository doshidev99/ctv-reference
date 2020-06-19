import React from 'react';
import PropTypes from 'prop-types';
import I18n from 'i18next';
import { ButtonWrapper } from './styles';

const FAQButton = props => (
  <ButtonWrapper
    source={props.source}
    icon="question-circle"
    onClick={() => {
      return props.gotoEditPage(props.record ? props.record.id : '')
    }}
    >
    {I18n.t('button.answer')}
  </ButtonWrapper>
);

FAQButton.propTypes = {
  gotoEditPage: PropTypes.func,
  record: PropTypes.object,
  source: PropTypes.string,
};

FAQButton.defaultProps = {
  source: 'edit',
};

export default FAQButton;
