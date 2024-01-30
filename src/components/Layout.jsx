import { Outlet, useLocation, Link } from "react-router-dom";

const Layout = () => {
  // Variable que almacena la ruta actual
  const location = useLocation();

  return (
    <div className="md:flex md:min-h-screen">
      <aside className="md:w-1/4 bg-blue-900 px-5 py-10">
        <h2 className="text-3xl font-black text-center text-white">
          CRM - Clientes
        </h2>
        <nav className="mt-10">
          <Link
            className={`${
              location.pathname === "/" ? "bg-blue-300" : ""
            } text-2xl block mt-2 hover:bg-blue-300 p-2 text-white font-bold`}
            to="/"
          >
            Clientes
          </Link>
          <Link
            className={`${
              location.pathname === "/clientes/nuevo" ? "bg-blue-300" : ""
            } text-2xl block mt-2 hover:bg-blue-300 p-2 text-white font-bold`}
            to="/clientes/nuevo"
          >
            Nuevo Cliente
          </Link>
        </nav>
      </aside>

      <main className="md:w-3/4 p-10 md:h-screen overflow-scroll">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
