import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

const quotes = [
  "Medicine is a science of uncertainty and an art of probability.",
  "The art of medicine consists of amusing the patient while nature cures the disease.",
  "He who has health has hope; and he who has hope has everything.",
  "An ounce of prevention is worth a pound of cure.",
  "Healing is a matter of time, but it is sometimes also a matter of opportunity.",
];

export default function Index() {
  const router = useRouter();
  const [fontLoaded, setFontLoaded] = useState(false);
  const [quote, setQuote] = useState("");

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);

    const timer = setTimeout(() => {
      router.push("/get-started");
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const loadFonts = async () => {
    await Font.loadAsync({
      SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    });
    setFontLoaded(true);
  };

  if (!fontLoaded) {
    return <AppLoading startAsync={loadFonts} onFinish={() => setFontLoaded(true)} onError={console.warn} />;
  }

  return (
    <LinearGradient colors={["#dbeafe", "#bfdbfe", "#93c5fd"]} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 32, fontFamily: "SpaceMono", fontWeight: "bold", color: "#1e3a8a", marginBottom: 20 }}>
        MediMinder
      </Text>
      <Text style={{ fontSize: 16, fontFamily: "SpaceMono", color: "#1e40af", textAlign: "center", paddingHorizontal: 20 }}>
        {quote}
      </Text>
    </LinearGradient>
  );
}
