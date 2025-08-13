import { Box, BoxProps, createPolymorphicComponent } from '@mantine/core';
import styled from 'styled-components';

export const ScrollScreenWrapper = styled.div`
  height: calc(100vh - ${({ theme }) => theme.sizes.HEADER_HEIGHT} - 3.2rem);
  overflow: hidden auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const BorderBoxWrapper = createPolymorphicComponent<'div', BoxProps>(styled(Box)`
  padding: 1.6rem;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.colors.BORDER_PRIMARY};
  background-color: ${(props) => props.theme.colors.BACKGROUND_PRIMARY};
`);

export const BoxShadowWrapper = createPolymorphicComponent<'div', BoxProps>(styled(Box)`
  padding: 1.6rem;
  border-radius: 8px;
  box-shadow: ${(props) => props.theme.shadows.SHADOW_TABLE};
  background-color: ${(props) => props.theme.colors.WHITE};
`);

export const TableHeader = createPolymorphicComponent<'div', BoxProps>(styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.6rem;
  height: 6.8rem;
  background-color: ${(props) => props.theme.colors.BACKGROUND_PRIMARY};

  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  background-color: ${(props) => props.theme.colors.WHITE};
  box-shadow: ${(props) => props.theme.shadows.SHADOW_TABLE};
  overflow: hidden;
`);
