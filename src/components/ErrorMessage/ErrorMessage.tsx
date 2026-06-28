import css from './ErrorMessage.module.css';

interface ErrorMessageProps {
  message?: string;
}

const DEFAULT_MESSAGE = 'Something went wrong. Please try again.';

function ErrorMessage({ message = DEFAULT_MESSAGE }: ErrorMessageProps) {
  return <p className={css.message}>{message}</p>;
}

export default ErrorMessage;
