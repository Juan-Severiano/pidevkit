import { Ionicons } from "@expo/vector-icons";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";
import {
  FilePlus2,
  Folder,
  FolderOpen,
  FolderPlus,
  LayoutDashboard,
  RefreshCcw,
  Search,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";

import { Divider } from "@/components/divider";
import { ThemedText } from "@/components/theme/text";
import { ThemedView } from "@/components/theme/view";
import { IconButton } from "@/components/ui/icon-button";
import { MicroFile } from "@/domain/entities/types";
import { iconMap } from "@/lib/svg-loader";
import { useFileSystemStore } from "@/presentation/store/fileSystemStore";
import { colors } from "@/styles/colors";

const options = [
  { name: "Área de Trabalho", icon: "desktop-outline", route: "index" },
  { name: "Editor", icon: "code-outline", route: "editor/[file]" },
  { name: "Preferências", icon: "settings-outline", route: "settings" },
] as Options[];

interface Options {
  name: string;
  icon: string;
  route: string;
}

function CustomDrawerContent({ navigation }: DrawerContentComponentProps) {
  const [activeTab, setActiveTab] = useState("files");

  const { files } = useFileSystemStore();

  // @ts-ignore
  const renderFileItem = (file: MicroFile) => (
    <TouchableOpacity
      key={file.name}
      className="flex-row items-center py-2 px-4"
      onPress={() =>
        navigation.navigate("editor/[file]", {
          file: file.name,
          icon: file.name.split(".")[1],
        })
      }
    >
      {/* @ts-ignore */}
      <Image source={iconMap[file.name.split(".")[1]]} width={14} height={14} />
      <ThemedText variant="body" fontWeight="semibold" className="ml-3">
        {file.name}
      </ThemedText>
    </TouchableOpacity>
  );

  // @ts-ignore
  const renderOptionItem = (option: Options) => (
    <View key={option.name}>
      <TouchableOpacity
        className="flex-row items-center py-3 px-4"
        onPress={() =>
          navigation.navigate(
            option.route,
            option.name === "Editor"
              ? {
                  file: "untitled.py",
                  icon: "py",
                }
              : {},
          )
        }
      >
        {/* @ts-ignore */}
        <Ionicons name={option.icon} size={24} color={colors.gray[400]} />
        <ThemedText variant="body" className="ml-3">
          {option.name}
        </ThemedText>
      </TouchableOpacity>
      {option.route !== "editor/[file]" && <Divider />}
    </View>
  );

  return (
    <ThemedView className="flex-1 bg-sky-950">
      <ThemedView className="flex-row px-0 justify-start gap-3">
        <Pressable
          className={`py-4 ${activeTab === "files" ? " border-blue-500" : ""}`}
          onPress={() => setActiveTab("files")}
        >
          <LayoutDashboard
            size={30}
            color={activeTab === "files" ? colors.sky[500] : colors.gray[400]}
          />
        </Pressable>
        <Pressable
          className={`py-4 ${activeTab === "options" ? " border-blue-500" : ""}`}
          onPress={() => setActiveTab("options")}
        >
          {activeTab === "files" ? (
            <Folder size={30} color={colors.gray[400]} />
          ) : (
            <FolderOpen size={30} color={colors.sky[500]} />
          )}
        </Pressable>
      </ThemedView>
      <ScrollView>
        {activeTab === "options" && (
          <>
            <View className="flex-row gap-3">
              <ThemedText
                className="uppercase text-sm mr-auto"
                fontWeight="semibold"
              >
                arquivos
              </ThemedText>
              <IconButton>
                <FilePlus2 size={20} color={colors.gray[400]} />
              </IconButton>
              <IconButton>
                <FolderPlus size={20} color={colors.gray[400]} />
              </IconButton>
              <IconButton>
                <Search size={20} color={colors.gray[400]} />
              </IconButton>
              <IconButton>
                <RefreshCcw size={20} color={colors.gray[400]} />
              </IconButton>
            </View>
            {files.map(renderFileItem)}
          </>
        )}
        {activeTab === "files" && (
          <>
            <ThemedText
              className="uppercase text-sm mb-3"
              fontWeight="semibold"
            >
              navegação
            </ThemedText>
            <ThemedView
              style={{ padding: 0 }}
              className="border border-3 border-gray-400 p-0 rounded-lg"
            >
              {options.map(renderOptionItem)}
            </ThemedView>
          </>
        )}
      </ScrollView>
    </ThemedView>
  );
}

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.sky[950],
        },
        headerTintColor: "#f0f9ff",
        drawerStyle: {
          backgroundColor: "#082f49",
        },
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          headerTitle: () => <HeadTitle title="área de trabalho" />,
        }}
      />
      <Drawer.Screen
        name="workspace"
        options={{
          headerTitle: () => <HeadTitle title="área de trabalho" />,
        }}
      />
      <Drawer.Screen
        name="editor/[file]"
        options={{
          headerTitle: () => <HeadTitle title="editor" />,
        }}
      />
      <Drawer.Screen
        name="preferences"
        options={{
          headerTitle: () => <HeadTitle title="preferencias" />,
        }}
      />
    </Drawer>
  );
}

function HeadTitle({ title }: { title: string }) {
  return (
    <ThemedText fontWeight="semibold" className="uppercase">
      {title}
    </ThemedText>
  );
}
