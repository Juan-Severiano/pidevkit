import React, { useRef, useState } from "react";
import { View, TextInput, StyleSheet, Platform, ScrollView, Text } from "react-native";

interface SimpleCodeInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: any;
  fontSize?: number;
  lineHeight?: number;
  showLineNumbers?: boolean;
  editable?: boolean;
}

export const SimpleCodeInput: React.FC<SimpleCodeInputProps> = ({
  value,
  onChangeText,
  placeholder = "Digite seu código aqui...",
  style,
  fontSize = 14,
  lineHeight = 20,
  showLineNumbers = true,
  editable = true,
}) => {
  const inputRef = useRef<TextInput>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const lines = value.split('\n');
  const lineCount = lines.length;

  const handleScroll = (event: any) => {
    setScrollPosition(event.nativeEvent.contentOffset.y);
  };

  const renderLineNumbers = () => {
    if (!showLineNumbers) return null;

    return (
      <View style={styles.lineNumbers}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          contentOffset={{ x: 0, y: scrollPosition }}
        >
          {Array.from({ length: Math.max(lineCount, 20) }, (_, i) => (
            <Text
              key={i + 1}
              style={[
                styles.lineNumber,
                {
                  fontSize: fontSize - 2,
                  lineHeight,
                  minHeight: lineHeight,
                }
              ]}
            >
              {i + 1}
            </Text>
          ))}
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={[styles.container, style]}>
      {renderLineNumbers()}
      
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={{ minHeight: "100%" }}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={true}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <TextInput
          ref={inputRef}
          value={value}
          onChangeText={onChangeText}
          multiline
          placeholder={placeholder}
          placeholderTextColor="#6b7280"
          editable={editable}
          style={[
            styles.input,
            {
              fontSize,
              lineHeight,
              fontFamily: Platform.OS === "ios" ? "SF Mono" : "monospace",
              minHeight: lineHeight * 20, // Mínimo de 20 linhas
            },
          ]}
          selectionColor="#3b82f6"
          autoCapitalize="none"
          autoCorrect={false}
          spellCheck={false}
          textAlignVertical="top"
          underlineColorAndroid="transparent"
          keyboardType="default"
          returnKeyType="default"
          blurOnSubmit={false}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#1f2937",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#374151",
    overflow: "hidden",
  },
  lineNumbers: {
    backgroundColor: "#111827",
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRightWidth: 1,
    borderRightColor: "#374151",
    minWidth: 40,
  },
  lineNumber: {
    color: "#6b7280",
    textAlign: "right",
    fontFamily: Platform.OS === "ios" ? "SF Mono" : "monospace",
  },
  scrollContainer: {
    flex: 1,
  },
  input: {
    flex: 1,
    color: "#f9fafb",
    backgroundColor: "transparent",
    padding: 12,
    textAlignVertical: "top",
    includeFontPadding: false,
  },
});

export default SimpleCodeInput;