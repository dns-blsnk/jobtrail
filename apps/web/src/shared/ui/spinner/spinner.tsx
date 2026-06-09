import styles from './spinner.module.scss';

export function Spinner() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.spinner} role="status" aria-label="Loading" />
    </div>
  );
}
