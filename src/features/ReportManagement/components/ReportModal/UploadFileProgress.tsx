import { Progress } from '@mantine/core';
import { useRecoilValue } from 'recoil';
import { useTheme } from 'styled-components';
import { UploadFileReportProgress } from '../../services/ReportManagement.recoil';

export interface IUploadFileProgressProps {}

export default function UploadFileProgress(props: IUploadFileProgressProps) {
  const theme = useTheme();
  const uploadFileReportProgress = useRecoilValue(UploadFileReportProgress);

  return (
    <Progress.Root h={42}>
      <Progress.Section
        value={uploadFileReportProgress}
        color={theme?.colors.GREEN}
        animated
        striped
      >
        <Progress.Label
          fz={18}
          style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}
        >
          {uploadFileReportProgress}%
        </Progress.Label>
      </Progress.Section>
    </Progress.Root>
  );
}
