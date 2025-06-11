import React from "react";


type PhoneNumberInputPropsType = {
    inputValue: string,
    setInputValue: React.Dispatch<React.SetStateAction<string>>, 
}


export default function PhoneNumberInput({inputValue, setInputValue}: PhoneNumberInputPropsType) {
    function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
        const formattedValue = formatPhoneNumber(e.target.value);
        setInputValue(formattedValue);
    }

    function formatPhoneNumber(value: string) {
        //оставляем в строке только цифры и плюс в начале
        const digits = value.replace(/[^\d+]/g, '');
        
        //если номер начинается с +7, оставляем как есть
        if (digits.startsWith('+7')) {
            const phoneDigits = digits.slice(2).replace(/\D/g, '');
            return formatDigits(phoneDigits, true);
        }

        //если номер начинается с 7 или 8 (без плюса), преобразуем в +7
        else if (digits.match(/^[78]/)) {
            const phoneDigits = digits.slice(1).replace(/\D/g, '');
            return formatDigits(phoneDigits, true);
        }
        //если начинается с других цифр
        else return formatDigits(digits.replace(/\D/g, ''), false);
    }

    function formatDigits(digits: string, hasPlus7: boolean) {
        const phone = digits.slice(0, 10);//оставляем только 10 цифр
        
        const parts = [];
        if (hasPlus7) parts.push('+7');
        else if (phone.length > 0) parts.push('+7');
        
        if (phone.length > 0) parts.push(' (');
        if (phone.length >= 1) parts.push(phone.slice(0, 3));
        if (phone.length >= 4) parts.push(') ');
        if (phone.length >= 4) parts.push(phone.slice(3, 6));
        if (phone.length >= 7) parts.push('-');
        if (phone.length >= 7) parts.push(phone.slice(6, 8));
        if (phone.length >= 9) parts.push('-');
        if (phone.length >= 9) parts.push(phone.slice(8, 10));

        return parts.join('');
    }

    return (
        <input
            name="tel"
            type="tel"
            placeholder="+7 (___) ___-__-__"
            value={inputValue}
            onChange={e => handleInput(e)}
            autoComplete="off"
        />
    )
}