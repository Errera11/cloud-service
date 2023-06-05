

export class Validator {

    static email(email: string): {isValidate: boolean, error?: string} {
        const regexp = /\w+\@\w+\.\w+/i;
        const isValidate = regexp.test(email);;
        if(isValidate) return {isValidate, error: ''};
        return {isValidate, error: 'Incorrect email!'};
    }

    static password(password: string, length?: number): {isValidate: boolean, error?: string} {
        const isValidate = password.length > (length ? length : 0);
        if(isValidate) return {isValidate, error: ''};
        return {isValidate, error: `Password must be greater than ${length}`};
    }

}