import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Group, NumberInput, Select, Stack, Switch, TextInput } from '@mantine/core';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import BaseModal, { IBaseModalProps } from '~/components/UI/BaseModal';
import { MESSAGES } from '~/constants';
import { utils } from '~/utils';
import { useGetProvinceList } from '../ProvinceManagement/services';
import { IWard } from './services';

export interface IWardModalProps extends IBaseModalProps {
  initialValues?: IWard;
  provinceId?: string;
  onSubmit: (values: any, callback?: Function) => void;
}

export default function WardModal({
  initialValues,
  readOnly,
  confirmLoading,
  provinceId,
  onClose,
  onSubmit,
  ...props
}: IWardModalProps) {
  const isUpdate = !!initialValues;

  // Danh sách tỉnh/thành
  const { data: provinceList = [] } = useGetProvinceList();

  const defaultValues = {
    parent_id: '',
    code: '',
    name: '',
    priority: undefined,
    is_enable: true,
    version: 2,
  };

  const validationSchema = Yup.object({
    parent_id: Yup.string().required(MESSAGES.REQUIRED),
    code: Yup.string()
      .max(10, 'Mã Phường/Xã không được vượt quá 10 ký tự')
      .required(MESSAGES.REQUIRED),
    name: Yup.string()
      .max(50, 'Tên Phường/Xã không được vượt quá 50 ký tự')
      .required(MESSAGES.REQUIRED),
    priority: Yup.number().transform(utils.common.transformInputNumber),
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

  // Set mặc định provinceCode nếu ko có initialValues
  useEffect(() => {
    if (initialValues || !provinceId) return;
    setValue('parent_id', provinceId);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues, provinceId, props.opened]);

  useEffect(() => {
    if (!initialValues) return;
    const fields: (keyof IWard)[] = ['code', 'name', 'priority', 'is_enable'];

    for (const field of fields) {
      setValue(field as any, initialValues[field]);
    }

    setValue('parent_id', initialValues.parent._id);

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
          name="parent_id"
          render={({ field }) => (
            <Select
              {...field}
              disabled
              required
              label="Tỉnh/Thành phố"
              placeholder="Chọn Tỉnh/Thành phố"
              value={field.value || null}
              data={provinceList?.map((e) => ({ label: e.name, value: e._id }))}
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
