import { Box, BoxProps, createPolymorphicComponent } from '@mantine/core';
import styled from 'styled-components';

export const ModalBody = createPolymorphicComponent<'div', BoxProps>(styled(Box)`
  flex: 1;
  overflow: hidden auto;

  &::-webkit-scrollbar {
    display: none;
  }
`);

export const ModalFooter = createPolymorphicComponent<'div', BoxProps>(styled(Box)`
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.6rem;
  background: ${(props) => props.theme.colors.WHITE};
  margin: 0 -1.6rem -1.6rem;
`);
