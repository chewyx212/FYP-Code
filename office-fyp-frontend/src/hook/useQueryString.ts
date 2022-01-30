import { useLocation } from 'react-router';
export const useQueryString = () => {
 const location = useLocation();
 return new URLSearchParams(location.search);
}