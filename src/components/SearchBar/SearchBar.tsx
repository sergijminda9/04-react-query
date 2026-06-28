import toast from 'react-hot-toast';
import css from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

function SearchBar({ onSubmit }: SearchBarProps) {
  const handleAction = (formData: FormData): void => {
    const query = (formData.get('query') as string).trim();

    if (!query) {
      toast.error('Please enter your search query.');
      return;
    }

    onSubmit(query);
  };

  return (
    <form className={css.form} action={handleAction}>
      <input
        className={css.input}
        type="text"
        name="query"
        autoComplete="off"
        placeholder="Search movies"
      />
      <button className={css.button} type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
