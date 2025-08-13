import { Image } from '@mantine/core';
import fallback_image from '~/assets/images/fallback_image.png';

export const MantineImage = Image.extend({
  styles: {
    root: {
      width: 'auto',
    },
  },
  defaultProps: {
    fallbackSrc: fallback_image,
  },
});
