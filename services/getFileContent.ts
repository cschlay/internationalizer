import { formatPreviewUrl } from "../utils/formatPreviewUrl";
import { TranslationFileContent } from "../types";

/**
 * Retrieves the file content and parses the preview urls.
 */
const getFileContent = async (filepath: string): Promise<ResponseData> => {
  const url: string = `/api/get-file-content?file=${encodeURIComponent(
    filepath
  )}`;

  const response: Response = await fetch(url);
  const content: TranslationFileContent = await response.json();

  let previewUrl: string = "";
  if (content.docstring) {
    const { stories, previews } = content.docstring;
    if (stories.length) {
      previewUrl = stories[0];
    } else {
      previewUrl = previews[0];
    }
  }

  return {
    data: content,
    previewUrl: formatPreviewUrl(previewUrl),
  };
};

interface ResponseData {
  data: TranslationFileContent;
  previewUrl: string;
}

export default getFileContent;
