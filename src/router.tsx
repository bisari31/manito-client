import { createBrowserRouter } from 'react-router-dom';

import AuthRouter from './auth-router';
import routes from './constants/routes';
import Index from './routes';
import Contact from './routes/contact';
import ErrorPage from './routes/error-page';
import Home from './routes/home';
import KakaoRedirection from './routes/kakako-redirection';
import Layout from './routes/layout';
import My from './routes/my';
import MySetting from './routes/my-setting';
import Rename from './routes/rename';
import RollingpaperDetail from './routes/rollingpaper/detail';
import RollingpaperForm from './routes/rollingpaper/form';
import RollingpaperSetup from './routes/rollingpaper/setup';
import SetupIntro from './routes/setup-intro';
import Signup from './routes/signup';

const router = () =>
  createBrowserRouter([
    {
      errorElement: <ErrorPage />,
      children: [
        {
          path: routes.index,
          element: <Index />,
        },
        {
          path: routes.kakako_redirection,
          element: <KakaoRedirection />,
        },
        {
          element: <AuthRouter />,
          children: [
            {
              element: <Layout />,
              children: [
                {
                  children: [
                    {
                      path: routes.signup,
                      element: <Signup />,
                    },
                    {
                      path: routes.home,
                      element: <Home />,
                    },
                    {
                      path: routes.my.default,
                      element: <My />,
                    },
                    {
                      path: routes.my.setting(),
                      element: <MySetting />,
                    },
                    {
                      path: routes.my.contact(),
                      element: <Contact />,
                    },
                    {
                      path: routes.my.rename(),
                      element: <Rename />,
                    },
                    {
                      path: routes.setupIntro(),
                      element: <SetupIntro />,
                    },
                    {
                      path: routes.rollingpaper.setup(),
                      element: <RollingpaperSetup />,
                    },
                    {
                      path: routes.rollingpaper.form(),
                      element: <RollingpaperForm />,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          element: <Layout />,
          children: [
            {
              path: routes.rollingpaper.detail(),
              element: <RollingpaperDetail />,
            },
          ],
        },
      ],
    },
  ]);

export default router;
