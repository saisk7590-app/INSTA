# Hyperlocal Social App

React Native Expo app for real-time hyperlocal social discovery.

## Run

1. `npm install`
2. `npx expo start -c`

## Dummy Auth Data

Existing demo user:

- Email: `demo@test.com`
- Password: `Password123!`
- Phone: `+919876543210`
- Username: `sai_kiran`

Demo OTP:

- `123456`

Username notes:

- Taken examples: `sai_kiran`, `aroundhq`, `nisha`, `kabirwalks`
- Suggested examples in app: `saikiran_now`, `sai_local`, `saikiran_live`

Interest selection:

- Minimum required: `3`

## Auth Flow

Existing user flow:

1. Splash
2. Login
3. Main app

New user flow:

1. Splash
2. Login
3. Tap `Create new account`
4. Location permission
5. Notification permission
6. Signup
7. OTP verification
8. Username setup
9. Interest selection
10. Main app

On signup screen there is also an `Already have an account? Log in` action that returns to login.

## Logout Flow

1. Open `Profile`
2. Open `Settings`
3. Tap `Log Out`
4. App returns to the login screen
