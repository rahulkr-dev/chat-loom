export type ErrorMessages = {
    usernameExists: string;
    emailExists: string;
    invalidCredentials: string;
    unauthorized: string;
};

export const ERROR_MESSAGES: Readonly<ErrorMessages> = {
    usernameExists: "Username is already taken. Please choose another.",
    emailExists: "Email is already registered. Please use a different one.",
    invalidCredentials: "Invalid username or password. Please try again.",
    unauthorized: "Unauthorized access. Ensure you have proper permissions.",
};
