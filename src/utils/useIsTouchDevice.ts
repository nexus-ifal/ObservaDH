import { useEffect, useState } from "react";

export const useIsTouchDevice = () => {
	const [isTouch, setIsTouch] = useState(false);

	useEffect(() => {
		const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
		setIsTouch(hasTouch);
	}, []);

	return isTouch;
};
