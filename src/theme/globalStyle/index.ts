import { createGlobalStyle } from 'styled-components';
import { AccordionOveride } from './Accordion';
import { ComboBoxOveride } from './ComboBox';
import { DatePickerInputOveride } from './DatePickerInput';
import { InputOveride } from './Input';
import { MantineReactTableOveride } from './MantineReactTable';
import { MenuOveride } from './Menu';
import { resetCss } from './reset';
import { responsive } from './response';
import { SelectOveride } from './Select';
import { TabsOveride } from './Tabs';
import { TextOveride } from './Text';

export const GlobalStyle = createGlobalStyle`
  
  ${resetCss}
  ${responsive}
  ${MantineReactTableOveride}
  ${TextOveride}
  ${AccordionOveride}
  ${InputOveride}
  ${DatePickerInputOveride}
  ${SelectOveride}
  ${ComboBoxOveride}
  ${TabsOveride}
  ${MenuOveride}
  
  body {
    min-width: ${(props) => props.theme.breakpoints.XL};
    color: ${(props) => props.theme.colors.TEXT_PRIMARY};
    height: 100vh;
    /* overflow-y: hidden;
    overflow-x: auto; */
  }

  .nvt-Textarea-input::placeholder {
   font-weight: 300;
  }

  .nvt-Popover-dropdown {
    box-shadow: ${(props) => props.theme.shadows.SHADOW};
  }
`;
