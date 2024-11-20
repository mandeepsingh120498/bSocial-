### bSocial - Social Media Web Application

**bSocial** is a fully-featured social media web application designed for connecting users, sharing posts, and managing personalized content. This project uses modern web technologies for an efficient, scalable, and robust user experience.

---

## **Features**

1. **Authentication**
   - Sign up and sign in using Firebase Authentication.
   - Secure login with encrypted credentials using `crypto-js`.

2. **Post Management**
   - Create posts with a preview option before publishing.
   - Save posts for later reference.
   - Fetch all posts created by the logged-in user and the users they follow.

3. **Social Features**
   - Follow and unfollow users to personalize your feed.
   - Remove users from your following list.

---

## **Technologies Used**

- **React.js**: Frontend library for building the user interface.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **TypeScript**: Static typing for JavaScript to improve developer productivity.
- **Redux Toolkit**: State management solution for predictable state handling.
- **Axios**: Library for making HTTP requests.
- **Firebase Authentication**: User authentication and security.
- **Supabase**: Backend as a service for managing user posts and follow relationships.
- **crypto-js**: Library for encrypting sensitive data.

---

## **Installation and Setup**

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/bsocial.git
   cd bsocial
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and configure it with the following variables:

   ```env
   # Firebase Configuration
   REACT_APP_FIREBASE_API_KEY="<your-firebase-api-key>"
   REACT_APP_FIREBASE_AUTH_DOMAIN="<your-auth-domain>"
   REACT_APP_FIREBASE_PROJECT_ID="<your-project-id>"
   REACT_APP_FIREBASE_STORAGE_BUCKET="<your-storage-bucket>"
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID="<your-messaging-sender-id>"
   REACT_APP_FIREBASE_APP_ID="<your-app-id>"

   # Supabase Configuration
   REACT_APP_SUPABASE_URL='<your-supabase-url>'
   REACT_APP_SUPABASE_ANON_KEY='<your-supabase-anon-key>'

   # Crypto-js Secret Key
   REACT_APP_SECRET_KEY='<your-secret-key>'
   ```

4. Start the development server:

   ```bash
   npm start
   ```

5. Access the application at `http://localhost:3000`.

---

## **Project Structure**

```
src/
├── components/       # Reusable UI components
├── features/         # Redux slices and asynchronous logic
├── pages/            # Main pages like Home, Profile, and Post
├── services/         # Axios setup and API services
├── styles/           # Global and Tailwind configurations
├── utils/            # Utility functions (e.g., encryption)
├── App.tsx           # Main app entry point
└── index.tsx         # React entry point
```

---

## **Future Enhancements**

- Add support for real-time notifications.
- Enable post analytics and engagement metrics.
- Implement media uploads for images and videos.

---