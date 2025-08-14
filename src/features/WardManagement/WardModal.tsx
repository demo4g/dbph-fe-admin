import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Group, NumberInput, Select, Stack, Switch, TextInput } from '@mantine/core';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import BaseModal, { IBaseModalProps } from '~/components/UI/BaseModal';
import { MESSAGES } from '~/constants';
import { utils } from '~/utils';
import { IWard } from './services';

export interface IWardModalProps extends IBaseModalProps {
  initialValues?: IWard;
  onSubmit: (values: any, callback?: Function) => void;
}

export default function WardModal({
  initialValues,
  readOnly,
  confirmLoading,
  onClose,
  onSubmit,
  ...props
}: IWardModalProps) {
  const isUpdate = !!initialValues;

  const defaultValues: Partial<IWard> = {
    provinceCode: '',
    code: '',
    name: '',
    priority: undefined,
    status: true,
  };

  const validationSchema = Yup.object({
    code: Yup.string().required(MESSAGES.REQUIRED),
    name: Yup.string().required(MESSAGES.REQUIRED),
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
    const fields: (keyof IWard)[] = ['provinceCode', 'code', 'name', 'priority', 'status'];

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
      title={isUpdate ? 'Cập nhật Phường/Xã' : 'Thêm Phường/Xã'}
      size={440}
      onClose={handleClose}
      footer={footer}
      {...props}
    >
      <Stack>
        <Controller
          control={control}
          name="provinceCode"
          render={({ field }) => (
            <Select
              {...field}
              disabled
              label="Tỉnh/Thành phố"
              placeholder="Chọn Tỉnh/Thành phố"
              value={field.value || null}
              data={[
                { label: 'Tỉnh/Thành phố 1', value: '1' },
                { label: 'Tỉnh/Thành phố 2', value: '2' },
              ]}
            />
          )}
        />

        <TextInput
          {...register('code')}
          required
          label="Mã Phường/Xã"
          placeholder="Nhập mã Phường/Xã"
          error={errors.code?.message}
        />

        <TextInput
          {...register('name')}
          required
          label="Tên Phường/Xã"
          placeholder="Nhập tên Phường/Xã"
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
            name="status"
            render={({ field }) => (
              <Switch
                styles={{ body: { flexDirection: 'row-reverse', gap: 12 } }}
                label="Trạng thái"
                checked={field.value}
                onChange={(e) => setValue('status', e.target.checked)}
              />
            )}
          />
        )}
      </Stack>
    </BaseModal>
  );
}
