import { useEffect } from "react";

const usePageMetadata = (title: string): void => {
	useEffect(() => {
		document.title = title;
	}, [title]); // Runs only when title changes
};

export default usePageMetadata;
