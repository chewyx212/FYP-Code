import { logout } from 'app/auth/authSlice';
import { useAppDispatch } from '../../app/hooks';


export const UnauthorizedHandler = () => {
    const dispatch = useAppDispatch()
    dispatch(logout());
};
