import { Box, BoxProps, createPolymorphicComponent } from '@mantine/core';
import styled from 'styled-components';

export const AccordionWrapper = createPolymorphicComponent<'div', BoxProps>(styled(Box)`
  padding: 1.6rem;
  box-shadow: ${(props) => props.theme.shadows.SHADOW_TABLE};
  border-radius: 12px;
  background: ${(props) => props.theme.colors.BACKGROUND_PRIMARY};

  .nvt-Accordion-item {
    border-bottom: none;
  }

  .nvt-Accordion-control,
  .nvt-Accordion-label {
    padding: 0;
  }

  .nvt-Accordion-content {
    padding: 0;
    padding-top: 1.6rem;
  }
`);
