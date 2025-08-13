import { css } from 'styled-components';

export const DatePickerInputOveride = css`
  .nvt-DatePickerInput-input[disabled] {
    color: ${(props) => props.theme.colors.TEXT_PRIMARY};
    opacity: 1;
  }

  .nvt-InputPlaceholder-placeholder {
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;
