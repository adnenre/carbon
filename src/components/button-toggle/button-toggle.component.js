import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon';
import { StyledButtonToogle, StyledButtonToogleLabel, StyledButtonToggleIcon } from './button-toggle.style';
import guid from '../../utils/helpers/guid';

const ButtonToggle = (props) => {
  const inputGuid = guid();

  function icon() {
    if (!props.buttonIcon) return null;

    return (
      <StyledButtonToggleIcon { ...props }>
        <Icon type={ props.buttonIcon } />
      </StyledButtonToggleIcon>
    );
  }

  function hiddenInput() {
    return (
      <input
        type='radio'
        name={ props.name }
        id={ inputGuid }
        onChange={ onChangeHandler }
        disabled={ props.disabled }
        style={ { // ToDo: Move to styled-component?
          position: 'absolute',
          width: 0,
          height: 0,
          visibility: 'hidden'
        } }
      />
    );
  }

  function onChangeHandler(ev) {
    props.onChange(ev, this.props);
  }

  return (
    <StyledButtonToogle { ...props }>
      {hiddenInput()}
      <StyledButtonToogleLabel { ...props } htmlFor={ inputGuid }>
        <div className='content-wrapper'>
          {icon()}
          {props.children}
        </div>
      </StyledButtonToogleLabel>
    </StyledButtonToogle>
  );
};

ButtonToggle.propTypes = {
  /**
   * Name used on the hidden radio button.
   */
  name: PropTypes.string,

  /**
   * Change handler passed in from parent.
   */
  onChange: PropTypes.func,

  /**
   * buttonIcon the to render.
   */
  buttonIcon: PropTypes.string,

  /**
   * Sets the size of the buttonIcon (eg. large)
   */
  buttonIconSize: PropTypes.string,

  /**
   * Sets the size of the button (padding, font-size).
   * Only used in Classic theme.
   */
  size: PropTypes.string,

  /**
   * remove spacing from inbetween buttons
   */
  grouped: PropTypes.bool,

  /**
   * Disable all user interaction.
   */
  disabled: PropTypes.bool,

  /**
   * A required prop. This is the button text.
   */
  children: PropTypes.node.isRequired
};

ButtonToggle.defaultProps = {
  size: 'large'
};

export default ButtonToggle;
