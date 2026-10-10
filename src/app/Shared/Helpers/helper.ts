export function maskEmail(email: string): string {
    if (!email?.trim()) return email;

    const atIndex = email.indexOf('@');

    if (atIndex <= 0 || atIndex === email.length - 1)
        return email;

    const username = email.slice(0, atIndex);
    const domain = email.slice(atIndex);

    if (username.length <= 2) {
        return username[0] + '*'.repeat(7) + domain;
    }

    return username[0] + '*'.repeat(7) + username.at(-1) + domain;
}