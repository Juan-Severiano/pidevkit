import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import {
  Cpu,
  Search,
  Plus,
  Folder,
  Code,
  Terminal,
  Download,
  Upload,
  Cherry,
  Hammer
} from 'lucide-react-native';
import { Input } from '@/components/ui/input';
import { ThemedText as Text } from '@/components/theme/text';
import { BoardInfo } from '@/components/core/board-info';

const colors = {
  green: { 500: '#34C759' },
  red: { 600: '#FF3B30' },
  sky: { 500: '#007AFF' },
  gray: { 100: '#F2F2F7', 300: '#C7C7CC', 400: '#8E8E93' },
  blue: { 500: '#007AFF' }
};

const projects = [
  {
    id: "1",
    name: "JoyStick Controller",
    path: "/projects/joystick-mode/",
    type: "Hardware",
    language: "MicroPython",
    lastModified: "2 hours ago",
    status: "active",
    progress: 0.8
  },
  {
    id: "2",
    name: "Hello World",
    path: "/projects/sayhello/",
    type: "Basic",
    language: "MicroPython",
    lastModified: "1 day ago",
    status: "completed",
    progress: 1.0
  },
  {
    id: "3",
    name: "Traffic Light System",
    path: "/projects/semaforo/",
    type: "IoT",
    language: "MicroPython",
    lastModified: "3 days ago",
    status: "draft",
    progress: 0.3
  },
  {
    id: "4",
    name: "Weather Station",
    path: "/projects/weather/",
    type: "Sensor",
    language: "MicroPython",
    lastModified: "1 week ago",
    status: "active",
    progress: 0.6
  }
];

const quickActions = [
  { id: 1, name: "New Project", icon: Plus, color: "#007AFF", gradient: "from-blue-500 to-blue-600" },
  { id: 2, name: "Import", icon: Download, color: "#34C759", gradient: "from-green-500 to-green-600" },
  { id: 3, name: "Export", icon: Upload, color: "#FF9500", gradient: "from-orange-500 to-orange-600" },
  { id: 4, name: "Terminal", icon: Terminal, color: "#5856D6", gradient: "from-purple-500 to-purple-600" }
];

export default function MobileIDEWorkspace() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'completed': return 'bg-blue-500';
      case 'draft': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const renderProject = ({ item }: { item: any }) => (
    <TouchableOpacity
      className="mb-3"
      onPress={() => setSelectedProject(item)}
      activeOpacity={0.8}
    >
      <View className="bg-white/5 p-4 rounded-xl">
        <View className="flex-row justify-between items-start mb-3">
          <View className="flex-1">
            <Text className="text-white text-lg font-semibold mb-1">
              {item.name}
            </Text>
            <Text className="text-gray-400 text-sm">
              {item.path}
            </Text>
          </View>
          <View className={`w-2 h-2 rounded-full ${getStatusColor(item.status)} ml-3 mt-2`} />
        </View>

        <View className="flex-row space-x-4 gap-2">
          <View className="flex-row items-center">
            <Code size={12} color={colors.gray[400]} />
            <Text className="text-gray-400 text-xs ml-1 font-medium">
              {item.language}
            </Text>
          </View>
          <View className="flex-row items-center">
            <Folder size={12} color={colors.gray[400]} />
            <Text className="text-gray-400 text-xs ml-1 font-medium">
              {item.type}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderQuickAction = (action: any) => (
    <TouchableOpacity
      key={action.id}
      className="flex-1 mx-1"
      activeOpacity={0.8}
    >
      <View className="bg-white/5 items-center py-2 px-2 rounded-lg">
        <View className={`w-10 h-10 rounded-full bg-gradient-to-br ${action.gradient} items-center justify-center`}>
          <action.icon size={20} color="white" />
        </View>
        <Text className="text-white text-xs font-medium text-center">
          {action.name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-black">
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="flex-row items-center mb-3 mt-6 gap-2">
          <Cpu size={16} color={colors.gray[400]} />
          <Text className="text-gray-400 text-xs font-bold uppercase tracking-wider">
            Development Board
          </Text>
        </View>

        <BoardInfo />

        <View className="flex-row items-center my-3 gap-2">
          <Cherry size={16} color={colors.gray[400]} />
          <Text className="text-gray-400 text-xs font-bold uppercase tracking-wider">
            Quick Actions
          </Text>
        </View>

        <View className="flex-row mb-6">
          {quickActions.map(renderQuickAction)}
        </View>

        <TouchableOpacity className="mb-6" activeOpacity={0.8}>
          <Input>
            <Search size={20} color={colors.gray[400]} />
            <Input.Field />
          </Input>
        </TouchableOpacity>

        <View className="flex-row items-center mb-3 gap-2">
          <Hammer size={16} color={colors.gray[400]} />
          <Text className="text-gray-400 text-xs font-bold uppercase tracking-wider mr-auto">
            Projects
          </Text>
          <TouchableOpacity
            className="w-7 h-7 rounded-full bg-blue-500/20 items-center justify-center"
            activeOpacity={0.7}
          >
            <Plus size={16} color={colors.blue[500]} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={projects}
          renderItem={renderProject}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        />
      </ScrollView>
    </View>
  );
}
