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
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import dayjs from 'dayjs';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { useSetRecoilState } from 'recoil';
import { useTheme } from 'styled-components';
import * as Yup from 'yup';
import BaseModal, { IBaseModalProps } from '~/components/UI/BaseModal';
import FancyboxImage from '~/components/UI/FancyboxImage';
import { FILE_MAX_SIZE, MESSAGES, YEAR_FORMAT } from '~/constants';
import ProvinceModal from '~/features/ProvinceManagement/ProvinceModal';
import { useCreateProvince, useGetProvinceList } from '~/features/ProvinceManagement/services';
import { useCreateWard, useGetWardList } from '~/features/WardManagement/services';
import WardModal from '~/features/WardManagement/WardModal';
import { useUploadFile } from '~/services';
import { trimObject, utils } from '~/utils';
import { validateFileSize } from '~/utils/validate';
import { IReportDetail, useGetReportDetail, useUploadFileReport } from '../../services';
import { EREPORT_STATUS } from '../../services/ReportManagement.enum';
import { UploadFileReportProgress } from '../../services/ReportManagement.recoil';
import UploadFileProgress from './UploadFileProgress';

export interface IReportManagementModalProps extends IBaseModalProps {
  reportId?: IReportDetail['_id'];
  onSubmit: (values: any, callback?: Function) => void;
}

