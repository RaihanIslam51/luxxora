import { useLocation } from "react-router-dom";

const GenericPage = () => {
  const location = useLocation();

  return (
    <div className="pt-20 px-6 text-center">
      <h1 className="text-3xl font-bold text-gray-800">Page: {location.pathname}</h1>
      <p className="text-gray-500 mt-4">This is a placeholder for {location.pathname}.</p>
    </div>
  );
};

export default GenericPage;
