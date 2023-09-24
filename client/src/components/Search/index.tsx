import React, { useState } from 'react';
import { Input, Button } from '@mantine/core';
import style from './style.module.css';
import { IconSearch } from '@tabler/icons-react';

interface ISearchProps {
  setSearchString: (searchString: string) => void;
}

function Search({ setSearchString }: ISearchProps) {
  const [input, setInput] = useState('');

  return (
    <div className={style['wrapper']}>
      <Input
        size="xl"
        className={style['search-inp']}
        icon={<IconSearch />}
        onChange={(event) => setInput(event.target.value)}
        placeholder="something concrete"
        rightSection={
          <Button onClick={() => setSearchString(input)} className={style['search-btn']}>
            Поиск
          </Button>
        }
      />

    </div>
  );
}

export default Search;
