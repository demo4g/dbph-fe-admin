import { DateTimePicker, DateTimePickerProps } from '@mantine/dates';
import CalendarIcon from '~/components/Icons/CalendarIcon';
import { DATE_TIME_FORMAT } from '~/constants';

export interface IDateTimePickerCustomProps extends DateTimePickerProps {}

/**
 * @description Customize the DateTimePicker to display rightSection when there is no data
 */
export default function DateTimePickerCustom({
  clearable = true,
  disabled,
  ...props
}: IDateTimePickerCustomProps) {
  const rightSection = disabled || !clearable || !props.value ? <CalendarIcon /> : null;

  return (
    <DateTimePicker
      valueFormat={DATE_TIME_FORMAT}
      clearable={clearable}
      rightSection={rightSection}
      rightSectionPointerEvents={props.value ? 'auto' : 'none'}
      disabled={disabled}
      {...props}
    />
  );
}
