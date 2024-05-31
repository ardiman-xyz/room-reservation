
export const publicRoutes = [
    "/",
    "/api/uploadthing"
];

/**
 * An array of routes tha are used for authentication
 * These routes will redirect logged-in users to /settings
 * @type {string[]}
 * */
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/new-verification",
    "/auth/reset",
    "/auth/new-password"
];

/**
 * The prefix for API authentication  routes *  that start with this prefix are used for api
 * @type {string}
 * */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging ini
 * @type {string}
 * */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";