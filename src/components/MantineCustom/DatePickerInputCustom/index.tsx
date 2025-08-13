import { DatePickerInput, DatePickerInputProps, DatePickerType } from '@mantine/dates';
import CalendarIcon from '~/components/Icons/CalendarIcon';
import { DATE_FORMAT } from '~/constants';

export type IDatePickerInputCustomProps<Type extends DatePickerType = 'default'> =
  DatePickerInputProps<Type>;

/**
 * @description Customize DatePickerInput to display rightSection when there is no data
 */
export default function DatePickerInputCustom<Type extends DatePickerType = 'default'>({
  clearable = true,
  disabled,
  ...props
}: IDatePickerInputCustomProps<Type>) {
  const hasValue = (() => {
    if (!props.type || props.type === 'default') return !!props.value;
    if (props.type === 'range' && Array.isArray(props?.value))
      return props?.value?.some((e) => !!e);

    return;
  })();

  const rightSection = disabled || !clearable || !hasValue ? <CalendarIcon /> : null;

  return (
    <DatePickerInput
      valueFormat={DATE_FORMAT}
      clearable={clearable}
      rightSection={rightSection}
      rightSectionPointerEvents={hasValue ? 'auto' : 'none'}
      allowSingleDateInRange={(props.type === 'range') as any}
      disabled={disabled}
      {...props}
    />
  );
}