export default function ReportManagementModal({
  reportId,
  readOnly,
  confirmLoading,
  onClose,
  onSubmit,
  ...props
}: IReportManagementModalProps) {
  const isUpdate = !!reportId;
  const theme = useTheme();
  const inputImageRef = useRef<HTMLInputElement>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const setUploadFileReportProgress = useSetRecoilState(UploadFileReportProgress);

  const [opened, provinceModal] = useDisclosure();
  const [opened2, wardModal] = useDisclosure();
  const [isUploading, setIsUploading] = useState(false);

  const { data: reportDetail, isFetching } = useGetReportDetail({
    params: reportId,
    options: { staleTime: 0 },
  });

  const defaultValues: Partial<IReportDetail> = {
    thumbnail: '',
    code: '',
    name: '',
    province: '',
    ward: '',
    file: '',
    description: '',
    price: undefined,
    year: new Date().getFullYear(),
    status: EREPORT_STATUS.ENABLED,
  };

  const validationSchema = Yup.object({
    province: Yup.string().required(MESSAGES.REQUIRED),
    code: Yup.string().required(MESSAGES.REQUIRED),
    name: Yup.string().required(MESSAGES.REQUIRED),
    price: Yup.number().transform(utils.common.transformInputNumber).required(MESSAGES.REQUIRED),
    year: Yup.number().required(MESSAGES.REQUIRED),
    file: Yup.string().required(MESSAGES.REQUIRED),
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
  const file = useWatch({ control, name: 'file' });
  const fileSize = useWatch({ control, name: 'file_size' });

  // Danh sách tỉnh/thành
  const { data: provinceList = [] } = useGetProvinceList();

  // Danh sách tỉnh/thành
  const { data: wardList = [] } = useGetWardList({
    params: provinceId,
  });

  const { mutate: uploadFile, isLoading: uploadLoading } = useUploadFile();
  const { mutate: uploadFileReport } = useUploadFileReport();
  const { mutate: createProvince, isLoading: createProvinceLoading } = useCreateProvince();
  const { mutate: createWard, isLoading: createWardLoading } = useCreateWard();

  useEffect(() => {
    if (!reportDetail) return;

    const fields: (keyof IReportDetail)[] = [
      'code',
      'name',
      'province',
      'ward',
      'file',
      'file_size',
      'description',
      'price',
      'year',
      'status',
    ];

    fields.forEach((field) => {
      setValue(field, reportDetail[field]);
    });

    //eslint-disable-next-line
  }, [reportDetail]);

  // Tải lên ảnh báo cáo
  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const isValidFileSize = validateFileSize(file);
    if (!isValidFileSize) return;

    uploadFile(file, {
      onSuccess: (response) => {
        // Lấy cả url, nhưng khi lưu chỉ cần path
        setValue('thumbnail', response?.data?.uploadedUrl);
        e.target.value = '';
      },
    });
  };

  // Tải lên file báo cáo
  const handleUploadFileReport = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    // Kiểm tra kích thước file
    if (file.size > FILE_MAX_SIZE) {
      e.target.value = '';
      modals.openConfirmModal({
        size: 500,
        title: 'Tải lên thất bại',
        children: (
          <Text>
            Kích thước file báo cáo không được vượt quá <b>100MB</b>
          </Text>
        ),
      });
      return;
    }

    const lastIndex = file.name.lastIndexOf('.');
    const hex = new Date().getTime().toString(16);

    // Thêm chuỗi hex vào tên file
    const fileName = file.name.substring(0, lastIndex) + '-' + hex + file.name.substring(lastIndex);

    // Tách file thành các chunk
    const chunks = utils.common.splitFileIntoChunks(file);

    // xác định phần trăm tối đa cho mỗi chunk
    const maxChunkPercent = Math.ceil(100 / chunks.length);

    // clear value của input để khi chọn lại file vẫn kích hoạt onChange
    e.target.value = '';
    setIsUploading(true);

    // Tải lên từng chunk
    for (let i = 0; i < chunks.length; i++) {
      const payload = {
        chunkIndex: i,
        fileChunk: chunks[i],
        fileName: fileName,
      };

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: function (progressEvent: any) {
          // % tải lên của mỗi chunk
          const chunkPercent = Math.ceil(
            ((i * chunks.length + progressEvent.loaded) * 100) / file.size
          );
          // Tổng phần trăm tải lên
          const totalPercent = maxChunkPercent * i + chunkPercent;
          setUploadFileReportProgress(totalPercent);
        },
      };

      try {
        // Tải lên lần lượt chunk
        await new Promise((resolve, reject) => {
          const body = { config, payload };
          uploadFileReport(body, {
            onSuccess: () => {
              resolve(true);

              // Nếu là chunk cuối cùng kết thúc upload
              if (i === chunks.length - 1) {
                setValue('file', fileName);
                setValue('file_size', file.size);
                setIsUploading(false);
                setUploadFileReportProgress(0);
                notifications.show({ message: 'Tải lên file báo cáo thành công' });
              }
            },
            onError: () => {
              setIsUploading(false);
              setUploadFileReportProgress(0);
              reject();
              return;
            },
          });
        });
      } catch {
        notifications.show({
          message: 'Tải lên file báo cáo thất bại',
          color: theme?.colors.RED,
        });
      }
    }
  };

  const handleCreateProvince = (values: any, callback?: Function) => {
    createProvince(values, {
      onSuccess: (response) => {
        callback?.();
        setValue('province', response.data);
        setValue('ward', ''); // Reset ward when province changes
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

  const _handleSubmit = handleSubmit((values) => {
    if (isUploading) {
      // Không cho phép gửi form khi đang tải lên file
      notifications.show({
        message: 'Đang tải lên file báo cáo, vui lòng chờ...',
        color: theme?.colors.ORANGE,
      });
      return;
    }

    onSubmit(trimObject(values), handleClose);
  });

  const handleClose = () => {
    // Không đóng modal khi đang tải lên file
    if (isUploading) {
      notifications.show({
        message: 'Đang tải lên file báo cáo, vui lòng chờ...',
        color: theme?.colors.ORANGE,
      });
      return;
    }

    onClose();
    reset(defaultValues);
  };

  const title = readOnly ? 'Thông tin báo cáo' : isUpdate ? 'Cập nhật báo cáo' : 'Thêm báo cáo';
  const footer = (
    <Group justify="flex-end">
      <Button variant="outline" onClick={handleClose} disabled={confirmLoading}>
        Hủy
      </Button>
      {!readOnly && (
        <Button loading={confirmLoading} onClick={_handleSubmit}>
          {isUpdate ? 'Cập nhật báo cáo' : 'Tạo báo cáo'}
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
        <LoadingOverlay visible={uploadLoading || isFetching} />

        <Box style={{ display: 'grid', gridTemplateColumns: '20rem 1fr', gap: 32 }}>
          <Stack>
            <Controller
              control={control}
              name="file"
              render={({ fieldState }) => (
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
                        title={file || ''}
                        lineClamp={1}
                        style={{ wordBreak: 'break-all' }}
                      >
                        Tên file: <b>{file || '-/-'}</b>
                      </Text>
                      <Text fz={14}>
                        Kích thước: <b>{utils.format.numberToBytes(fileSize || 0)}</b>
                      </Text>
                    </Stack>
                  </Input.Wrapper>

                  <input
                    hidden
                    ref={inputFileRef}
                    accept="application/pdf"
                    type="file"
                    onChange={handleUploadFileReport}
                  />
                  {isUploading ? (
                    <UploadFileProgress />
                  ) : (
                    <Button onClick={() => inputFileRef.current?.click()}>Chọn file</Button>
                  )}
                </Stack>
              )}
            />

            <Controller
              control={control}
              name="thumbnail"
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
                      setValue('province', e || '');
                      setError('province', {});
                      setValue('ward', ''); // Reset ward when province changes
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
                    label="Giá tiền (VNĐ)"
                    placeholder="Nhập giá tiền (VNĐ)"
                    thousandSeparator=","
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

            {isUpdate && (
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <Switch
                    label="Trạng thái"
                    checked={field.value === EREPORT_STATUS.ENABLED}
                    onChange={(e) =>
                      setValue(
                        'status',
                        e.target.checked ? EREPORT_STATUS.ENABLED : EREPORT_STATUS.DISABLED
                      )
                    }
                  />
                )}
              />
            )}
          </Stack>
        </Box>
      </BaseModal>
    </>
  );
}
