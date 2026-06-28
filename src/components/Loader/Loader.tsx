import css from './Loader.module.css';

function Loader() {
  return (
    <div className={css.wrapper} role="status" aria-label="Loading">
      <span className={css.spinner}></span>
    </div>
  );
}

export default Loader;
