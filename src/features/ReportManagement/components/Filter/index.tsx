import { Button, Group, Select, TextInput } from '@mantine/core';
import { YearPickerInput } from '@mantine/dates';
import dayjs from 'dayjs';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { YEAR_FORMAT } from '~/constants';
import { useGetProvinceList } from '~/features/ProvinceManagement/services';
import { useGetWardList } from '~/features/WardManagement/services';
import { trimObject } from '~/utils';
import { IReportFilter } from '../../services';

export interface IFilterProps {
  onFilter: (value: any) => void;
  onClear: () => void;
}

export default function Filter({ onClear, onFilter }: IFilterProps) {
  const defaultValues: Partial<IReportFilter> = {};

  const { setValue, reset, handleSubmit, control } = useForm({
    defaultValues,
  });

  const provinceId = useWatch({ control, name: 'province' });

  const handleClear = () => {
    reset(defaultValues);
    onClear();
  };

  // Danh sách tỉnh/thành
  const { data: provinceList = [] } = useGetProvinceList();

  // Danh sách tỉnh/thành
  const { data: wardList = [] } = useGetWardList({
    params: provinceId,
  });

  return (
    <Group component="form" onSubmit={handleSubmit((values) => onFilter(trimObject(values)))}>
      <Controller
        control={control}
        name="keyword"
        render={({ field }) => (
          <TextInput
            {...field}
            flex={1}
            label="Tìm kiếm"
            placeholder="Mã, tên báo cáo"
            value={field.value || ''}
          />
        )}
      />

      <Controller
        control={control}
        name="province"
        render={({ field, fieldState }) => (
          <Select
            flex={1}
            label="Tỉnh/Thành phố"
            placeholder="Chọn tỉnh/thành phố"
            error={fieldState.error?.message}
            value={field.value || null}
            data={provinceList?.map((e) => ({ label: e.name, value: e._id }))}
            onChange={(e) => {
              setValue('province', e || undefined);
              setValue('ward', undefined);
            }}
          />
        )}
      />

      <Controller
        control={control}
        name="ward"
        render={({ field }) => (
          <Select
            {...field}
            flex={1}
            label="Phường/Xã"
            placeholder="Chọn phường/xã"
            value={field.value || null}
            data={wardList?.map((e) => ({ label: e.name, value: e._id }))}
          />
        )}
      />

      <Controller
        control={control}
        name="year"
        render={({ field }) => (
          <YearPickerInput
            flex={1}
            label="Năm"
            placeholder="Chọn năm"
            value={field.value ? dayjs(field.value, YEAR_FORMAT).toDate() : null}
            onChange={(date) =>
              setValue('year', date ? dayjs(date).format(YEAR_FORMAT) : undefined)
            }
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
              { label: 'Trạng thái 1', value: '1' },
              { label: 'Trạng thái 2', value: '2' },
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
