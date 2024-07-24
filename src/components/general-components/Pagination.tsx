import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
interface PaginationProps {
  businessesPerPage: number;
  totalBusinesses: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination = ({
  businessesPerPage,
  totalBusinesses,
  paginate,
  currentPage,
}: PaginationProps) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalBusinesses / businessesPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <ShadcnPagination className="">
      <PaginationPrevious
        className="cursor-pointer"
        onClick={() => currentPage > 1 && paginate(currentPage - 1)}
      />
      <PaginationContent>
        {pageNumbers.map((number) => (
          <PaginationItem key={number}>
            <PaginationLink
              className="cursor-pointer"
              isActive={number === currentPage}
              onClick={() => paginate(number)}
            >
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}
        {pageNumbers.length > 5 && <PaginationEllipsis />}
      </PaginationContent>
      <PaginationNext
        className="cursor-pointer"
        onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
      />
    </ShadcnPagination>
  );
};

export default Pagination;
