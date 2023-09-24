import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { Pagination } from "@mantine/core";
import Item from "./Item";
import storage from "../../storage/films.json";
import { Link } from "react-router-dom";
import { useUserStorage } from "../../storage/userStorage";

function List({ searchString, expression }: any) {
  const pageSize = useRef(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredStorage, setFilteredStorage] = useState(storage);
  const { name, handleLogout } = useUserStorage();

  const filterFilm = useCallback(() => {
    if (
      !searchString &&
      expression.industry === "default" &&
      !expression.ratingFrom &&
      !expression.ratingTo
    ) {
      return storage;
    }

    return storage.filter(
      ({ title, category, grade }) =>
        title.toLowerCase().includes(searchString.toLowerCase()) &&
        (expression.industry === "default" ||
          category === expression.industry) &&
        (!expression.ratingFrom || grade >= expression.ratingFrom) &&
        (!expression.ratingTo || grade <= expression.ratingTo)
    );
  }, [searchString, expression]);

  useEffect(() => {
    setFilteredStorage(filterFilm());
  }, [searchString, expression, filterFilm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredStorage, searchString, expression]);

  const paginatedList = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize.current;
    const endIndex = startIndex + pageSize.current;
    return filteredStorage.slice(startIndex, endIndex);
  }, [filteredStorage, currentPage]);

  const handlePageChange = useCallback((page: React.SetStateAction<number>) => {
    setCurrentPage(page);
  }, []);

  return (
    <>
      {paginatedList.map((el, index) => (
        <Item key={index} filmItem={el} />
      ))}

      <Pagination
        total={Math.ceil(filteredStorage.length / pageSize.current)}
        value={currentPage}
        onChange={handlePageChange}
        position="center"
      />
    </>
  );
}

export default List;
