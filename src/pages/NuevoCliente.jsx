import { useNavigate, Form, useActionData, redirect } from "react-router-dom";
import Formulario from "../components/Formulario";
import Error from "../components/Error";
import Swal from "sweetalert2";

//Fetch Data Clientes
import { crearCliente } from "../data/clientes";

//Funcion para Formulario
export async function action({ request }) {
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

  //Crear el cliente
  const resultado = await crearCliente(datos);
  console.log(resultado);

  //Mostrar mensaje de exito o error swal2
  if (resultado.success) {
    Swal.fire("Correcto", "El cliente se registró correctamente", "success");
  } else {
    Swal.fire("Error", "El cliente no se pudo registrar", resultado.error);
  }

  //Redireccionar
  return redirect("/");
}

const NuevoCliente = () => {
  //Hook para redireccionar
  const navigate = useNavigate();

  //Obtener los datos del action
  const errores = useActionData();

  return (
    <>
      <div className="font-black text-4xl text-blue-900">Nuevo Cliente</div>
      <p className=" mt-3">Llena el formulario para crear un nuevo cliente</p>

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
          <Formulario />

          {/*Submit Cliente*/}
          <input
            type="submit"
            className="bg-blue-800 w-full py-2 p-4 mt-5 inline-block text-white rounded text-sm hover:bg-gray-800 uppercase"
            value="Registrar Cliente"
          />
        </Form>
      </div>
    </>
  );
};

export default NuevoCliente;
