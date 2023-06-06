import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `${title}-Phonetics`;
  }, [title]);
};

export default useTitle;
