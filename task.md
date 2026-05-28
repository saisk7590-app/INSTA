# Task: Fully Connected Startup-style MVP Transition

## Backend Modifications
- [x] Install cryptography dependencies (`bcryptjs`, `@types/bcryptjs`)
- [x] Update database seeding in `seed.ts` (hash passwords, add comments, update counts)
- [x] Update `auth.service.ts` to compare password hashes
- [x] Implement `POST /api/auth/signup` in `auth.controller.ts` and routes
- [x] Add `followers` and `following` API endpoints in `user.routes.ts`
- [x] Add `posts` API endpoint for specific user in `user.routes.ts`
- [x] Implement post comment routes, controller, and services inside a transaction

## Frontend Modifications
- [x] Update navigation UX back buttons (specifically fixing `SavedPostsScreen.tsx`)
- [x] Implement the `ThemeProvider` and themed stylesheet support
- [x] Hook up settings screen theme toggling
- [x] Update the signup flow to connect to the backend API (`authService.ts` and `AuthProvider.tsx`)
- [x] Connect Followers & Following screens to real backend data
- [x] Connect CommentsBottomSheet to database comments API (read & create)

## Verification & Polish
- [x] Verify database seeding and backend startup
- [x] Verify login and signup workflows
- [x] Verify followers, posts, and comments integration
- [x] Verify dynamic theme toggling

