import { formatPreviewUrl } from "../utils/formatPreviewUrl";
import { TranslationFileContent } from "../types";

/**
 * Retrieves the file content and parses the preview urls.
 */
const getFileContent = async (
  filepath: string,
  previewLanguage: string
): Promise<ResponseData> => {
  const url: string = `/api/get-file-content?file=${encodeURIComponent(
    filepath
  )}`;

  const response: Response = await fetch(url);
  const content: TranslationFileContent = await response.json();

  let previewUrl: string = "";
  if (content.docstring) {
    const { storybookUrls, previewUrls } = content.docstring;
    if (storybookUrls.length) {
      previewUrl = storybookUrls[0];
    } else {
      previewUrl = previewUrls[0];
    }
  }

  return {
    data: content,
    previewUrl: formatPreviewUrl(previewUrl, previewLanguage),
  };
};

interface ResponseData {
  data: TranslationFileContent;
  previewUrl: string;
}

export default getFileContent;
