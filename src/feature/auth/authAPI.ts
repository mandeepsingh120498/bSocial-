import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import axiosInstance from "../../api/axiosInstance";
import { auth } from "../../firebase/config";
import { supabase } from "../../api/SupabaseClient";

// Sign up using Firebase and store user in Supabase
export const signUp = async (email: string, password: string, username: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const firebaseUid = userCredential.user.uid;

  // Save the user in Supabase 
  const { data, error } = await supabase
  .from('usersInfo')
  .insert([
    {
      firebase_uid: firebaseUid,
      email,
      username,
    },
  ])
  .select()

  if (error) {
    throw new Error(`Error saving user in supabase: ${error.message}`);
  }

  return data;
};

// Sign in using Firebase
export const signIn = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  const { data, error } = await supabase
  .from("usersInfo")
  .select("id, username")
  .eq("firebase_uid", user.uid)
  .single();
  const stsTokenManager = (user as any).stsTokenManager;
  if (!stsTokenManager) {
    throw new Error("stsTokenManager is not available.");
  }
  if (error) {
    throw new Error(`Error fetching username: ${error.message}`);
  }
  const response = {
    firebase_uid: user.uid,
    id: data?.id,
    email: user.email,
    username: data?.username,
    refreshToken: stsTokenManager.refreshToken,
    accessToken: stsTokenManager.accessToken,
    expirationTime: stsTokenManager.expirationTime,
  };
  return response;
};

// Log out the user
export const logout = async () => {
  await signOut(auth);
};
