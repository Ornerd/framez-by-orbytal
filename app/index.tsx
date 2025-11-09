import ScreenWrapper from "@/components/ScreenWrapper";
import { Button } from "@react-navigation/elements";
import { useRouter } from "expo-router";

export default function Index() {

  const router = useRouter()

  return (
    <ScreenWrapper>
      <Button onPress={()=> router.push('/welcome')}>
        Welcome
      </Button>
    </ScreenWrapper>
  );
}
