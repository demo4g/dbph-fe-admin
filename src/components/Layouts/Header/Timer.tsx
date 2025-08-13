import { Box, Group, Text } from '@mantine/core';
import { useInterval } from '@mantine/hooks';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useTheme } from 'styled-components';
import { DATE_FORMAT } from '~/constants';

export interface ITimerProps {}

export default function Timer(props: ITimerProps) {
  const theme = useTheme();
  const [time, setTime] = useState(dayjs());

  useInterval(() => setTime((s) => s.add(1, 'second')), 1000, {
    autoInvoke: true,
  });

  return (
    <Box ta="right">
      <Group gap={2} align="flex-end">
        <Text component="span" fz={19} fw={500}>
          {time.get('hour').toString().padStart(2, '0')}
        </Text>
        <Text component="span" fz={19} fw={500}>
          :
        </Text>
        <Text component="span" fz={19} fw={500}>
          {time.get('minute').toString().padStart(2, '0')}
        </Text>
        <Text component="span" fz={19} fw={500}>
          :
        </Text>
        <Text component="span" fz={19} fw={500}>
          {time.get('second').toString().padStart(2, '0')}
        </Text>
      </Group>
      <Text fz={14} c={theme?.colors.GRAY} lh={1}>
        {time.format(DATE_FORMAT)}
      </Text>
    </Box>
  );
}
