import s from './spinner.module.scss';

export function Spinner() {
  return (
    <div className={s.wrapper}>
      <div className={s.spinner} role="status" aria-label="Loading" />
    </div>
  );
}
