import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient, processLock } from '@supabase/supabase-js';
import Constants from "expo-constants";
import { AppState, Platform } from 'react-native';
import 'react-native-url-polyfill/auto';

type ExtraConfig = {
  supabaseUrl: string;
  supabaseAnonKey: string;
};

const extra = (Constants.expoConfig?.extra ?? {}) as Partial<ExtraConfig>;

if (!extra.supabaseUrl || !extra.supabaseAnonKey) {
  throw new Error(
    "Supabase keys are missing. Make sure supabaseUrl and supabaseAnonKey exist in app.config.js under expo.extra"
  );
}


export const supabase = createClient(extra.supabaseUrl, extra.supabaseAnonKey, {
  auth: {
    ...(Platform.OS !== "web" ? { storage: AsyncStorage } : {}),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    lock: processLock,
  },
})

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
if (Platform.OS !== "web") {
  AppState.addEventListener('change', (state) => {
    if (state === 'active') {
      supabase.auth.startAutoRefresh()
    } else {
      supabase.auth.stopAutoRefresh()
    }
  })
}