# Implementation Plan - Hyperlocal Social Media Startup-style MVP Transition

This plan details the steps to migrate the hyperlocal social media application from a prototype to a fully-connected startup-style MVP. All changes will preserve the existing UI/layout and focus purely on backend integration, database connectivity, and production-level features.

## User Review Required

> [!IMPORTANT]
> **Password Hashing & DB Seed Migration**:
> All user records created from the signup flow will have their passwords hashed using `bcryptjs`. We will update the backend `seed.ts` to also use `bcryptjs` for the five initial demo users so that they can continue to log in seamlessly with their seeded credentials (`Sai@123`, `Alex@123`, etc.).

> [!NOTE]
> **Theme Switching**:
> To avoid modifying the style properties of all 50+ components, we will implement a dynamic themed stylesheet helper (`useThemedStyles`) and wrap the app in a `ThemeProvider` context. We will migrate the core layout elements (`ScreenContainer`, `HeaderBar`, `BottomTabBar`) and primary screens (Home Feed, Settings, Profile, Chat, and Auth screens) to support Light and Dark themes dynamically.

## Proposed Changes

---

### Backend Components

#### [NEW] [bcryptjs dependency]
Run the following inside `E:\Sai Kiran\insta\APP\backend` to support secure password hashing:
```bash
npm install bcryptjs
npm install -D @types/bcryptjs
```

#### [MODIFY] [seed.ts](file:///E:/Sai%20Kiran/insta/APP/backend/src/seed/seed.ts)
* Import `bcryptjs` and hash password inputs (e.g. `Sai@123`) before storing them in the `password_hash` column of the `users` table.
* Implement a comments seeder that loops through each seeded post and inserts between 3 and 8 comments from random users.
* Update `posts.comments_count` for each post to match the number of seeded comments.

#### [MODIFY] [auth.service.ts](file:///E:/Sai%20Kiran/insta/APP/backend/src/services/auth.service.ts)
* Update `login` method to use `bcryptjs.compareSync(password, user.password_hash)` to verify credentials instead of plain-text string comparison.

#### [MODIFY] [auth.controller.ts](file:///E:/Sai%20Kiran/insta/APP/backend/src/controllers/auth.controller.ts)
* Implement the `signup` function:
  * Validate required body parameters: `email`, `phone`, `username`, `password`, `fullName`, and `interests`.
  * Check uniqueness of `email`, `phone`, and `username` against the database.
  * Hash the password using `bcryptjs.hashSync(password, 10)`.
  * Insert user into `users` and their selected interests into `user_interests`.
  * Return user record and a dummy/real JWT session token.

#### [MODIFY] [user.routes.ts](file:///E:/Sai%20Kiran/insta/APP/backend/src/routes/user.routes.ts)
* Implement `GET /api/users/:id/followers` to retrieve a list of followers (with details: id, username, bio, avatar, and mutual follow state).
* Implement `GET /api/users/:id/following` to retrieve followed users.
* Implement `GET /api/users/:id/posts` to fetch only the posts created by a specific user.

#### [MODIFY] [post.routes.ts](file:///E:/Sai%20Kiran/insta/APP/backend/src/routes/post.routes.ts)
* Map routes for:
  * `GET /api/posts/:id/comments` (runs `getPostComments`)
  * `POST /api/posts/:id/comments` (runs `createPostComment`)

#### [MODIFY] [post.controller.ts](file:///E:/Sai%20Kiran/insta/APP/backend/src/controllers/post.controller.ts)
* Implement controllers `getPostComments` and `createPostComment` calling post services.

#### [MODIFY] [post.service.ts](file:///E:/Sai%20Kiran/insta/APP/backend/src/services/post.service.ts)
* Implement `getComments(postId)` database query to retrieve a list of comments for a post thread.
* Implement `createComment(postId, userId, textContent)` inside a SQL transaction (inserting comments, updating `comments_count` in the posts table, and returning the comment with user info).

