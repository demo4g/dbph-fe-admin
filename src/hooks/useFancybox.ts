import { Fancybox } from '@fancyapps/ui';
import { useEffect, useRef } from 'react';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

/** https://fancyapps.com/fancybox/ */
const useFancybox = () => {
  const fancyboxRef = useRef(null);

  useEffect(() => {
    const container = fancyboxRef.current;

    const delegate = '[data-fancybox]';
    const _options: any = {
      Thumbs: {
        type: 'classic',
      },
    };

    Fancybox.bind(container, delegate, _options);

    return () => {
      Fancybox.unbind(container);
      Fancybox.close();
    };
  });

  return fancyboxRef;
};

export default useFancybox;
