import { Ionicons } from "@expo/vector-icons";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";
import { BlurView } from "expo-blur";
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

import { ThemedText } from "@/components/theme/text";
import { MicroFile } from "@/domain/entities/types";
import { iconMap } from "@/lib/svg-loader";
import { useFileSystemStore } from "@/presentation/store/fileSystemStore";
import { colors } from "@/styles/colors";
import { StatusBar } from "expo-status-bar";

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

  const renderFileItem = (file: MicroFile) => (
    <TouchableOpacity
      key={file.name}
      className="mb-1 overflow-hidden rounded-lg"
      onPress={() =>
        navigation.navigate("editor/[file]", {
          file: file.name,
          icon: file.name.split(".")[1],
        })
      }
    >
      <BlurView
        intensity={60}
        tint="systemMaterialDark"
        className="px-3 py-2 bg-white/5"
      >
        <View className="flex-row items-center">
          {/* @ts-ignore */}
          <Image source={iconMap[file.name.split(".")[1]]} width={14} height={14} />
          <ThemedText variant="body" fontWeight="regular" className="ml-3 text-white/95">
            {file.name}
          </ThemedText>
        </View>
      </BlurView>
    </TouchableOpacity>
  );

  const renderOptionItem = (option: Options) => (
    <TouchableOpacity
      key={option.name}
      className="overflow-hidden"
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
      <BlurView
        intensity={40}
        tint="systemMaterialDark"
        className="px-4 py-3 bg-white/5"
      >
        <View className="flex-row items-center">
          {/* @ts-ignore */}
          <Ionicons name={option.icon} size={20} color="rgba(255,255,255,0.9)" />
          <ThemedText variant="body" className="ml-3 text-white/95" fontWeight="regular">
            {option.name}
          </ThemedText>
        </View>
      </BlurView>
    </TouchableOpacity>
  );

  return (
    <BlurView
      className="flex-1"
      intensity={50}
      tint="dark"
      experimentalBlurMethod="dimezisBlurView"
    >
      <StatusBar style="light" />

      <View className="flex-1 pt-12 px-4">

        <View className="mb-6 overflow-hidden rounded-2xl">
          <BlurView
            intensity={100}
            tint="systemUltraThinMaterialDark"
            className="bg-white/10"
          >
            <View className="flex-row p-2">
              <Pressable
                className={`flex-1 items-center py-3 rounded-xl overflow-hidden ${activeTab === "files" ? "" : ""
                  }`}
                onPress={() => setActiveTab("files")}
              >
                <LayoutDashboard
                  size={24}
                  color={activeTab === "files" ? "#ffffff" : "rgba(255,255,255,0.7)"}
                />
              </Pressable>

              <Pressable
                className={`flex-1 items-center py-3 rounded-xl overflow-hidden ${activeTab === "options" ? "" : ""
                  }`}
                onPress={() => setActiveTab("options")}
              >
                {activeTab === "options" ? (
                  <FolderOpen size={24} color="#ffffff" />
                ) : (
                  <Folder size={24} color="rgba(255,255,255,0.7)" />
                )}
              </Pressable>
            </View>
          </BlurView>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>

          {activeTab === "options" && (
            <>
              <View className="mb-4 overflow-hidden rounded-xl">
                <BlurView
                  intensity={120}
                  tint="systemThinMaterialDark"
                >
                  <View className="flex-row items-center px-4 py-3">
                    <ThemedText className="uppercase text-xs mr-auto font-bold text-white/90 tracking-widest">
                      arquivos
                    </ThemedText>
                    <View className="flex-row gap-3">
                      <View className="overflow-hidden rounded-lg">
                        <BlurView intensity={60} className="p-1.5 bg-white/10">
                          <FilePlus2 size={14} color="rgba(255,255,255,0.9)" />
                        </BlurView>
                      </View>
                      <View className="overflow-hidden rounded-lg">
                        <BlurView intensity={60} className="p-1.5 bg-white/10">
                          <FolderPlus size={14} color="rgba(255,255,255,0.9)" />
                        </BlurView>
                      </View>
                      <View className="overflow-hidden rounded-lg">
                        <BlurView intensity={60} className="p-1.5 bg-white/10">
                          <Search size={14} color="rgba(255,255,255,0.9)" />
                        </BlurView>
                      </View>
                      <View className="overflow-hidden rounded-lg">
                        <BlurView intensity={60} className="p-1.5 bg-white/10">
                          <RefreshCcw size={14} color="rgba(255,255,255,0.9)" />
                        </BlurView>
                      </View>
                    </View>
                  </View>
                </BlurView>
              </View>

              <View className="gap-1">
                {files.map(renderFileItem)}
              </View>
            </>
          )}

          {activeTab === "files" && (
            <>
              <ThemedText className="uppercase text-xs mb-4 font-bold text-white/90 tracking-widest px-2">
                navegação
              </ThemedText>

              <View className="overflow-hidden rounded-2xl mb-6">
                <BlurView
                  intensity={120}
                  tint="systemThinMaterialDark"
                >
                  {options.map((option, index) => (
                    <View key={option.name}>
                      {renderOptionItem(option)}
                      {index < options.length - 1 && (
                        <View className="h-px bg-white/10 mx-4" />
                      )}
                    </View>
                  ))}
                </BlurView>
              </View>
            </>
          )}

        </ScrollView>
      </View>
    </BlurView>
  );
}

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.black.DEFAULT,
        },
        headerTintColor: "#f0f9ff",
        drawerStyle: {
          backgroundColor: "transparent",
          width: 280,
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
    <ThemedText fontWeight="semibold" className="uppercase text-white">
      {title}
    </ThemedText>
  );
}
