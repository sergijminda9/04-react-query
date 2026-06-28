import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import css from './SearchForm.module.css';

interface SearchFormProps {
  onSubmit: (query: string) => void;
}

function SearchForm({ onSubmit }: SearchFormProps) {
  const [value, setValue] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const trimmedValue = value.trim();
    if (!trimmedValue) {
      return;
    }

    onSubmit(trimmedValue);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        className={css.input}
        type="text"
        name="query"
        autoComplete="off"
        placeholder="Search movies"
        value={value}
        onChange={handleChange}
      />
      <button className={css.button} type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchForm;
