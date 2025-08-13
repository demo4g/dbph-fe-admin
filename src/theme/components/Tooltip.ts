import { Tooltip } from '@mantine/core';
import * as COLORS from '../colors';
import * as SHADOWS from '../shadows';

export const MantineTooltip = Tooltip.extend({
  defaultProps: {
    color: COLORS.PRIMARY,
    inline: true,
  },
  styles: {
    tooltip: {
      boxShadow: SHADOWS.SHADOW,
    },
  },
});
