import LogoutIcon from "../svg-icons/logouticon";
import useAuthStore from "../../store/auth.store"
import { useNavigate } from "react-router-dom";
import NO_AVATAR_IMG from '../../assets/img/no-avatar.svg'
import { prettyPhoneNumber } from "../../utils/phonenumber_utils";
import type { UserType } from "../../types/types";


export default function ProfilePage() {
    const { loggedIn, userData, logout } = useAuthStore();

    return (
        <>
            {!loggedIn ? 
                <p style={{fontSize: '1.25em'}}>Авторизуйтесь, чтобы перейти в свой профиль.</p> : 
                <div className="profile-page">
                    <UserCard userData={userData} logout={logout}/>
                </div>
            }
        </>
    )
}



type UserCardPropsType = {
    userData: UserType | null,
    logout: () => void,
}

function UserCard({userData, logout}: UserCardPropsType) {
    const navigate = useNavigate();

    const phone: string = userData?.phone || '';

    function onLogout() {
        navigate('/');
        logout();
    }

    return (
        <div className="user-card">
                <div className="avatar-wrapper">
                    <img src={NO_AVATAR_IMG} alt='user-avater'/>
                </div>
                <div className="user-info-wrapper">
                    <div className="user-info">
                        <p className="user-name">{userData?.name}</p>
                        <p className="user-phone">{prettyPhoneNumber(phone)}</p>
                    </div>
                    <div className='user-actions' onClick={onLogout}>
                        <LogoutIcon />
                        <span>Выйти</span>
                    </div>
                </div>
            </div>
    )
}