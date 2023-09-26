import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { Pagination } from "@mantine/core";
import { useGetReviewQuery } from "../../services/review";
import Item from "./Item";

function List({ searchString, expression }: any) {
  const pageSizeRef = useRef(4);
  const [currentPage, setCurrentPage] = useState(1);
  interface IReview {
    id: number;
    title: string;
    name: string;
    category: string;
    description: string;
    grade: number;
    genre: string;
    imageLink: string;
  }
  const { data: review } = useGetReviewQuery({});
  let data: IReview[] = [];
  if (review) {
    data = review;
  }


  const [filteredStorage, setfilteredStorage] = useState<IReview[]>(data);

  const filterReview = (() => {
    if (!searchString  && expression.industry === "default" &&
      !expression.ratingFrom &&
      !expression.ratingTo) {
      return review;
    }
    return review.filter(
      (review: IReview) =>
        review.title.toLowerCase().includes(searchString.toLowerCase()) &&
        (expression.industry === "default" ||
          review.category === expression.industry) &&
        (!expression.ratingFrom || review.grade >= expression.ratingFrom) &&
        (!expression.ratingTo || review.grade <= expression.ratingTo)
    );
  });

  useEffect(() => {
    setfilteredStorage(filterReview());
  }, [searchString, expression, filterReview]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredStorage, searchString, expression]);


  const paginatedList = useMemo(
    () =>
      filteredStorage?.slice(
        (currentPage - 1) * pageSizeRef.current,
        currentPage * pageSizeRef.current
      ) || [],
    [filteredStorage, currentPage]
  );

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return (
    <>
      {paginatedList.map((el: any, index: any) => (
        <Item key={index} filmItem={el} />
      ))}

      <Pagination
        total={Math.ceil(filteredStorage?.length / pageSizeRef.current) || 0}
        value={currentPage}
        onChange={handlePageChange}
        position="center"
      />
    </>
  );
}

export default List;