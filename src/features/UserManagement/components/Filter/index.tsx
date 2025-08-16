import { Button, Group, Select, TextInput } from '@mantine/core';
import { Controller, useForm } from 'react-hook-form';
import DatePickerInputCustom from '~/components/MantineCustom/DatePickerInputCustom';
import { formatDateRange, parseDateRange, removeNullOrUndefined, trimObject } from '~/utils';
import { EUSER_STATUS, IUserManagementFilter } from '../../services';

export interface IFilterProps {
  onFilter: (value: any) => void;
  onClear: () => void;
}

export default function Filter({ onClear, onFilter }: IFilterProps) {
  const defaultValues: Partial<IUserManagementFilter> = {};

  const { setValue, reset, handleSubmit, control } = useForm({
    defaultValues,
  });

  const handleClear = () => {
    reset(defaultValues);
    onClear();
  };

  return (
    <Group
      component="form"
      onSubmit={handleSubmit((values) => onFilter(removeNullOrUndefined(trimObject(values))))}
    >
      <Controller
        control={control}
        name="search"
        render={({ field }) => (
          <TextInput
            {...field}
            flex={1}
            label="Tìm kiếm"
            placeholder="Số điện thoại, Email"
            value={field.value || ''}
          />
        )}
      />

      <Controller
        control={control}
        name="date"
        render={({ field }) => (
          <DatePickerInputCustom
            flex={1}
            type="range"
            label="Thời gian tạo"
            placeholder="Từ ngày - đến ngày"
            value={parseDateRange(field.value)}
            onChange={(date) => setValue('date', formatDateRange(date))}
          />
        )}
      />

      <Controller
        control={control}
        name="status"
        render={({ field }) => (
          <Select
            {...field}
            flex={1}
            label="Trạng thái"
            placeholder="Chọn trạng thái"
            value={field.value || null}
            data={[
              { label: 'Hoạt động', value: EUSER_STATUS.ACTIVE },
              { label: 'Ngừng hoạt động', value: EUSER_STATUS.INACTIVE },
            ]}
          />
        )}
      />

      <Group justify="flex-end" style={{ alignSelf: 'flex-end' }}>
        <Button variant="outline" onClick={handleClear}>
          Hủy
        </Button>
        <Button type="submit">Tìm kiếm</Button>
      </Group>
    </Group>
  );
}
