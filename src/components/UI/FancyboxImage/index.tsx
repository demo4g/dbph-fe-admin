'use client';

import { Box, BoxProps, Image, ImageProps } from '@mantine/core';
import useFancybox from '~/hooks/useFancybox';
import empty_image from '~/assets/images/empty_image.png';

export interface IFancyboxImageProps extends ImageProps {
  wrapperProps?: BoxProps;
  anchorProps?: object;
  // anchorProps?: DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;
}

export default function FancyboxImage({
  wrapperProps,
  anchorProps,
  src,
  ...props
}: IFancyboxImageProps) {
  const fancyboxRef = useFancybox();

  return (
    <Box ref={fancyboxRef} {...wrapperProps}>
      <a href={src || empty_image} data-fancybox {...anchorProps}>
        <Image fallbackSrc={empty_image} src={src} {...props} />
      </a>
    </Box>
  );
}
