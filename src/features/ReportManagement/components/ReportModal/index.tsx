import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Group,
  Input,
  LoadingOverlay,
  NumberInput,
  Select,
  SimpleGrid,
  Stack,
  Switch,
  Text,
  Textarea,
  TextInput,
  UnstyledButton,
} from '@mantine/core';
import { YearPickerInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import dayjs from 'dayjs';
import { ChangeEvent, useRef, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { useTheme } from 'styled-components';
import * as Yup from 'yup';
import BaseModal, { IBaseModalProps } from '~/components/UI/BaseModal';
import FancyboxImage from '~/components/UI/FancyboxImage';
import { MESSAGES, YEAR_FORMAT } from '~/constants';
import ProvinceModal from '~/features/ProvinceManagement/ProvinceModal';
import { useCreateProvince, useGetProvinceList } from '~/features/ProvinceManagement/services';
import { useCreateWard, useGetWardList } from '~/features/WardManagement/services';
import WardModal from '~/features/WardManagement/WardModal';
import { useUploadFile } from '~/services';
import { utils } from '~/utils';
import { validateFileSize } from '~/utils/validate';
import { IReportDetail, IReportItem } from '../../services';

export interface IReportManagementModalProps extends IBaseModalProps {
  initialValues?: IReportItem;
  onSubmit: (values: any, callback?: Function) => void;
}

export default function ReportManagementModal({
  initialValues,
  readOnly,
  confirmLoading,
  onClose,
  onSubmit,
  ...props
}: IReportManagementModalProps) {
  const isUpdate = !!initialValues;
  const theme = useTheme();
  const inputImageRef = useRef<HTMLInputElement>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const [opened, provinceModal] = useDisclosure();
  const [opened2, wardModal] = useDisclosure();

  const [fileInfo, setFileInfo] = useState<{ name: string; size: number }>();

  const defaultValues: Partial<IReportDetail> = {
    image: '',
    code: '',
    name: '',
    province: '',
    ward: '',
    file: null,
    price: undefined,
    year: new Date().getFullYear(),
    status: true,
  };

  const validationSchema = Yup.object({
    province: Yup.string().required(MESSAGES.REQUIRED),
    code: Yup.string().required(MESSAGES.REQUIRED),
    name: Yup.string().required(MESSAGES.REQUIRED),
    price: Yup.number().transform(utils.common.transformInputNumber).required(MESSAGES.REQUIRED),
    year: Yup.number().required(MESSAGES.REQUIRED),
    file: Yup.mixed().required(MESSAGES.REQUIRED),
  });

  const {
    setValue,
    setError,
    reset,
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema) as any,
  });

  const provinceId = useWatch({ control, name: 'province' });

  // Danh sách tỉnh/thành
  const { data: provinceList = [] } = useGetProvinceList();

  // Danh sách tỉnh/thành
  const { data: wardList = [] } = useGetWardList({
    params: provinceId,
  });

  const { mutate: uploadFile, isLoading: uploadLoading } = useUploadFile();
  const { mutate: createProvince, isLoading: createProvinceLoading } = useCreateProvince();
  const { mutate: createWard, isLoading: createWardLoading } = useCreateWard();

  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const isValidFileSize = validateFileSize(file);
    if (!isValidFileSize) return;

    uploadFile(file, {
      onSuccess: (response) => {
        // Lấy cả url, nhưng khi lưu chỉ cần path
        setValue('image', response?.data?.uploadedUrl);
        e.target.value = '';
      },
    });
  };

  const handleUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    console.log('file: ', file);
    setFileInfo({ name: file.name, size: file.size });
    setValue('file', file);
  };

  const handleCreateProvince = (values: any, callback?: Function) => {
    createProvince(values, {
      onSuccess: (response) => {
        callback?.();
        setValue('province', response.data);
        setValue('ward', undefined); // Reset ward when province changes
        notifications.show({ message: 'Thêm Tỉnh/Thành phố thành công' });
      },
    });
  };

  const handleCreateWard = (values: any, callback?: Function) => {
    createWard(values, {
      onSuccess: (response) => {
        callback?.();
        setValue('ward', response.data);
        notifications.show({ message: 'Thêm Phường/Xã thành công' });
      },
    });
  };

  const handleClose = () => {
    onClose();
    setFileInfo(undefined);
    reset(defaultValues);
  };

  const title = readOnly ? 'Thông tin báo cáo' : isUpdate ? 'Cập nhật báo cáo' : 'Thêm báo cáo';
  const footer = (
    <Group justify="flex-end">
      <Button variant="outline" onClick={handleClose} disabled={confirmLoading}>
        Hủy
      </Button>
      {!readOnly && (
        <Button
          onClick={handleSubmit((values) => onSubmit(values, handleClose))}
          loading={confirmLoading}
        >
          {isUpdate ? 'Cập nhật' : 'Thêm'}
        </Button>
      )}
    </Group>
  );

  return (
    <>
      <ProvinceModal
        opened={opened}
        onSubmit={handleCreateProvince}
        confirmLoading={createProvinceLoading}
        onClose={provinceModal.close}
        zIndex={1000}
      />

      <WardModal
        opened={opened2}
        provinceId={provinceId}
        confirmLoading={createWardLoading}
        onSubmit={handleCreateWard}
        onClose={wardModal.close}
        zIndex={1000}
      />

      <BaseModal title={title} size={992} onClose={handleClose} footer={footer} {...props}>
        <LoadingOverlay visible={uploadLoading} />

        <Box style={{ display: 'grid', gridTemplateColumns: '20rem 1fr', gap: 32 }}>
          <Stack>
            <Controller
              control={control}
              name="file"
              render={({ field, fieldState }) => (
                <Stack flex={1}>
                  <Input.Wrapper
                    required
                    label="File báo cáo"
                    error={fieldState.error?.message}
                    styles={{ label: { marginBottom: 12 } }}
                  >
                    <Stack gap={4}>
                      <Text
                        fz={14}
                        title={fileInfo?.name || ''}
                        lineClamp={1}
                        style={{ wordBreak: 'break-all' }}
                      >
                        Tên file: <b>{fileInfo?.name || '-/-'}</b>
                      </Text>
                      <Text fz={14}>
                        Kích thước: <b>{utils.format.numberToBytes(fileInfo?.size || 0)}</b>
                      </Text>
                    </Stack>
                  </Input.Wrapper>

                  <input
                    hidden
                    ref={inputFileRef}
                    accept="application/pdf"
                    type="file"
                    onChange={handleUploadFile}
                  />
                  <Button onClick={() => inputFileRef.current?.click()}>Chọn file</Button>
                </Stack>
              )}
            />

            <Controller
              control={control}
              name="image"
              render={({ field, fieldState }) => (
                <Stack>
                  <Input.Wrapper label="Ảnh báo cáo" error={fieldState.error?.message}>
                    <FancyboxImage
                      src={field.value || null}
                      w="100%"
                      style={{ aspectRatio: 1 }}
                      fit="contain"
                      radius={8}
                    />
                  </Input.Wrapper>

                  <input ref={inputImageRef} type="file" hidden onChange={handleUploadImage} />
                  <Button onClick={() => inputImageRef?.current?.click()}>Chọn ảnh</Button>
                </Stack>
              )}
            />
          </Stack>

          <Stack flex={1}>
            <TextInput
              {...register('code')}
              required
              label="Mã báo cáo"
              placeholder="Nhập mã báo cáo"
              error={errors.code?.message}
            />

            <TextInput
              {...register('name')}
              required
              label="Tên báo cáo"
              placeholder="Nhập tên báo cáo"
              error={errors.name?.message}
            />

            <SimpleGrid cols={2}>
              <Controller
                control={control}
                name="province"
                render={({ field, fieldState }) => (
                  <Select
                    label={
                      <Group gap={4}>
                        <Text>
                          Tỉnh/Thành phố <span style={{ color: 'red' }}>*</span>
                        </Text>
                        <UnstyledButton display="flex" onClick={provinceModal.open}>
                          <IoIosAddCircleOutline size={20} color={theme?.colors.PRIMARY} />
                        </UnstyledButton>
                      </Group>
                    }
                    clearable={false}
                    placeholder="Chọn tỉnh/thành phố"
                    error={fieldState.error?.message}
                    value={field.value || null}
                    data={provinceList?.map((e) => ({ label: e.name, value: e._id }))}
                    onChange={(e) => {
                      setValue('province', e || undefined);
                      setError('province', {});
                      setValue('ward', undefined); // Reset ward when province changes
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
                    label={
                      <Group gap={4}>
                        <Text>Phường/Xã</Text>
                        <UnstyledButton
                          display="flex"
                          onClick={() => {
                            if (!provinceId) {
                              notifications.show({ message: 'Vui lòng chọn Tỉnh/Thành phố trước' });
                            } else {
                              wardModal.open();
                            }
                          }}
                        >
                          <IoIosAddCircleOutline size={20} color={theme?.colors.PRIMARY} />
                        </UnstyledButton>
                      </Group>
                    }
                    placeholder="Chọn phường/xã"
                    value={field.value || null}
                    data={wardList?.map((e) => ({ label: e.name, value: e._id }))}
                  />
                )}
              />

              <Controller
                control={control}
                name="price"
                render={({ field, fieldState }) => (
                  <NumberInput
                    {...field}
                    required
                    label="Giá tiền"
                    placeholder="Nhập giá tiền"
                    error={fieldState.error?.message}
                    value={field.value || ''}
                  />
                )}
              />

              <Controller
                control={control}
                name="year"
                render={({ field, fieldState }) => (
                  <YearPickerInput
                    required
                    clearable={false}
                    label="Năm"
                    placeholder="Chọn năm"
                    error={fieldState.error?.message}
                    value={field.value ? dayjs(field.value.toString(), YEAR_FORMAT).toDate() : null}
                    onChange={(date) => setValue('year', +dayjs(date).format(YEAR_FORMAT))}
                  />
                )}
              />
            </SimpleGrid>

            <Textarea
              {...register('description')}
              label="Mô tả"
              placeholder="Nhập mô tả"
              error={errors.description?.message}
            />

            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <Switch
                  label="Trạng thái"
                  checked={field.value}
                  onChange={(e) => setValue('status', e.target.checked)}
                />
              )}
            />
          </Stack>
        </Box>
      </BaseModal>
    </>
  );
}
