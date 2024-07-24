import { Link } from "react-router-dom";
import { Button } from "../components/ui/button"; // Assuming you have a Button component in your ui directory
import image from "../images/404Image.jpg";

function NotFoundPage() {
  return (
    <div
      className="flex flex-col items-center min-h-screen bg-gray-100 p-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="bg-white bg-opacity-75 p-8 rounded-lg shadow-lg mt-16">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Oops! Page Not Found
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link className="text-center flex justify-center" to="/">
          <Button className="bg-blue-500 text-white px-4 py-2 rounded">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
