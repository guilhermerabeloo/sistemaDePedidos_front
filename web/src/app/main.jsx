import React from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Produtos from './produtos/Produtos.jsx'
import Clientes from './clientes/Clientes.jsx'
import Entrega from './pedidos/entrega/entrega.jsx'
import ErrorPage from '../components/ErrorPage.jsx'
import App from './App.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/produtos',
        element: <Produtos />
      },
      {
        path: '/clientes',
        element: <Clientes />
      },
      {
        path: '/pedidos',
        children: [
          {
            path: 'entrega', 
            element: <Entrega />
          },
        ]
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
