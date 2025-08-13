import styled from 'styled-components';

export const LoginWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.BACKGROUND_SECONDARY};
`;

export const LoginContentWrapper = styled.div`
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.WHITE};
  z-index: 1;
  overflow: hidden;
  box-shadow: ${(props) => props.theme.shadows.SHADOW_TABLE};
`;
