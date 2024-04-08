import styles from "./loading.module.css";

type LoadingProps = {
  className: string;
};

export default function Loading({ className }: LoadingProps) {
  return (
    <div className={styles.loader}>
      <div className={`${className} ${styles.bar1}`}></div>
      <div className={`${className} ${styles.bar2}`}></div>
      <div className={`${className} ${styles.bar3}`}></div>
      <div className={`${className} ${styles.bar4}`}></div>
      <div className={`${className} ${styles.bar5}`}></div>
      <div className={`${className} ${styles.bar6}`}></div>
      <div className={`${className} ${styles.bar7}`}></div>
      <div className={`${className} ${styles.bar8}`}></div>
      <div className={`${className} ${styles.bar9}`}></div>
      <div className={`${className} ${styles.bar10}`}></div>
      <div className={`${className} ${styles.bar11}`}></div>
      <div className={`${className} ${styles.bar12}`}></div>
    </div>
  );
}
