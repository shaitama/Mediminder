import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function GetStarted() {
  const router = useRouter();

  return (
    <LinearGradient colors={["#e0f2fe", "#bae6fd", "#7dd3fc"]} style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      <View style={{ alignItems: "center", width: "100%" }}>
        <Text style={{ fontSize: 30, fontFamily: "SpaceMono", fontWeight: "bold", color: "#075985", marginBottom: 15, textAlign: "center" }}>
          Hello, Welcome to MediMinder!
        </Text>
        <Text style={{ fontSize: 16, fontFamily: "SpaceMono", textAlign: "center", color: "#0369a1", marginBottom: 30, width: "100%" }}>
          Stay on track with your medications and take control of your health.
        </Text>

        <TouchableOpacity onPress={() => router.push("/user-selection")}>
          <LinearGradient colors={["#0284c7", "#0369a1"]} style={{ paddingVertical: 15, paddingHorizontal: 40, borderRadius: 30 }}>
            <Text style={{ color: "white", fontSize: 18, fontFamily: "SpaceMono", textAlign: "center" }}>Get Started</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}