import { Accordion, Box, Group, Text } from '@mantine/core';
import { ReactNode, useState } from 'react';
import FilterIcon from '~/components/Icons/FilterIcon';
import { AccordionWrapper } from './styled';

interface ICollapseScreen {
  children: any;
  headerContent: ReactNode;
  header?: ReactNode;
  initActive?: boolean;
}

const CollapseScreen = ({ children, header, headerContent, initActive }: ICollapseScreen) => {
  const [activeKey, setActiveKey] = useState(initActive ? '1' : '');

  const defaultHeader = (
    <Group gap={12}>
      <FilterIcon />
      <Text>Bộ lọc</Text>
    </Group>
  );

  return (
    <>
      <AccordionWrapper>
        <Accordion onChange={(e) => setActiveKey(e as string)} value={activeKey}>
          <Accordion.Item key={'1'} value={'1'}>
            <Accordion.Control>{header || defaultHeader}</Accordion.Control>
            <Accordion.Panel>{headerContent}</Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </AccordionWrapper>

      <Box h={16} />

      {typeof children === 'function' ? children(!!activeKey) : children}
    </>
  );
};

export default CollapseScreen;
