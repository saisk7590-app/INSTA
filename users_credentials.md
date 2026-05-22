# Hyperlocal Social App - Demo Login Credentials

Here is the list of users seeded in the database `Insta_db` for easy investor switching and developer testing.

| Username | Email | Password | Full Name | Location |
| :--- | :--- | :--- | :--- | :--- |
| **sai_kiran** | `sai@test.com` | `Sai@123` | Sai Kiran | Banjara Hills, Hyderabad |
| **alex_smith** | `alex@test.com` | `Alex@123` | Alex Smith | Hyderabad City Center |
| **maya_creative** | `maya@test.com` | `Maya@123` | Maya Creative | Jubilee Hills, Hyderabad |
| **ryan_style** | `ryan@test.com` | `Ryan@123` | Ryan Style | Hyderabad East |
| **sara_guru** | `sara@test.com` | `Sara@123` | Sara Guru | Hyderabad North |

## How to Test

1. Launch **Expo Web** (`npm run web`).
2. If you are on the feed screen and want to change users, click **Logout** from your Profile tab.
3. On the Login Screen, you will see a **Quick Login Switcher** containing chips for each demo account.
4. Simply tap any chip to instantly populate the email and password, then press **Log In**.
5. Once logged in, the feed will reload, fetching real database posts scoped to that user's social graph.
