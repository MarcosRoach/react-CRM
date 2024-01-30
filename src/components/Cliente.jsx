import { Form, useNavigate, redirect } from "react-router-dom";
import { eliminarCliente } from "../data/clientes";
import Swal from "sweetalert2";

//Action
export async function action({ params }) {
  const resultado = await eliminarCliente(params.clienteId);

  console.log(resultado);

  //Mensaje de exito
  if (resultado.success) {
    Swal.fire("Correcto", "El cliente se eliminó correctamente", "success");
  } else {
    Swal.fire("Error", "El cliente no se pudo eliminar", resultado.error);
  }

  return redirect("/");
}

const Cliente = ({ cliente }) => {
  //Hook para redireccionar
  const navigate = useNavigate();

  return (
    <tr className="border-b" key={cliente.id}>
      <td className="p-6 space-y-2">
        <p className="text-2xl text-gray-800">{cliente.nombre}</p>
        <p className="text-1xl text-gray-800">{cliente.empresa}</p>
      </td>
      <td className=" px-4 py-2">
        <p className="text-gray-700">
          {" "}
          <span className="text-gray-800 uppercase font-bold">
            Email:{" "}
          </span>{" "}
          {cliente.email}
        </p>
        <p className="text-gray-700">
          {" "}
          <span className="text-gray-800 uppercase font-bold">
            Telefono:{" "}
          </span>{" "}
          {cliente.telefono}
        </p>
      </td>
      <td className=" p-6 flex gap-3 justify-center">
        <button
          type="button"
          className="text-blue-600 hover:text-blue-700 uppercase font-bold text-xs"
          onClick={() => navigate(`/clientes/${cliente.id}/editar`)}
        >
          Editar
        </button>

        <Form
          method="POST"
          action={`/clientes/${cliente.id}/eliminar`}
          onSubmit={(e) => {
            if (!confirm("¿Estás seguro que deseas eliminar el cliente?")) {
              e.preventDefault();
            }
          }}
        >
          <button
            type="submit"
            className="text-red-600 hover:text-red-700 uppercase font-bold text-xs ml-2"
          >
            Eliminar
          </button>
        </Form>
      </td>
    </tr>
  );
};

export default Cliente;
