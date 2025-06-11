import React from 'react'
import CrossIcon from '../components/svg-icons/crossicon'
import PhoneNumberInput from './PhoneNumberInput'
import type { ActionFunctionArgs } from 'react-router-dom'
import { useFetcher } from 'react-router-dom'
import { formatPhoneNumber } from '../utils/phonenumber_utils'
import type { UserType } from '../types/types'
import useAuthStore from '../store/auth.store'
import { fetchUsers_fb } from '../firebase_api'


type AuthPropsType = {
    isActive: boolean,
    closeModal: () => void, 
}

const START_MESSAGE = 'Введите свой номер телефона и пароль для авторизации.';


export default function Auth({isActive, closeModal}: AuthPropsType) {
    const fetcher = useFetcher();
    const { loggedIn, login } = useAuthStore();

    const [message, setMessage] = React.useState(START_MESSAGE);
    const [error, setError] = React.useState(null);

    const [phone, setPhone] = React.useState('');
    const [password, setPassword] = React.useState('');

    React.useEffect(() => {
        if (!isActive) {
            const timer = setTimeout(() => {
                setPhone('');
                setPassword('');
                setError(null);
                setMessage(START_MESSAGE);
            }, 550);
            
            return () => clearTimeout(timer);
        }
    }, [isActive])

    React.useEffect(() => {
        if (fetcher.data) {
            const success = fetcher.data.success;

            if (success) {
                login(fetcher.data.userData);
                setError(null);
                setMessage(fetcher.data.message);
                closeModal();
            } else {
                setError(fetcher.data.error);
            }
        }
    }, [fetcher.data])

    let authMwssageStyle = 'login-message';
    if (error) authMwssageStyle = 'login-message error';
    if (loggedIn) authMwssageStyle = 'login-message success';

    return (
        <div className="login-container">
            <div className="login-header-wrapper">
                <h2>Авторизация</h2>
                <button className='close-button' onClick={closeModal}><CrossIcon /></button>
            </div>

            <div className={authMwssageStyle}>
                {error || message}
            </div>

            <fetcher.Form 
                className="login-form"
                method='post'
            >
                <PhoneNumberInput 
                    inputValue={phone}
                    setInputValue={setPhone}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Пароль"
                    maxLength={12}
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                />
                <button>Войти</button>
            </fetcher.Form>
        </div>
    )
}

export async function loginAction({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const phone = formData.get('tel');
    const formattedPhone = formatPhoneNumber(phone?.toString());
    const password = formData.get('password');

    const users = await fetchUsers_fb();

    const user = users.find((item: UserType) => item.phone === formattedPhone && item.password === password);

    if (!user) return { success: false, error: 'Неверный номер телефона или пароль.' };
    else return { success: true, message: 'Вы успешно вошли!', userData: user };
}