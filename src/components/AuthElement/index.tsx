import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { PATHS } from '~/constants';
import tokenManager from '~/utils/tokenManager';

export interface IAuthElementProps extends PropsWithChildren {
  children: any;
}

export default function AuthElement({ children }: IAuthElementProps) {
  const access_token = tokenManager.getAccessToken();

  if (!access_token) {
    return <Navigate to={`/${PATHS.LOGIN}`} />;
  }

  return children;
}
