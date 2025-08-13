import { DateInput, DateInputProps } from '@mantine/dates';
import CalendarIcon from '~/components/Icons/CalendarIcon';
import { DATE_FORMAT } from '~/constants';

/**
 * @description Customize DatePickerInput to display rightSection when there is no data
 */
export default function DateInputCustom({ clearable = true, disabled, ...props }: DateInputProps) {
  const rightSection = disabled || !clearable || !props.value ? <CalendarIcon /> : null;

  return (
    <DateInput
      valueFormat={DATE_FORMAT}
      clearable={clearable}
      rightSection={rightSection}
      rightSectionPointerEvents={!!props.value ? 'auto' : 'none'}
      allowDeselect={false}
      disabled={disabled}
      {...props}
    />
  );
}
