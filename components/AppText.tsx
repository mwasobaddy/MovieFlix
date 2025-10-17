
import { cssInterop } from "nativewind";
import { Text } from "react-native";

function AppText(props: any) {
  return <Text {...props} style={[{ fontFamily: "Roboto-Regular" }, props.style]} />;
}

export default cssInterop(AppText, { className: "style" });