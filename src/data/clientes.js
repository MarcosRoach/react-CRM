//Funcion para obtener los clientes
export async function getClientes() {
  const respuesta = await fetch(import.meta.env.VITE_API_URL);
  const resultado = await respuesta.json();

  return resultado;
}

//Funcion para crear un cliente
export async function crearCliente(cliente) {
  try {
    const respuesta = await fetch(import.meta.env.VITE_API_URL, {
      method: "POST",
      body: JSON.stringify(cliente),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Verificar si la respuesta es exitosa
    if (respuesta.ok) {
      const resultado = await respuesta.json();
      return { success: true, data: resultado };
    } else {
      // Si la respuesta no es exitosa, lanzar un error con el status
      throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
    }
  } catch (error) {
    // Devolver un objeto con success: false y el mensaje de error
    return { success: false, error: error.message };
  }
}

//Funcion para obtener Cliente a editar
export async function getClienteId(clienteID) {
  const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${clienteID}`);
  const resultado = await respuesta.json();

  return resultado;
}

//Funcion para editar un cliente
export async function editarCliente(id, datos) {
  try {
    const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify(datos),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Verificar si la respuesta es exitosa
    if (respuesta.ok) {
      const resultado = await respuesta.json();
      return { success: true, data: resultado };
    } else {
      // Si la respuesta no es exitosa, lanzar un error con el status
      throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
    }
  } catch (error) {
    // Devolver un objeto con success: false y el mensaje de error
    return { success: false, error: error.message };
  }
}

//Funcion para eliminar un cliente
export async function eliminarCliente(id) {
  try {
    const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
      method: "DELETE",
    });

    // Verificar si la respuesta es exitosa
    if (respuesta.ok) {
      const resultado = await respuesta.json();
      return { success: true, data: resultado };
    } else {
      // Si la respuesta no es exitosa, lanzar un error con el status
      throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
    }
  } catch (error) {
    // Devolver un objeto con success: false y el mensaje de error
    return { success: false, error: error.message };
  }
}
