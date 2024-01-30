//Hook Loader
import { useLoaderData } from "react-router-dom";

//Componentes
import Cliente from "../components/Cliente";

//Fetch Data Clientes
import { getClientes } from "../data/clientes";

//Exportar loader - se ejecuta mientras se carga la pagina
export function loader() {
  const clientes = getClientes();

  return clientes;
}

const Home = () => {
  //Obtener datos del loader
  const clientes = useLoaderData();

  return (
    <>
      <div className="font-black text-4xl text-blue-900">Clientes</div>
      <p className=" mt-3">Administra los Clientes</p>

      {/* Mostrar los Clientes */}
      {clientes.length ? (
        <table className="w-full bg-white shadow mt-5 table-auto">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="p-2">Cliente</th>
              <th className="p-2">Contacto</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>

          {/* Mostrar los clientes */}
          <tbody>
            {clientes.map((cliente) => (
              <Cliente cliente={cliente} key={cliente.id} />
            ))}
          </tbody>
        </table>
      ) : (
        <p className="mt-5 text-center text-2xl">No hay Clientes</p>
      )}
    </>
  );
};

export default Home;
