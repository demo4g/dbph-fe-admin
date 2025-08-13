import { css } from 'styled-components';

export const ComboBoxOveride = css`
  .nvt-Combobox-dropdown {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    transform: translateY(-8px);
    border: 1px solid ${(props) => props.theme.colors.BORDER_PRIMARY};
    border-top: none;
    padding: 0;
  }

  .nvt-Combobox-option {
    border-radius: 0;

    &:hover {
      color: ${(props) => props.theme.colors.PRIMARY} !important;
      background-color: ${(props) => props.theme.colors.HOVER_PRIMARY};
    }
  }
`;
