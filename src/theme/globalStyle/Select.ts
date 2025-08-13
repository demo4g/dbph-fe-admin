import { css } from 'styled-components';

export const SelectOveride = css`
  .nvt-MultiSelect-input {
    display: flex;
  }

  .nvt-Select-dropdown,
  .nvt-MultiSelect-dropdown {
    .nvt-ScrollArea-viewport {
      padding-right: 0;
    }
  }

  .nvt-MultiSelect-input[data-expanded='true'],
  .nvt-Select-input[data-expanded='true'] {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .nvt-MultiSelect-input[data-disabled='true'],
  .nvt-Select-input[data-disabled='true'] {
    pointer-events: none;
  }

  .nvt-Select-dropdown,
  .nvt-MultiSelect-dropdown {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    transform: translateY(-8px);
    border: 1px solid ${(props) => props.theme.colors.BORDER_PRIMARY};
    border-top: none;
    padding: 0;
    overflow: hidden;
  }

  .nvt-MultiSelect-option,
  .nvt-Select-option {
    border-radius: 0;

    &:hover {
      background-color: ${(props) => props.theme.colors.HOVER_PRIMARY};
    }
  }
`;
