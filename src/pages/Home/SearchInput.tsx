import React, { FC, useState, useCallback, useEffect } from 'react';
import { useDebounce } from 'use-debounce';

import Input from '../../components/Input';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchStudents } from '../../redux/students';

const SearchInput: FC = () => {
  const dispatch = useAppDispatch();
  const { limit } = useAppSelector((state) => state.students);

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value);
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm.length === 0 || debouncedSearchTerm.length >= 3) {
      dispatch(fetchStudents({ searchTerm: debouncedSearchTerm, page: 1, limit, reset: true }));
    }
  }, [dispatch, debouncedSearchTerm, limit]);

  return (
    <Input
      name="search"
      placeholder="Search by name..."
      value={searchTerm}
      onChange={handleChange}
    />
  )
};

export default SearchInput;
