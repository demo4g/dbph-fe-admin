import 'styled-components';
import { BREAKPOINTS, COLORS, SHADOWS, SIZES } from '~/theme';

//Define type for props in styled-components
declare module 'styled-components' {
  type OptionsFlags<Type> = {
    [Property in keyof Type]: any;
  };

  export interface DefaultTheme {
    colors: OptionsFlags<typeof COLORS>;
    sizes: OptionsFlags<typeof SIZES>;
    shadows: OptionsFlags<typeof SHADOWS>;
    breakpoints: OptionsFlags<typeof BREAKPOINTS>;
  }
}
