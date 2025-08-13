import { Box, Group, Text } from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import { FaWifi } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { useTheme } from 'styled-components';
import DisabledConnectionIcon from '~/components/Icons/DisabledConnectionIcon';
import { CloseIconWrapper, Wrapper } from './styled';

let counter = 0;

interface IOnlineNotification {
  online: boolean;
}

export const OnlineNotification = ({ online }: IOnlineNotification) => {
  const theme = useTheme();

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [_counter, setCounter] = useState<number>(counter);

  const handleClose = () => {
    if (wrapperRef.current) {
      wrapperRef.current.remove();
    }
  };

  useEffect(() => {
    if (online) {
      setCounter((prevState) => {
        counter = prevState + 1;
        return prevState + 1;
      });
    }
  }, [online]);

  useEffect(() => {
    //Automatically close notifications
    if (online && _counter > 1) {
      setTimeout(handleClose, 15000);
    }
  }, [_counter, online]);

  //Ignore the first connection
  if (_counter <= 1) return null;

  return (
    <Box>
      <Wrapper ref={wrapperRef}>
        <Group>
          <FaWifi size={20} color={theme?.colors.BLACK} />
          <Text style={{ fontSize: 15, whiteSpace: 'nowrap' }}>Đã khôi phục kết nối Internet.</Text>
        </Group>
        <CloseIconWrapper onClick={handleClose}>
          <IoMdClose />
        </CloseIconWrapper>
      </Wrapper>
    </Box>
  );
};

export const OfflineNotification = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    if (wrapperRef.current) {
      wrapperRef.current.remove();
    }
  };

  return (
    <Box>
      <Wrapper ref={wrapperRef}>
        <Group flex={1}>
          <DisabledConnectionIcon size={24} color="rgb(188, 192, 196)" />
          <Text style={{ whiteSpace: 'nowrap' }}>Bạn đang offline</Text>
        </Group>
        <CloseIconWrapper onClick={handleClose}>
          <IoMdClose />
        </CloseIconWrapper>
      </Wrapper>
    </Box>
  );
};
