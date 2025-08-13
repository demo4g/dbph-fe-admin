import tokenManager from './tokenManager';

export default function handleLogout() {
  tokenManager.removeAccessToken();
  tokenManager.removeRefreshToken();
  window.location.reload();
}
