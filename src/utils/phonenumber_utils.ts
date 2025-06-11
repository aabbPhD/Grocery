export function formatPhoneNumber(phone: string | undefined) {
    return phone?.replace(/[^\d+]/g, '');
}

export function prettyPhoneNumber(phone: string): string | null {
    if (!phone.startsWith('+') || phone.length !== 12 || !/^\+\d{11}$/.test(phone)) return null;//некорректный номер
    return `${phone.substring(0, 2)} (${phone.substring(2, 5)}) ${phone.substring(5, 8)}-${phone.substring(8, 10)}-${phone.substring(10)}`;
}