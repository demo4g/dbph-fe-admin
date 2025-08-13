import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
`;

export const ChildrenWrapper = styled.span`
  text-overflow: ellipsis;
  overflow: hidden;
  flex: 1;
  white-space: nowrap;
`;

export const RowButtonGroup = styled.div<{ active?: boolean }>`
  display: ${(props) => (props.active ? 'flex !important' : 'none')};
  /* position: absolute; */
  gap: 0.4rem;
  align-items: center;
  /* margin: -0.8rem 0; */
  /* right: 0; */
`;

export const RowActionButton = styled.button`
  z-index: 1;
  border-radius: 999px;
  cursor: pointer;
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: ${(props) => props.theme.colors.BACKGROUND_PRIMARY}; */
  background-color: transparent;

  &:hover {
    background-color: #edf8ff;
  }
`;
