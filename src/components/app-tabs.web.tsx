import { Tabs } from "expo-router";

export default function AppTabsWeb() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Login",
        }}
      />
    </Tabs>
  );
}