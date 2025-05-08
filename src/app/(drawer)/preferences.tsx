import { ThemedText } from "@/components/theme/text";
import { ThemedView } from "@/components/theme/view";

export default function PreferencesScreen() {
  return (
    <ThemedView className="flex-1 p-4">
      <ThemedText variant="title" fontWeight="bold" className="mb-4">
        Preferences
      </ThemedText>
      <ThemedView className="flex-row justify-between items-center">
        <ThemedText variant="body">Dark Mode</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}
