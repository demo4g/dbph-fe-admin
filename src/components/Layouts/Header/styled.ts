import { Box, BoxProps, createPolymorphicComponent } from '@mantine/core';
import styled from 'styled-components';

export const Wrapper = createPolymorphicComponent<'div', BoxProps>(
  styled(Box)`
    height: ${(props) => props.theme.sizes.HEADER_HEIGHT};
    box-shadow: ${(props) => props.theme.shadows.SHADOW};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-inline: 1.6rem;
    position: relative;
    z-index: 100;
  `
);
