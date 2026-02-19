import { createBrowserRouter, Navigate } from 'react-router';

import Layout from '@app/layout';
import { ResumePage } from '@pages/resume';
import { EditorPage } from '@pages/editor';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/resume" replace />,
      },
      {
        path: '/resume',
        element: <ResumePage />,
      },
      {
        path: '/editor',
        element: <EditorPage />,
      },
    ],
  },
]);
