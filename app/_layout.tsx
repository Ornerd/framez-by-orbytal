import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

export default function _layout () {
  return (
    <AuthProvider>
      <MainLayout/>
    </AuthProvider>
  )
}



const MainLayout = () => {

  const {setAuth} = useAuth();
  const router = useRouter()

  useEffect(()=>{
    supabase.auth.onAuthStateChange((_event, session) => {
      if(session) {
        //set authentication
        setAuth(session?.user)
        //move authentic user to dashboard
        router.replace('/home')
      }else{
        //make auth null
         setAuth(null)
        //move to welcome screen
        router.replace('/welcome')
      }
    })
  }, [])

  return <Stack 
    screenOptions={{
      headerShown: false
    }}
  />;
}
