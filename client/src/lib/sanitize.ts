export const sanitizationHistory: Record<string, string> = {
}

export default function sanitizeToURL(text: string) {
    const result: string =  text
        .toLowerCase()
        .replace(/[éèëê]/g, 'e')
        .replace(/[ïîì]/g, 'i')
        .replace(/[òôö]/g, 'o')
        .replace(/[ùûü]/g, 'u')
        .replace(/[àäâ]/g, 'a')
    ;

    sanitizationHistory[result] = text;

    return result;
}