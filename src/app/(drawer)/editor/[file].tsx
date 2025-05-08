import CodeEditor, {
  CodeEditorSyntaxStyles,
} from "@rivascva/react-native-code-editor";
import { useLocalSearchParams, useNavigation } from "expo-router";
import {
  Save,
  ArrowLeft,
  ArrowRight,
  ChevronsLeft,
  ChevronsRight,
  Sparkles,
  Settings,
  Play,
} from "lucide-react-native";
import React, { ReactNode, useState, useRef, useEffect } from "react";
import { View, Image, TouchableOpacity } from "react-native";

import { ThemedText } from "@/components/theme/text";
import { ThemedView } from "@/components/theme/view";
import { IconButton } from "@/components/ui/icon-button";
import { iconMap, language } from "@/lib/svg-loader";
import { colors } from "@/styles/colors";

export default function EditorScreen() {
  const navigation = useNavigation();
  const { file, icon } = useLocalSearchParams();
  const [code, setCode] = useState("");
  const [currentLine, setCurrentLine] = useState(1);
  const [currentColumn, setCurrentColumn] = useState(1);
  const undoStack = useRef<string[]>([]);
  const redoStack = useRef<string[]>([]);
  const inputSelection = useRef({ start: 0, end: 0 });

  navigation.setOptions({
    headerTitle: () => (
      <View className="flex-row gap-2 w-full">
        <Image
          source={iconMap[icon as keyof typeof iconMap]}
          width={14}
          height={14}
        />
        <ThemedText fontWeight="semibold" className="mr-auto">
          {file}
        </ThemedText>
        <IconButton onPress={() => console.log("Save file")}>
          <Save size={20} color={colors.gray[400]} />
        </IconButton>
      </View>
    ),
  });

  useEffect(() => {
    const lines = code.split("\n");
    setCurrentLine(lines.length);
    setCurrentColumn(lines[lines.length - 1].length + 1);
  }, [code]);

  const handleCodeChange = (text: string) => {
    if (text !== code) {
      undoStack.current.push(code);
      redoStack.current.length = 0;
      setCode(text);
    }
  };

  const handleUndo = () => {
    if (undoStack.current.length > 0) {
      const lastCode = undoStack.current.pop();
      redoStack.current.push(code);
      setCode(lastCode || "");
    }
  };

  const handleRedo = () => {
    if (redoStack.current.length > 0) {
      const nextCode = redoStack.current.pop();
      undoStack.current.push(code);
      setCode(nextCode || "");
    }
  };

  const handleIndent = () => {
    // Insere indentação de dois espaços na posição do cursor atual
    const currentCode = code;
    const { start } = inputSelection.current;
    const newCode =
      currentCode.slice(0, start) + "  " + currentCode.slice(start);
    setCode(newCode);
    inputSelection.current.start += 2;
    inputSelection.current.end += 2;
  };

  const handleOutdent = () => {
    // Remove indentação se os primeiros caracteres na linha forem espaços
    const lines = code.split("\n");
    const currentLineContent = lines[currentLine - 1];
    if (currentLineContent.startsWith("  ")) {
      lines[currentLine - 1] = currentLineContent.slice(2);
      setCode(lines.join("\n"));
      setCurrentColumn(Math.max(1, currentColumn - 2));
    }
  };

  return (
    <ThemedView className="flex-1 py-0 px-0">
      <CodeEditor
        style={{
          fontSize: 20,
          inputLineHeight: 26,
          highlighterLineHeight: 26,
          backgroundColor: colors.sky[950],
        }}
        // @ts-ignore
        language={language[icon as keyof typeof language]}
        syntaxStyle={CodeEditorSyntaxStyles.atomOneDark}
        showLineNumbers
        onChange={handleCodeChange}
        value={code}
        onSelectionChange={(event: {
          nativeEvent: { selection: { start: any; end: any } };
        }) => {
          const { start, end } = event.nativeEvent.selection;
          inputSelection.current = { start, end };
        }}
      />
      <View className="absolute bottom-0 w-full bg-sky-900 px-4 py-2">
        <View className="flex-row justify-between items-center mb-2">
          <ThemedText className="text-xs">
            Ln {currentLine}, Col {currentColumn}
          </ThemedText>
          <ThemedText className="text-xs">Spaces: 2</ThemedText>
          <ThemedText className="text-xs">
            {language[icon as keyof typeof language]}
          </ThemedText>
          <ThemedText className="text-xs">UTF-8</ThemedText>
        </View>
        <View className="flex-row justify-around">
          <ToolbarButton
            icon={<ArrowLeft size={20} color={colors.gray[400]} />}
            onPress={handleUndo}
          />
          <ToolbarButton
            icon={<ArrowRight size={20} color={colors.gray[400]} />}
            onPress={handleRedo}
          />
          <ToolbarButton
            icon={<ChevronsLeft size={20} color={colors.gray[400]} />}
            onPress={handleOutdent}
          />
          <ToolbarButton
            icon={<ChevronsRight size={20} color={colors.gray[400]} />}
            onPress={handleIndent}
          />
          <ToolbarButton
            icon={<Sparkles size={20} color={colors.gray[400]} />}
            onPress={() => console.log("AI Assist")}
          />
          <ToolbarButton
            icon={<Settings size={20} color={colors.gray[400]} />}
            onPress={() => console.log("Settings")}
          />
          <ToolbarButton
            icon={<Play size={20} color={colors.gray[400]} />}
            onPress={() => console.log("Run")}
          />
        </View>
      </View>
    </ThemedView>
  );
}

const ToolbarButton = ({
  icon,
  onPress,
}: {
  icon: ReactNode;
  onPress: () => void;
}) => (
  <TouchableOpacity
    className="w-10 h-10 rounded-full bg-sky-800 items-center justify-center"
    onPress={onPress}
    accessibilityRole="button"
  >
    {icon}
  </TouchableOpacity>
);
