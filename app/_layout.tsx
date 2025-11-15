import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}

const MainLayout = () => {
  const { user, loadingUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loadingUser) return; // wait for hydration

    if (user) {
      router.replace("/(main)/home");
    } else {
      router.replace("/welcome");
    }
  }, [user, loadingUser]);

  if (loadingUser) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="(main)/postDetails"
        options={{
          presentation: "modal",
        }}
      />
    </Stack>
  );
};
