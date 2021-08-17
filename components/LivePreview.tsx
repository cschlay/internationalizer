import styles from "./LivePreview.module.css";

interface Props {
  languageCode: string;
  previewUrl: string;
}

export const LivePreview = ({ languageCode, previewUrl }: Props) => {
  if (previewUrl) {
    return (
      <div className={styles.MobileFrame}>
        <iframe src={`${previewUrl}lang=${languageCode}`} />
      </div>
    );
  }

  return (
    <div className={styles.MobileFrame}>
      <p className={styles.NoPreview}>No preview available.</p>
    </div>
  );
};
