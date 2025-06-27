import { useEffect } from "react";

function useClickOutside(ref, handler) {
	const handleClickOutside = (event) => {
		if (ref.current && !ref.current.contains(event.target)) {
			handler(event);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref, handler]);
}

export default useClickOutside;
