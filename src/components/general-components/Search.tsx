import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "../ui/input";
import { Star } from "lucide-react";

interface SearchFormProps {
  categories: object[];
}

const ratings = [
  { value: "", label: "Any" },
  { value: "3", label: "3.0+" },
  { value: "4", label: "4.0+" },
  { value: "4.5", label: "4.5+" },
];

const SearchForm = ({ categories }: SearchFormProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("name") || "");
  const [currentCategory, setCurrentCategory] = useState(
    searchParams.get("category") || ""
  );
  const [minRating, setMinRating] = useState(
    searchParams.get("minRating") || ""
  );

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params: { [key: string]: string } = {};
      if (searchTerm) params.name = searchTerm;
      if (currentCategory) params.category = currentCategory;
      if (minRating) params.minRating = minRating;
      setSearchParams(params);
    }, 300); // 300ms debounce delay

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, currentCategory, minRating, setSearchParams]);

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4 my-4 px-4 lg:px-24 xl:px-52">
        <Input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded"
        />
        <div className="flex gap-2">
          {ratings.map((rating) => (
            <button
              key={rating.value}
              className={`p-2 border rounded ${
                minRating === rating.value ? "bg-blue-200" : ""
              }`}
              onClick={() => setMinRating(rating.value)}
            >
              <span className=" flex items-center gap-2">
                <Star className="h-4 w-4" />
                {rating.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between gap-1 space-x-2">
        {categories.map((category) => {
          if (currentCategory === category.name) {
            return (
              <button
                type="button"
                className="mb-4 p-4 w-52 h-20 shadow-2xl transition duration-300 ease-in-out cursor-pointer flex flex-col bg-white justify-center items-center"
                onClick={() =>
                  setCurrentCategory(
                    category.name === "All Categories" ? "" : category.name
                  )
                }
              >
                <h1 className="mb-2">{category.name}</h1>
                <div>{category.icon}</div>
              </button>
            );
          } else {
            return (
              <button
                type="button"
                className="mb-4 border border-gray-200 p-4 w-52 h-20 hover:shadow-2xl transition duration-300 ease-in-out cursor-pointer flex flex-col bg-gray-50 justify-center items-center"
                onClick={() =>
                  setCurrentCategory(
                    category.name === "All Categories" ? "" : category.name
                  )
                }
              >
                <h1 className="text-gray-400 mb-2">{category.name}</h1>
                <div className="text-gray-400">{category.icon}</div>
              </button>
            );
          }
        })}
      </div>
    </>
  );
};

export default SearchForm;
