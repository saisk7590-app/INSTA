# Task: Fully Connected Startup-style MVP Transition

## Backend Modifications
- [x] Install cryptography dependencies (`bcryptjs`, `@types/bcryptjs`)
- [x] Update database seeding in `seed.ts` (hash passwords, add comments, update counts)
- [x] Update `auth.service.ts` to compare password hashes
- [/] Implement `POST /api/auth/signup` in `auth.controller.ts` and routes
- [ ] Add `followers` and `following` API endpoints in `user.routes.ts`
- [ ] Add `posts` API endpoint for specific user in `user.routes.ts`
- [ ] Implement post comment routes, controller, and services inside a transaction

## Frontend Modifications
- [ ] Update navigation UX back buttons (specifically fixing `SavedPostsScreen.tsx`)
- [ ] Implement the `ThemeProvider` and themed stylesheet support
- [ ] Hook up settings screen theme toggling
- [ ] Update the signup flow to connect to the backend API (`authService.ts` and `AuthProvider.tsx`)
- [ ] Connect Followers & Following screens to real backend data
- [ ] Connect CommentsBottomSheet to database comments API (read & create)

## Verification & Polish
- [ ] Verify database seeding and backend startup
- [ ] Verify login and signup workflows
- [ ] Verify followers, posts, and comments integration
- [ ] Verify dynamic theme toggling
