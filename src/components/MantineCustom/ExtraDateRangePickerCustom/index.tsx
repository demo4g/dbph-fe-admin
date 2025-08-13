import {
  Group,
  Popover,
  PopoverProps,
  Stack,
  Text,
  TextInput,
  TextInputProps,
  UnstyledButton,
} from '@mantine/core';
import { DatePicker, DatePickerProps, DatesRangeValue } from '@mantine/dates';
import { useClickOutside } from '@mantine/hooks';
import dayjs from 'dayjs';
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useTheme } from 'styled-components';
import CalendarIcon from '~/components/Icons/CalendarIcon';
import { DATE_FORMAT } from '~/constants';
import { formatDateRange } from '~/utils';

export interface IExtraDateRangePickerCustomProps {
  onDateChange: (date?: DatesRangeValue) => void;
  value?: DatesRangeValue;
  inputProps?: TextInputProps;
  popoverProps?: PopoverProps;
  datePickerProps?: DatePickerProps<'range'>;
}

export default function ExtraDateRangePickerCustom({
  value,
  inputProps,
  popoverProps,
  datePickerProps,
  onDateChange,
}: IExtraDateRangePickerCustomProps) {
  const theme = useTheme();
  const hasValue = value && value.every((e) => !!e);

  const [openDate, setOpenDate] = useState(false);
  const [tempDate, setTempDate] = useState<DatesRangeValue>();
  const [optionSelected, setOptionSelected] = useState<number>(); //Default current month

  const options = [
    {
      label: 'Hôm nay',
      onClick: (index: number) => {
        const current = dayjs().toDate();
        const time = [current, current] as DatesRangeValue;
        setTempDate(time);
        onDateChange(time);
        setOptionSelected(index);
      },
    },
    {
      label: 'Hôm qua',
      onClick: (index: number) => {
        const yesterday = dayjs().add(-1, 'day').toDate();
        const time = [yesterday, yesterday] as DatesRangeValue;
        setTempDate(time);
        onDateChange(time);
        setOptionSelected(index);
      },
    },
    {
      label: 'Tuần này',
      onClick: (index: number) => {
        const startWeek = dayjs().startOf('week').toDate();
        const current = dayjs().toDate();
        const time = [startWeek, current] as DatesRangeValue;
        setTempDate(time);
        onDateChange(time);
        setOptionSelected(index);
      },
    },
    {
      label: 'Tháng này',
      onClick: (index: number) => {
        const startMonth = dayjs().startOf('month').toDate();
        const current = dayjs().toDate();
        const time = [startMonth, current] as DatesRangeValue;
        setTempDate(time);
        onDateChange(time);
        setOptionSelected(index);
      },
    },
    {
      label: '7 ngày trước',
      onClick: (index: number) => {
        const startDate = dayjs().add(-6, 'day').toDate();
        const endDate = dayjs().toDate();
        const time = [startDate, endDate] as DatesRangeValue;
        setTempDate(time);
        onDateChange(time);
        setOptionSelected(index);
      },
    },
    {
      label: '30 ngày trước',
      onClick: (index: number) => {
        const startDate = dayjs().add(-29, 'day').toDate();
        const endDate = dayjs().toDate();
        const time = [startDate, endDate] as DatesRangeValue;
        setTempDate(time);
        onDateChange(time);
        setOptionSelected(index);
      },
    },
    {
      label: 'Tùy chỉnh',
      onClick: (index: number) => {
        setOptionSelected(index);
      },
    },
  ];

  const popupRef = useClickOutside(() => {
    if (!openDate) return;

    setOpenDate(false);

    const [, endDate] = tempDate || [];

    // In case the end time has not been selected => reset to the old value
    if (value && !endDate) {
      setTempDate(value);
      onDateChange(value);
    }
  });

  const ClearButton = (
    <UnstyledButton
      display="flex"
      onClick={() => {
        setTempDate(undefined);
        onDateChange(undefined);
        setOptionSelected(undefined);
      }}
    >
      <IoMdClose />
    </UnstyledButton>
  );

  return (
    <Popover opened={openDate} position="bottom-end" shadow="md" keepMounted {...popoverProps}>
      <Popover.Target>
        <TextInput
          w={320}
          readOnly
          rightSection={hasValue ? ClearButton : <CalendarIcon />}
          value={formatDateRange(value as any, DATE_FORMAT)}
          onClick={() => setOpenDate(true)}
          {...inputProps}
        />
      </Popover.Target>

      <Popover.Dropdown ref={popupRef}>
        <Group align="flex-start">
          <Stack w={120} py={12}>
            {options.map((option, index) => {
              const isSelected = optionSelected === index;
              const color = isSelected ? theme?.colors.PRIMARY : theme?.colors.TEXT_PRIMARY;

              return (
                <UnstyledButton key={index} onClick={() => option.onClick(index)}>
                  <Text c={color} td={isSelected ? 'underline' : undefined} fz={14}>
                    {option.label}
                  </Text>
                </UnstyledButton>
              );
            })}
          </Stack>

          <DatePicker
            type="range"
            value={tempDate}
            // @ts-expect-error
            onChange={(value: DatesRangeValue) => {
              setTempDate(value);

              const [startDate, endDate] = value;

              // Only set date when fully selected
              if (startDate && endDate) {
                // Set to custom option
                setOptionSelected(options.length - 1);
                onDateChange(value);
              }
            }}
            {...datePickerProps}
          />
        </Group>
      </Popover.Dropdown>
    </Popover>
  );
}
