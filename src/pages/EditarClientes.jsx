import {
  useNavigate,
  Form,
  useActionData,
  redirect,
  useLoaderData,
} from "react-router-dom";
import Formulario from "../components/Formulario";
import Error from "../components/Error";
import Swal from "sweetalert2";

//Fetch Data Cliente
import { getClienteId, editarCliente } from "../data/clientes";

//Funcion para Formulario de Edicion
export async function action({ request, params }) {
  const formData = await request.formData();

  //Obtener datos del formulario
  const datos = Object.fromEntries(formData);

  //Validar datos
  const errores = [];
  if (Object.values(datos).includes("")) {
    errores.push("Todos los campos son obligatorios");
  }

  //Validar email
  const emailRegex = /\S+@\S+\.\S+/;
  const emailValido = formData.get("email");
  if (!emailRegex.test(emailValido)) {
    errores.push("Email no válido");
  }
  //Retornar los errores
  if (errores.length) {
    return errores;
  }

  //Editar el cliente
  const resultado = await editarCliente(params.clienteId, datos);

  //Mostrar mensaje de exito o error swal2
  if (resultado.success) {
    Swal.fire("Correcto", "El cliente se editó correctamente", "success");
  } else {
    Swal.fire("Error", "El cliente no se pudo editar", "error");
  }

  //Redireccionar
  return redirect("/");
}

//Loader
export async function loader({ params }) {
  const cliente = await getClienteId(params.clienteId);

  //COMPROBAR SI EL CLIENTE EXISTE O NO
  if (Object.values(cliente).length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "El cliente no existe",
    });
  }

  return cliente;
}

const EditarClientes = () => {
  //Hook para redireccionar
  const navigate = useNavigate();

  //Hook Obteniendo los datos del loader
  const cliente = useLoaderData();

  //Obtener los datos del action
  const errores = useActionData();

  return (
    <>
      <div className="font-black text-4xl text-blue-900">Edita Cliente</div>
      <p className=" mt-3">Modificar datos del cliente</p>

      <div className="flex justify-end">
        <button
          className="bg-blue-800 py-2 px-4 mt-5 inline-block text-white rounded text-sm hover:bg-gray-800 uppercase"
          onClick={() => navigate("/")}
        >
          Volver
        </button>
      </div>

      <div className=" bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">
        {/* Mostrar mensaje de error */}
        {errores?.length &&
          errores.map((error, i) => <Error key={i}>{error}</Error>)}

        {/* Formulario */}

        <Form method="POST">
          {/* Formulario */}
          <Formulario cliente={cliente} />

          {/*Submit Cliente*/}
          <input
            type="submit"
            className="bg-blue-800 w-full py-2 p-4 mt-5 inline-block text-white rounded text-sm hover:bg-gray-800 uppercase"
            value="Guardar Cambios"
          />
        </Form>
      </div>
    </>
  );
};

export default EditarClientes;
