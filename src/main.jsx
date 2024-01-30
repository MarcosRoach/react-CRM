import React from "react";
import ReactDOM from "react-dom/client";

//Components
import Layout from "./components/Layout";
import Home, { loader as clientesLoader } from "./pages/Home";
import NuevoCliente, {
  action as nuevoClienteAction,
} from "./pages/NuevoCliente";
import ErrorPage from "./components/ErrorPage";
import EditarClientes, {
  loader as clienteEditaLoader,
  action as editarClienteAction,
} from "./pages/EditarClientes";
import { action as eliminarClienteAction } from "./components/Cliente";

//Router Dependencies
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: clientesLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: "clientes/nuevo",
        element: <NuevoCliente />,
        action: nuevoClienteAction,
        errorElement: <ErrorPage />,
      },
      {
        path: "clientes/:clienteId/editar",
        element: <EditarClientes />,
        loader: clienteEditaLoader,
        action: editarClienteAction,
        errorElement: <ErrorPage />,
      },
      {
        path: "/clientes/:clienteId/eliminar",
        action: eliminarClienteAction,
      },
    ],
  },
]);

//Css
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
