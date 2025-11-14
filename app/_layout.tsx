import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { getUserData } from "@/services/userService";
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

  const {setAuth, setUserData} = useAuth();
  const router = useRouter()

  useEffect(()=>{
    supabase.auth.onAuthStateChange((_event, session) => {
      if(session) {
        //set authentication
        setAuth(session?.user)

        updateUserData(session?.user)
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

  const updateUserData = async (user: any)=> {
    let res = await getUserData(user?.id)
    const resultingData = res.data
    if (res.success) {
      setUserData(resultingData)
    }
  }

  return <Stack 
    screenOptions={{
      headerShown: false
      }}
    >
      <Stack.Screen
      name="(main)/postDetails"
      options={{
        presentation: 'transparentModal'
      }}
      />
    </Stack>;
}
