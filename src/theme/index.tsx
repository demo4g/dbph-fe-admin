import '@mantine/charts/styles.css';
import { createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/notifications/styles.css';
import 'mantine-react-table/styles.css';
import * as BREAKPOINTS from './breakpoints';
import * as COLORS from './colors';
import { MantineButton } from './components/Button';
import { MantineCheckbox } from './components/Checkbox';
import { MantineContainer } from './components/Container';
import { MantineDatePickerInput } from './components/DatePickerInput';
import { MantineFileInput } from './components/FileInput';
import { MantineGroup } from './components/Group';
import { MantineImage } from './components/Image';
import { MantineInput } from './components/Input';
import { MantineLoader } from './components/Loader';
import { MantineModal } from './components/Modal';
import { MantineMonthPickerInput } from './components/MonthPickerInput';
import { MantineMultiSelect } from './components/MultiSelect';
import { MantineNumberInput } from './components/NumberInput';
import { MantineSelect } from './components/Select';
import { MantineSwitch } from './components/Switch';
import { MantineTable } from './components/Table';
import { MantineTextarea } from './components/Textarea';
import { MantineTextInput } from './components/TextInput';
import { MantineTooltip } from './components/Tooltip';
import './font/index.scss';
import * as SHADOWS from './shadows';
import * as SIZES from './sizes';

export { BREAKPOINTS, COLORS, SHADOWS, SIZES };

// https://www.figma.com/design/NwbadBqrYpRxJGa854XCJw/Vihub---23.04.2024?node-id=0-1&t=6TspHzcQfzpojuKf-0
export const mantineTheme = createTheme({
  scale: 1.6,
  defaultRadius: 12,
  fontFamily: "'SVN-Poppins', sans-serif",
  primaryColor: 'primary',
  breakpoints: {
    xs: BREAKPOINTS.XS,
    sm: BREAKPOINTS.SM,
    md: BREAKPOINTS.MD,
    lg: BREAKPOINTS.LG,
    XL: BREAKPOINTS.XL,
    XXL: BREAKPOINTS.XXL,
  },
  colors: {
    primary: [
      '#ffebed',
      '#fad7d9',
      '#eeadb0',
      '#e38085',
      '#da5a60',
      '#d54249',
      '#d3353d',
      '#bb272f',
      '#a82029',
      '#941521',
    ],
  },
  cursorType: 'pointer',
  components: {
    Container: MantineContainer,
    Image: MantineImage,
    Button: MantineButton,
    Input: MantineInput,
    TextInput: MantineTextInput,
    Select: MantineSelect,
    MultiSelect: MantineMultiSelect,
    DatePickerInput: MantineDatePickerInput,
    MonthPickerInput: MantineMonthPickerInput,
    Table: MantineTable,
    Group: MantineGroup,
    Modal: MantineModal,
    Textarea: MantineTextarea,
    Switch: MantineSwitch,
    Tooltip: MantineTooltip,
    Checkbox: MantineCheckbox,
    NumberInput: MantineNumberInput,
    FileInput: MantineFileInput,
    Loader: MantineLoader,
  },
});
