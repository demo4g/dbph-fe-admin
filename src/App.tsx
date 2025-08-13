import { Detector } from 'react-detect-offline';
import { Helmet } from 'react-helmet';
import { RouterProvider } from 'react-router-dom';
import { OfflineNotification, OnlineNotification } from './components/UI/OnlineOffline';
import router from './configs/router';

function App() {
  return (
    <>
      <Helmet titleTemplate="%s | DBP" defaultTitle="DBP" />

      <RouterProvider router={router} />

      {/* Thông báo khi kết nối mạng thay đổi */}
      <Detector
        polling={false}
        render={({ online }) => {
          return online ? <OnlineNotification online={online} /> : <OfflineNotification />;
        }}
      />
    </>
  );
}

export default App;
