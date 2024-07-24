import { useState, useEffect } from "react";
import { getBusinesses } from "../services/business.service";
import { Business } from "../types";
import BusinessDialog from "../components/general-components/BusinessDialog";
import StarRating from "../components/general-components/StarRanking";
import SearchForm from "../components/general-components/Search";
import { useSearchParams } from "react-router-dom";
import Pagination from "../components/general-components/Pagination";
import noResultsImage from "../images/upset-mag.webp";
import {
  Cable,
  Cat,
  Cross,
  Dumbbell,
  House,
  Rows4,
  Sandwich,
  Shirt,
} from "lucide-react";
const categories = [
  { name: "All Categories", icon: <Rows4 /> },
  { name: "Food & Drink", icon: <Sandwich /> },
  { name: "Electronics", icon: <Cable /> },
  { name: "Health & Fitness", icon: <Cross /> },
  { name: "Fashion", icon: <Shirt /> },
  { name: "Pets", icon: <Cat /> },
  { name: "Sports & Outdoors", icon: <Dumbbell /> },
  { name: "Home", icon: <House /> },
];

function BusinessPage() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalBusinesses, setTotalBusinesses] = useState(0);
  const businessesPerPage = 5;

  useEffect(() => {
    async function fetchBusinesses() {
      try {
        setIsLoading(true);
        const name = searchParams.get("name") || "";
        const category = searchParams.get("category") || "";
        const minRating = searchParams.get("minRating") || "";
        const response = await getBusinesses(
          currentPage,
          name,
          category,
          minRating
        );
        setBusinesses(response.data.business);
        setTotalBusinesses(response.data.totalBusinesses);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching businesses:", error);
        setIsLoading(false);
      }
    }

    fetchBusinesses();
  }, [searchParams, currentPage]);

  function handleBusinessClick(business: Business) {
    setSelectedBusiness(business);
    setIsDialogOpen(true);
  }

  function handleCloseDialog() {
    setIsDialogOpen(false);
    setSelectedBusiness(null);
  }

  function handleUpdateBusiness(updatedBusiness: Business) {
    setBusinesses((prevBusinesses) =>
      prevBusinesses.map((b) =>
        b._id === updatedBusiness._id ? updatedBusiness : b
      )
    );
  }

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="bg-gray-100 h-[150vh] py-4">
      <SearchForm categories={categories} />
      <div className="flex px-52 p-4">
        <div>
          {isLoading ? (
            <div>Loading...</div>
          ) : businesses.length === 0 ? (
            <div className="text-center mt-8">
              <p className="text-3xl mt-10">No businesses found 😔</p>
              <p className="text-3xl mt-10">
                Feel free to search for something else...
              </p>
              <img
                src={noResultsImage}
                alt="No businesses found"
                className="m-auto"
              />
            </div>
          ) : (
            <div className="space-y-5">
              {businesses.map((business) => (
                <div
                  key={business._id}
                  className="max-w-[70rem] w-[70rem] h-36 max-h-36 shadow hover:shadow-2xl transition duration-300 ease-in-out cursor-pointer flex flex-col bg-gray-50"
                  onClick={() => handleBusinessClick(business)}
                >
                  <div className="flex">
                    <img
                      src={business.imageUrl}
                      alt={business.name}
                      className="w-[200px] h-36 mr-20"
                    />
                    <div className="pt-6">
                      <h2 className="font-bold">{business.name}</h2>
                      <div className="text-xs text-gray-400 pb-2">
                        {business.category}
                      </div>
                      <div className="max-w-52">
                        <p className="text-gray-500 text-xs ">
                          {business.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex">
                      <StarRating stars={business.stars} readOnly />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {businesses.length > 0 && (
        <Pagination
          businessesPerPage={businessesPerPage}
          totalBusinesses={totalBusinesses}
          paginate={paginate}
          currentPage={currentPage}
        />
      )}
      {selectedBusiness && (
        <BusinessDialog
          business={selectedBusiness}
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
          onUpdateBusiness={handleUpdateBusiness}
        />
      )}
    </div>
  );
}

export default BusinessPage;
