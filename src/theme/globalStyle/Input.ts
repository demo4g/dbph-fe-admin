import { css } from 'styled-components';

export const InputOveride = css`
  div.nvt-Input-input,
  input.nvt-Input-input,
  button.nvt-Input-input {
    // min-height: 4.4rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .nvt-InputWrapper-label {
    font-size: 1.6rem;
    font-weight: 400;
    white-space: nowrap;
    padding-left: 1.2rem;
  }

  .nvt-InputWrapper-description {
    padding-left: 1.2rem;
  }

  .nvt-InputPlaceholder-placeholder {
    font-weight: 300;
  }

  input:placeholder-shown {
    text-overflow: ellipsis;
    font-weight: 300;
  }

  .nvt-InputWrapper-root {
    position: relative;
  }

  .nvt-Input-wrapper[data-error='true'] {
  }

  // .nvt-InputWrapper-error {
  //   position: absolute;
  // }

  .nvt-Input-input[disabled],
  .nvt-Input-input[data-disabled='true'] {
    background-color: ${(props) => props.theme.colors.INPUT_DISABLED_BG} !important;
    color: ${(props) => props.theme.colors.TEXT_PRIMARY} !important;
    opacity: 1 !important;
  }

  .nvt-Checkbox-input:checked:not(:disabled) {
    background-color: ${(props) => props.theme.colors.PRIMARY + '10'};
  }

  .nvt-PillGroup-group {
    width: 100%;
  }
`;
