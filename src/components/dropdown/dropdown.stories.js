import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  text,
  select,
  boolean,
  number
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { State, Store } from '@sambego/storybook-state';
import ImmutableHelper from '../../utils/helpers/immutable';
import OptionsHelper from '../../utils/helpers/options-helper';
import notes from './notes.md';
import Dropdown from './dropdown';

const store = new Store({
  value: ''
});

const onChange = (evt) => {
  store.set({ value: evt.target.value });
  action('change')();
};

storiesOf('Dropdown', module)
  .add('default', () => {
    const autoFocus = boolean('autoFocus', false);
    const cacheVisibleValue = boolean('cacheVisibleValue', true);
    const disabled = boolean('disabled', false);
    const name = text('name', 'Name');
    const readOnly = boolean('readOnly', false);
    const timeToDisappear = number('timeToDisappear', 0);
    const label = text('label', 'Dropdown Label');
    const labelInline = boolean('labelInline', true);
    const labelWidth = labelInline ? text('labelWidth', '') : null;
    const labelAlign = labelInline ? select('labelAlign', OptionsHelper.alignBinary) : null;
    const labelHelp = text('labelHelp', 'This is help text');
    const inputWidth = text('inputWidth', '');
    const fieldHelp = text('fieldHelp', 'This is field help text');
    const fieldHelpInline = boolean('fieldHelpInline', false);
    const options = ImmutableHelper.parseJSON([
      {
        id: 1, name: 'Orange'
      }, {
        id: 2, name: 'Blue'
      }
    ]);

    return (
      <State store={ store }>
        <Dropdown
          autoFocus={ autoFocus }
          cacheVisibleValue={ cacheVisibleValue }
          disabled={ disabled }
          name={ name }
          readOnly={ readOnly }
          timeToDisappear={ timeToDisappear }
          label={ label }
          labelInline={ labelInline }
          labelWidth={ labelWidth }
          labelAlign={ labelAlign }
          labelHelp={ labelHelp }
          inputWidth={ inputWidth }
          fieldHelp={ fieldHelp }
          fieldHelpInline={ fieldHelpInline }
          options={ options }
          onChange={ onChange }
          value={ store.get('value') }
        />
      </State>
    );
  }, {
    notes: { markdown: notes }
  });
