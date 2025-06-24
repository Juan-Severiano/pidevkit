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
  Undo2,
  Redo2,
  FileText,
  Code,
} from "lucide-react-native";
import React, { ReactNode, useState, useRef, useEffect } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Pressable,
  Text,
  Platform,
} from "react-native";
import { BlurView as ExpoBlurView } from "expo-blur";

import { ThemedText } from "@/components/theme/text";
import { iconMap, language } from "@/lib/svg-loader";
import { colors } from "@/styles/colors";
import { useFileSystem } from "@/presentation/hooks/useFileSystem";
import { SimpleCodeInput as HighlightedInput } from "@/components/ui/HighlightedInput";
import { useBoardStore } from "@/presentation/store/boardStore";

export default function EditorScreen() {
  const navigation = useNavigation();
  const { file, icon } = useLocalSearchParams();
  const [currentLine, setCurrentLine] = useState(1);
  const [currentColumn, setCurrentColumn] = useState(1);
  const [isModified, setIsModified] = useState(false);
  const undoStack = useRef<string[]>([]);
  const redoStack = useRef<string[]>([]);
  const inputSelection = useRef({ start: 0, end: 0 });

  const {
    readFile,
    writeFile,
    fileContent,
  } = useFileSystem();

  const { runScript } = useBoardStore()

  const [code, setCode] = useState("");
  const [loadedFile, setLoadedFile] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      await readFile(file as string);
      setLoadedFile(file as string);
      setIsModified(false);
      undoStack.current = [];
      redoStack.current = [];
    };
    load();
  }, [file]);

  useEffect(() => {
    if (
      !isModified &&
      fileContent !== null &&
      fileContent !== undefined &&
      loadedFile === file
    ) {
      setCode(fileContent);
    }
  }, [fileContent, loadedFile, file]);

  const handleSave = async () => {
    if (typeof file === "string") {
      await writeFile(file, code);
      setIsModified(false);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerBlurEffect: "systemMaterial",
      headerStyle: {
        backgroundColor:
          Platform.OS === "ios"
            ? "rgba(28, 28, 30, 0.8)"
            : colors.black.DEFAULT,
      },
      headerTitle: () => (
        <View className="flex-row items-center justify-between w-full px-2">
          <View className="flex-row items-center flex-1 gap-3">
            <View className="w-5 h-5 rounded-sm items-center justify-center">
              <Image
                source={iconMap[icon as keyof typeof iconMap]}
                width={12}
                height={12}
              />
            </View>
            <View className="flex-1">
              <ThemedText
                fontWeight="regular"
                className="text-white text-base tracking-tight"
              >
                {file}
              </ThemedText>
              <ThemedText className="text-xs text-gray-400 -mt-0.5">
                {isModified ? "Edited" : "Saved"} •{" "}
                {language[icon as keyof typeof language]}
              </ThemedText>
            </View>
          </View>

          <View className="flex-row items-center gap-2">
            <GlassButton onPress={handleSave} size="sm">
              <Save size={16} color={isModified ? "#3b82f6" : "#6b7280"} />
            </GlassButton>
          </View>
        </View>
      ),
    });
  }, [isModified]);

  useEffect(() => {
    const lines = code.split("\n");
    const { start } = inputSelection.current;
    const textBeforeCursor = code.substring(0, start);
    const linesBeforeCursor = textBeforeCursor.split("\n");

    setCurrentLine(linesBeforeCursor.length);
    setCurrentColumn(linesBeforeCursor[linesBeforeCursor.length - 1].length + 1);
  }, [code, inputSelection.current]);

  const handleCodeChange = (text: string) => {
    if (text !== code) {
      undoStack.current.push(code);
      redoStack.current = [];
      setCode(text);
      setIsModified(true);
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
    const currentCode = code;
    const { start } = inputSelection.current;
    const newCode =
      currentCode.slice(0, start) + "  " + currentCode.slice(start);
    setCode(newCode);
    inputSelection.current.start += 2;
    inputSelection.current.end += 2;
  };

  const handleOutdent = () => {
    const lines = code.split("\n");
    const currentLineContent = lines[currentLine - 1];
    if (currentLineContent?.startsWith("  ")) {
      lines[currentLine - 1] = currentLineContent.slice(2);
      setCode(lines.join("\n"));
      setCurrentColumn(Math.max(1, currentColumn - 2));
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <View className="flex-1 bg-black">
        <View className="flex-1 pt-24">
          <HighlightedInput
            value={code}
            onChangeText={handleCodeChange}
            language={language[icon as keyof typeof language]}
            fontSize={16}
            inputLineHeight={22}
            highlighterLineHeight={22}
            style={{ flex: 1 }}
          />
        </View>

        <View className="bg-black/40 backdrop-blur-xl border-t border-gray-700/30 w-full">
          <View className="flex-row justify-between items-center px-4 py-2 border-b border-gray-700/20">
            <View className="flex-row items-center gap-4">
              <StatusIndicator
                icon={<FileText size={12} />}
                text={`Ln ${currentLine}, Col ${currentColumn}`}
              />
              <StatusIndicator
                icon={<Code size={12} />}
                text={language[icon as keyof typeof language]}
              />
            </View>

            <View className="flex-row items-center gap-4">
              <StatusIndicator text="UTF-8" />
              <StatusIndicator text="Spaces: 2" />
              {isModified && (
                <View className="w-2 h-2 rounded-full bg-orange-500" />
              )}
            </View>
          </View>

          <View className="flex-row justify-around items-center py-3 px-2">
            <ToolbarSection title="History">
              <GlassButton
                onPress={handleUndo}
                disabled={undoStack.current.length === 0}
              >
                <Undo2 size={20} color="#9ca3af" />
              </GlassButton>
              <GlassButton
                onPress={handleRedo}
                disabled={redoStack.current.length === 0}
              >
                <Redo2 size={20} color="#9ca3af" />
              </GlassButton>
            </ToolbarSection>

            <ToolbarSection title="Indentation">
              <GlassButton onPress={handleOutdent}>
                <ChevronsLeft size={20} color="#9ca3af" />
              </GlassButton>
              <GlassButton onPress={handleIndent}>
                <ChevronsRight size={20} color="#9ca3af" />
              </GlassButton>
            </ToolbarSection>

            <ToolbarSection title="Tools">
              <GlassButton onPress={() => console.log("AI Assist")}>
                <Sparkles size={20} color="#a855f7" />
              </GlassButton>
              <GlassButton onPress={async () => {
                await runScript(code)
                console.log({ script: code })
              }}>
                <Play size={20} color="#10b981" />
              </GlassButton>
              <GlassButton onPress={() => console.log("Settings")}>
                <Settings size={20} color="#9ca3af" />
              </GlassButton>
            </ToolbarSection>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const GlassButton = ({
  children,
  onPress,
  disabled = false,
  size = "md",
}: {
  children: ReactNode;
  onPress: () => void;
  disabled?: boolean;
  size?: "sm" | "md";
}) => {
  const sizeClasses = size === "sm" ? "w-8 h-8" : "w-12 h-12";

  return (
    <Pressable
      className={`${sizeClasses} rounded-xl bg-white/5 border border-white/10 items-center justify-center active:bg-white/10 active:scale-95 ${
        disabled ? "opacity-30" : ""
      }`}
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => ({
        transform: [{ scale: pressed ? 0.95 : 1 }],
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
      })}
    >
      <ExpoBlurView intensity={20} tint="light" className="absolute inset-0 rounded-xl" />
      {children}
    </Pressable>
  );
};

const ToolbarSection = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <View className="items-center gap-2">
    <Text className="text-xs text-gray-400 font-medium tracking-wide uppercase opacity-60">
      {title}
    </Text>
    <View className="flex-row gap-2">{children}</View>
  </View>
);

const StatusIndicator = ({
  icon,
  text,
}: {
  icon?: ReactNode;
  text: string;
}) => (
  <View className="flex-row items-center gap-1.5">
    {icon && <View className="opacity-60">{icon}</View>}
    <Text className="text-xs text-gray-300 font-mono tracking-wide">{text}</Text>
  </View>
);
