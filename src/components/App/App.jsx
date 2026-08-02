import { HomePage, CatalogPage, QuizePage } from '../../pages';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../Layout/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'quizes', element: <CatalogPage /> },
      { path: 'quizes/:quizeId', element: <QuizePage /> }

      // { path: '*', element: <NotFoundPage /> }
    ]
  }
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
