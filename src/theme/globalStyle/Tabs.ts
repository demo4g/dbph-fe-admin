import { css } from 'styled-components';

export const TabsOveride = css`
  .nvt-Tabs-list {
    min-height: 4.4rem;

    &::before {
      border-color: ${(props) => props.theme.colors.BORDER_PRIMARY};
    }
  }

  .nvt-Tabs-tab {
    padding: 1.2rem 3.2rem;

    .nvt-Tabs-tabLabel {
      font-size: 1.6rem;
    }

    &:hover {
      background-color: transparent;

      .nvt-Tabs-tabLabel {
        color: ${(props) => props.theme.colors.PRIMARY};
      }
    }

    &[data-active='true'] {
      border-color: ${(props) => props.theme.colors.PRIMARY};

      .nvt-Tabs-tabLabel {
        color: ${(props) => props.theme.colors.PRIMARY};
      }
    }
  }
`;
