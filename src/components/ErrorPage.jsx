import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-5xl font-black text-red-800">Error</h1>
        <p className="text-2xl mt-5">Hubo un error</p>
        <p className="text-1xl mt-5 text-gray-600">
          {error.statusText || error.message}
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
