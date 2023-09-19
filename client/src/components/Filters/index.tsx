import React, { useState } from 'react';
import style from './style.module.css';
import { Input, Button } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import storage from '../../storage/category.json';

interface Expression {
  industry: string;
  ratingFrom: string;
  ratingTo: string;
}

function Filters({ setExpression }: { setExpression: (expression: Expression) => void }) {
  const [navigation, setNavigation] = useState<Expression>({ industry: 'default', ratingFrom: '', ratingTo: '' });

  function changeFiltersState(event: { target: { name: string; value: string; }; }) {
    const { name, value } = event.target;
    setNavigation((prevNavigation) => ({
      ...prevNavigation,
      [name]: value === 'default' ? '' : value,
    }));
  }

  function setDefault() {
    setNavigation({ industry: 'default', ratingFrom: '', ratingTo: '' });
    setExpression({ industry: 'default', ratingFrom: '', ratingTo: '' });
  }

  return (
    <div className={style.wrapper}>
      <div className={style.flex}>
        <h2>Фильтры</h2>
        <p onClick={setDefault}>Сбросить все</p>
      </div>

      <div className={style.industry}>
        <h3>Категория</h3>
        <Input
          size="lg"
          name="industry"
          component="select"
          value={navigation.industry}
          onChange={changeFiltersState}
          rightSection={<IconChevronDown />}
        >
          <option value="default">Выберите категорию</option>
          {storage.map((el, index) => (
            <option key={index} value={el.category}>
              {el.category}
            </option>
          ))}
        </Input>
      </div>

      <div className={style.rating}>
        <h3>Рейтинг</h3>

        <div className={style.selectors}>
          <Input
            value={navigation.ratingFrom}
            type="number"
            size="lg"
            className={style['search-inp']}
            placeholder="От"
            name="ratingFrom"
            onChange={changeFiltersState}
          />
          <Input
            value={navigation.ratingTo}
            type="number"
            size="lg"
            className={style['search-inp']}
            placeholder="До"
            name="ratingTo"
            onChange={changeFiltersState}
          />
        </div>
      </div>

      <Button onClick={() => setExpression(navigation)} className={style.btn} size="lg">
        Применить
      </Button>
    </div>
  );
}

export default Filters;
