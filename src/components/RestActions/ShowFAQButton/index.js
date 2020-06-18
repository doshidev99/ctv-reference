import React from 'react';
import PropTypes from 'prop-types';
import I18n from 'i18next';
import { ButtonWrapper } from './styles';

const ShowFAQButton = props => (
  <ButtonWrapper
    source={props.source}
    icon="question-circle"
    onClick={() => props.gotoFAQPage(props.record ? props.record.id : '')}
    >
    {I18n.t('button.showFAQ')}
  </ButtonWrapper>
);

ShowFAQButton.propTypes = {
  gotoFAQPage: PropTypes.func,
  record: PropTypes.object,
  source: PropTypes.string,
};

ShowFAQButton.defaultProps = {
  source: 'faq',
};

export default ShowFAQButton;
