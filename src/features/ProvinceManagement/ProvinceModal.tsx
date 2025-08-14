import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Group, NumberInput, Stack, Switch, TextInput } from '@mantine/core';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import BaseModal, { IBaseModalProps } from '~/components/UI/BaseModal';
import { MESSAGES } from '~/constants';
import { utils } from '~/utils';
import { IProvince } from './services';

export interface IProvinceModalProps extends IBaseModalProps {
  initialValues?: IProvince;
  onSubmit: (values: any, callback?: Function) => void;
}

export default function ProvinceModal({
  initialValues,
  readOnly,
  confirmLoading,
  onClose,
  onSubmit,
  ...props
}: IProvinceModalProps) {
  const isUpdate = !!initialValues;

  const defaultValues: Partial<IProvince> = {
    code: '',
    name: '',
    priority: undefined,
    is_enable: true,
    version: 2,
  };

  const validationSchema = Yup.object({
    code: Yup.string()
      .max(10, 'Mã Tỉnh/Thành phố không được vượt quá 10 kí tự')
      .required(MESSAGES.REQUIRED),
    name: Yup.string()
      .max(50, 'Tên Tỉnh/Thành phố không được vượt quá 50 kí tự')
      .required(MESSAGES.REQUIRED),
    priority: Yup.number().transform(utils.common.transformInputNumber),
    status: Yup.boolean(),
  });

  const {
    setValue,
    reset,
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema) as any,
  });

  useEffect(() => {
    if (!initialValues) return;
    const fields: (keyof IProvince)[] = ['code', 'name', 'priority', 'is_enable'];

    for (const field of fields) {
      setValue(field, initialValues[field]);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues]);

  const handleClose = () => {
    onClose();
    reset(defaultValues);
  };

  const footer = (
    <Group justify="flex-end">
      <Button variant="outline" onClick={handleClose} disabled={confirmLoading}>
        Hủy
      </Button>
      <Button
        onClick={handleSubmit((values) => onSubmit(values, handleClose))}
        loading={confirmLoading}
      >
        {isUpdate ? 'Cập nhật' : 'Thêm'}
      </Button>
    </Group>
  );

  return (
    <BaseModal
      title={isUpdate ? 'Cập nhật Tỉnh/Thành phố' : 'Thêm Tỉnh/Thành phố'}
      size={440}
      onClose={handleClose}
      footer={footer}
      {...props}
    >
      <Stack>
        <TextInput
          {...register('code')}
          required
          label="Mã Tỉnh/Thành phố"
          placeholder="Nhập mã Tỉnh/Thành phố"
          error={errors.code?.message}
        />

        <TextInput
          {...register('name')}
          required
          label="Tên Tỉnh/Thành phố"
          placeholder="Nhập tên Tỉnh/Thành phố"
          error={errors.name?.message}
        />

        <Controller
          control={control}
          name="priority"
          render={({ field, fieldState }) => (
            <NumberInput
              {...field}
              label="Thứ tự ưu tiên"
              placeholder="Nhập Thứ tự ưu tiên"
              error={fieldState.error?.message}
              value={field.value || ''}
            />
          )}
        />

        {isUpdate && (
          <Controller
            control={control}
            name="is_enable"
            render={({ field }) => (
              <Switch
                styles={{ body: { flexDirection: 'row-reverse', gap: 12 } }}
                label="Trạng thái"
                checked={field.value}
                onChange={(e) => setValue('is_enable', e.target.checked)}
              />
            )}
          />
        )}
      </Stack>
    </BaseModal>
  );
}
