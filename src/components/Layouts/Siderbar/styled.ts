import { Box, BoxProps, createPolymorphicComponent } from '@mantine/core';
import styled from 'styled-components';

export const SidebarWrapper = createPolymorphicComponent<'div', BoxProps>(styled(Box)`
  height: calc(100vh - ${(props) => props.theme.sizes.HEADER_HEIGHT}) !important;
  overflow-y: auto;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.12);
  background-color: ${(props) => props.theme.colors.BACKGROUND_PRIMARY};
  width: ${(props) => props.theme.sizes.SIDEBAR_WIDTH};
  flex-shrink: 0;

  /* Parent navlink */
  .nvt-NavLink-root {
    --nvt-NavLink-root-margin: 1.2rem;
    margin: 0 var(--nvt-NavLink-root-margin);
    max-width: calc(100% - var(--nvt-NavLink-root-margin) * 2);
    height: 4.4rem;

    .nvt-NavLink-label {
      font-size: 1.6rem;
      white-space: nowrap;
    }

    &:hover {
      background-color: ${(props) => props.theme.colors.BACKGROUND_PRIMARY};

      .nvt-NavLink-body {
        color: ${(props) => props.theme.colors.PRIMARY};
      }

      .nvt-NavLink-section {
        svg,
        path {
          fill: ${(props) => props.theme.colors.PRIMARY};
        }
      }
    }

    &[data-active='true'] {
      border-radius: 0 999px 999px 0;
      background-color: ${(props) => props.theme.colors.HOVER_PRIMARY};

      &::after {
        content: ' ';
        position: absolute;
        left: 0;
        width: 4px;
        height: 3.2rem;
        background-color: ${(props) => props.theme.colors.PRIMARY};
        border-radius: 0 999px 999px 0;
      }

      .nvt-NavLink-section {
        svg,
        path {
          fill: ${(props) => props.theme.colors.PRIMARY};
        }
      }
    }
  }

  /* children navlink */
  .nvt-NavLink-children .nvt-NavLink-root {
    --dot-size: 5px;
    --line-width: 1px;

    position: relative;

    &[data-active='true'] {
      background-color: transparent;

      &::before {
        background-color: ${(props) => props.theme.colors.PRIMARY};
      }
    }

    &::after {
      content: ' ';
      position: absolute;
      left: calc(var(--dot-size) / 2 - var(--line-width) / 2);
      top: calc(-100% + var(--dot-size));
      width: var(--line-width);
      height: 4rem;
      /* background-color: ${(props) => props.theme.colors.GRAY}; */
      background-color: #f2f4f7;
      border-radius: initial;
      transform: translateY(calc(50% - var(--dot-size) / 2));
    }

    &:nth-last-child(2)::after {
      display: none;
    }

    &::before {
      content: ' ';
      width: var(--dot-size);
      height: var(--dot-size);
      border-radius: 999px;
      /* background-color: ${(props) => props.theme.colors.GRAY}; */
      background-color: #d7d9de;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      z-index: 1;
    }
  }
`);
