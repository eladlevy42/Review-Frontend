import { Business } from "@/types";

interface BusinessListProps {
  businesses: Business[];
  onBusinessClick: (business: Business) => void;
}

function BusinessList(props: BusinessListProps) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Business List</h1>
      <ul className="space-y-4">
        {props.businesses.map(function (business) {
          return (
            <li
              key={business._id}
              className="p-4 border rounded-lg shadow cursor-pointer"
              onClick={() => props.onBusinessClick(business)}
            >
              <h2 className="text-xl font-semibold">{business.name}</h2>
              <p className="mt-2">{business.description}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default BusinessList;
