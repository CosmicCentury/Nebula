import React, { useEffect, useState } from "react";

interface useDocumentTitleProps {
  title: string;
}

interface useDocumentTitleResult {
  documentTitle: string;
  setDocumentTitle: React.Dispatch<React.SetStateAction<string>>;
}

const useDocumentTitle = (title?: string) => {
  const [documentTitle, setDocumentTitle] = useState(title);
  useEffect(() => {
    document.title = documentTitle ?? "";
  }, [documentTitle]);

  return { documentTitle, setDocumentTitle } as useDocumentTitleResult;
};

export default useDocumentTitle;
