import { buildPreviewUrl } from "./buildPreviewUrl";
import css from "./LivePreview.module.css";

interface Props {
  locale: string;
  previewPath: string;
}

export const LivePreview = ({ locale, previewPath }: Props) => {
  if (previewPath) {
    return (
      <div className={css.MobileFrame}>
        <iframe src={buildPreviewUrl(previewPath, locale)} />
      </div>
    );
  }

  return (
    <div className={css.MobileFrame}>
      <p className={css.NoPreview}>No preview available!</p>
    </div>
  );
};
