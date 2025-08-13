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
} from '@mantine/core';
import { YearPickerInput } from '@mantine/dates';
import dayjs from 'dayjs';
import { ChangeEvent, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import BaseModal, { IBaseModalProps } from '~/components/UI/BaseModal';
import FancyboxImage from '~/components/UI/FancyboxImage';
import { MESSAGES, YEAR_FORMAT } from '~/constants';
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
  const inputImageRef = useRef<HTMLInputElement>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const [fileInfo, setFileInfo] = useState<{ name: string; size: number }>();

  const { mutate: uploadFile, isLoading: uploadLoading } = useUploadFile();

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
    reset,
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema) as any,
  });

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

          {/* <Controller
            control={control}
            name="file"
            render={({ field, fieldState }) => (
              <FileInput
                required
                label="File báo cáo"
                description={`Kích thước ${utils.format.numberToBytes(fileInfo?.size || 0)}`}
                placeholder="Chọn file báo cáo"
                error={fieldState.error?.message}
              />
            )}
          /> */}

          <SimpleGrid cols={2}>
            <Controller
              control={control}
              name="province"
              render={({ field, fieldState }) => (
                <Select
                  {...field}
                  required
                  label="Tỉnh/Thành phố"
                  placeholder="Chọn tỉnh/thành phố"
                  error={fieldState.error?.message}
                  value={field.value || null}
                  data={[
                    { label: 'Tỉnh/Thành phố 1', value: '1' },
                    { label: 'Tỉnh/Thành phố 2', value: '2' },
                  ]}
                />
              )}
            />

            <Controller
              control={control}
              name="ward"
              render={({ field }) => (
                <Select
                  {...field}
                  label="Phường/Xã"
                  placeholder="Chọn phường/xã"
                  value={field.value || null}
                  data={[
                    { label: 'Phường/Xã 1', value: '1' },
                    { label: 'Phường/Xã 2', value: '2' },
                  ]}
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
  );
}