---

### Frontend Components

#### [NEW] [colors.ts](file:///E:/Sai%20Kiran/insta/APP/frontend/src/theme/colors.ts)
* Export light and dark color schemas, supporting contrast and harmony.

#### [NEW] [ThemeProvider.tsx](file:///E:/Sai%20Kiran/insta/APP/frontend/src/theme/ThemeProvider.tsx)
* Define the `ThemeContext` and `ThemeProvider` wrapper.
* Expose `themeMode` ('light' | 'dark'), current `colors`, `gradients`, `toggleTheme` function, and the React Navigation theme configuration.
* Save the active theme to `AsyncStorage` for persistence.

#### [MODIFY] [App.tsx](file:///E:/Sai%20Kiran/insta/APP/frontend/App.tsx)
* Wrap the app in `<ThemeProvider>` and pass the navigation theme dynamically to `<NavigationContainer>`.

#### [MODIFY] [SavedPostsScreen.tsx](file:///E:/Sai%20Kiran/insta/APP/frontend/src/screens/feed/SavedPostsScreen.tsx)
* Update `HeaderBar` usage to include `leftAction="back"` and `onLeftPress={() => navigation.goBack()}` so the back navigation works correctly.

#### [MODIFY] [authService.ts](file:///E:/Sai%20Kiran/insta/APP/frontend/src/services/auth/authService.ts)
* Update `signup(payload)` to execute `api.post('/auth/signup', ...)` hitting the backend, passing the onboarding draft state fields (email, phone, password, username, fullName, interests).

#### [MODIFY] [AuthProvider.tsx](file:///E:/Sai%20Kiran/insta/APP/frontend/src/store/auth/AuthProvider.tsx)
* Ensure that onboarding screen actions are correctly integrated with the real backend registration flow.

#### [MODIFY] [FollowersScreen.tsx](file:///E:/Sai%20Kiran/insta/APP/frontend/src/screens/profile/FollowersScreen.tsx) & [FollowingScreen.tsx](file:///E:/Sai%20Kiran/insta/APP/frontend/src/screens/profile/FollowingScreen.tsx)
* Replace the static import of `followers` and `following` mock arrays with state fetched from `getUserFollowers` and `getUserFollowing` APIs.

#### [MODIFY] [CommentsBottomSheet.tsx](file:///E:/Sai%20Kiran/insta/APP/frontend/src/components/comments/CommentsBottomSheet.tsx) & [CommentInput.tsx](file:///E:/Sai%20Kiran/insta/APP/frontend/src/components/comments/CommentInput.tsx)
* Implement real comments loading and sending using the comment service.
* Update `CommentInput` to expose an `onSubmit` handler, passing input text up to the database.

#### [MODIFY] [SettingsScreen.tsx](file:///E:/Sai%20Kiran/insta/APP/frontend/src/screens/settings/SettingsScreen.tsx)
* Add a theme switcher row in the UI (e.g. toggle switch or button row) inside the Settings sections.

---

## Verification Plan

### Automated Tests
* Run the backend and verify console logging statements match:
  * `[API LOG] GET /api/posts/feed hit`
  * `[API LOG] GET /api/users/:id/followers hit`
  * `[API LOG] GET /api/posts/:id/comments hit`
  * `[API LOG] POST /api/auth/signup hit`
* Check if seed script runs cleanly:
  * `npm run seed` or equivalent database setup script.

### Manual Verification
1. **Signup**: Register a new user, complete the onboarding screens, check user row in PostgreSQL with encrypted password hash.
2. **Followers/Following**: View Followers/Following screens under the profile, verify that users shown come from database relations.
3. **Comments**: Open comments on a feed post, view seeded comments, write a new comment, verify it increments count and saves to DB.
4. **Theme Switcher**: Tap "Theme" under Settings, toggle modes, verify UI updates (backgrounds, cards, text, headers, tab bar) instantaneously.
