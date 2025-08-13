import { css } from 'styled-components';

export const MenuOveride = css`
  .nvt-Menu-item[data-hovered='true'] {
    background-color: ${(props) => props.theme.colors.HOVER_PRIMARY};
  }
`;
