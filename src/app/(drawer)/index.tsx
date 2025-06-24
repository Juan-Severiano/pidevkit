import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  FlatList, 
  ScrollView,
  ActivityIndicator,
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
  Zap,
  Circle,
  X,
  RotateCcw,
  Square,
  CircleX,
  PlugZap,
  Minus
} from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import { ConnectionStatus } from 'expo-micro-ide';
import { useBoardStore } from '@/presentation/store/boardStore';
import { useFileSystemStore } from '@/presentation/store/fileSystemStore';
import { useBoardConnection } from '@/presentation/hooks/useBoardConnection';

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

function BoardInfo() {
  const { board, connectionStatus } = useBoardStore();
  const { listFiles, files } = useFileSystemStore();
  
  useBoardConnection();

  const isConnectedStatus = connectionStatus === ConnectionStatus.CONNECTED;
  const isUnconnectedStatus = connectionStatus === ConnectionStatus.DISCONNECTED;
  const isConnecting = connectionStatus === ConnectionStatus.CONNECTING;

  const connect = async () => {
    try {
      await board.initialize();
      await listFiles();
      console.log(files);
    } catch (e) {
      console.error("Erro ao conect ar:", e);
    }
  };

  const disconnect = async () => {
    try {
      // @ts-ignore
      await board.disconnect?.();
    } catch (e) {
      console.error("Erro ao desconectar:", e);
    }
  };

  const reset = async () => {
    try {
      await board.reset();
    } catch (e) {
      console.error("Erro ao resetar:", e);
    }
  };

  const close = async () => {
    try {
      await board.pause();
    } catch (e) {
      console.error("Erro ao encerrar execução:", e);
    }
  };

  const renderStatusInfo = () => {
    switch (connectionStatus) {
      case ConnectionStatus.CONNECTED:
        return "MicroPython - Board in FS Mode";
      case ConnectionStatus.DISCONNECTED:
        return "Disconnected";
      case ConnectionStatus.CONNECTING:
        return "Connecting to service...";
      case ConnectionStatus.ERROR:
        return "Connection Error";
      default:
        return "Unknown Status";
    }
  };

  return (
    <View>
      <BlurView 
        intensity={60} 
        tint="systemMaterialDark"
        className="rounded-2xl overflow-hidden border border-white/10"
      >
        <View className="bg-white/5 p-4">
          <TouchableOpacity 
            className="flex-row justify-between items-center mb-4"
            onPress={connect}
            activeOpacity={0.7}
          >
            <View className="flex-1">
              <Text className="text-white text-lg font-semibold mb-1">
                {renderStatusInfo()}
              </Text>
              {isConnectedStatus && (
                <View className="space-y-1">
                  <Text className="text-gray-300 text-sm">VendorID: 11912</Text>
                  <Text className="text-gray-300 text-sm">ProductID: 5</Text>
                  <Text className="text-gray-400 text-xs mt-2">
                    Storage: 187KB used, 5MB free
                  </Text>
                </View>
              )}
            </View>
            <View className="ml-4">
              {isConnectedStatus ? (
                <Circle size={20} color={colors.green[500]} fill={colors.green[500]} />
              ) : isUnconnectedStatus ? (
                <CircleX size={20} color={colors.red[600]} />
              ) : (
                <ActivityIndicator color={colors.sky[500]} size="small" />
              )}
            </View>
          </TouchableOpacity>

          {!isConnectedStatus ? (
            <TouchableOpacity 
              className="flex-row items-center justify-center bg-blue-500 rounded-xl py-3 px-4"
              onPress={connect}
              activeOpacity={0.8}
            >
              <PlugZap size={20} color="white" />
              <Text className="text-white font-semibold ml-2">Connect Board</Text>
            </TouchableOpacity>
          ) : (
            <View className="space-y-2">
              <View className="h-px bg-white/10 my-2" />
              <View className="flex-row space-x-2">
                <TouchableOpacity 
                  className="flex-1 flex-row items-center justify-center bg-white/10 rounded-lg py-2.5"
                  onPress={disconnect}
                  activeOpacity={0.7}
                >
                  <Minus size={16} color={colors.gray[300]} />
                  <Text className="text-gray-300 text-sm font-medium ml-1">Disconnect</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  className="flex-1 flex-row items-center justify-center bg-white/10 rounded-lg py-2.5"
                  onPress={reset}
                  activeOpacity={0.7}
                >
                  <RotateCcw size={16} color={colors.gray[300]} />
                  <Text className="text-gray-300 text-sm font-medium ml-1">Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  className="flex-1 flex-row items-center justify-center bg-white/10 rounded-lg py-2.5"
                  onPress={close}
                  activeOpacity={0.7}
                >
                  <Square size={16} color={colors.gray[300]} />
                  <Text className="text-gray-300 text-sm font-medium ml-1">Stop</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </BlurView>
    </View>
  );
}

export default function MobileIDEWorkspace() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-500';
      case 'completed': return 'bg-blue-500';
      case 'draft': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const renderProject = ({ item } : { item: any }) => (
    <TouchableOpacity
      className="mb-3"
      onPress={() => setSelectedProject(item)}
      activeOpacity={0.8}
    >
      <BlurView 
        intensity={40} 
        tint="systemMaterialDark"
        className="rounded-xl overflow-hidden border border-white/10"
      >
        <View className="bg-white/5 p-4">
          {/* Project Header */}
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

          {/* Project Meta */}
          <View className="flex-row space-x-4 mb-3">
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

          {/* Progress Bar */}
          <View className="mb-2">
            <View className="bg-white/10 h-1 rounded-full overflow-hidden">
              <View 
                className={`h-full ${getStatusColor(item.status)}`}
                style={{ width: `${item.progress * 100}%` }}
              />
            </View>
          </View>

          <Text className="text-gray-500 text-xs">
            Modified {item.lastModified}
          </Text>
        </View>
      </BlurView>
    </TouchableOpacity>
  );

  const renderQuickAction = (action: any) => (
    <TouchableOpacity
      key={action.id}
      className="flex-1 mx-1"
      activeOpacity={0.8}
    >
      <BlurView 
        intensity={30} 
        tint="systemMaterialDark"
        className="rounded-xl overflow-hidden border border-white/10"
      >
        <View className="bg-white/5 items-center py-4 px-2">
          <View className={`w-10 h-10 rounded-full bg-gradient-to-br ${action.gradient} items-center justify-center mb-2`}>
            <action.icon size={20} color="white" />
          </View>
          <Text className="text-white text-xs font-medium text-center">
            {action.name}
          </Text>
        </View>
      </BlurView>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-black">
      <ScrollView 
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="flex-row items-center mb-3 mt-6">
          <Cpu size={16} color={colors.gray[400]} />
          <Text className="text-gray-400 text-xs font-bold uppercase tracking-wider ml-2">
            Development Board
          </Text>
        </View>
        
        <BoardInfo />

        {/* Quick Actions Section */}
        <View className="flex-row items-center mb-3">
          <Text className="text-gray-400 text-xs font-bold uppercase tracking-wider">
            Quick Actions
          </Text>
        </View>

        <View className="flex-row mb-6">
          {quickActions.map(renderQuickAction)}
        </View>

        {/* Search Bar */}
        <TouchableOpacity className="mb-6" activeOpacity={0.8}>
          <BlurView 
            intensity={40} 
            tint="systemMaterialDark"
            className="rounded-xl overflow-hidden border border-white/10"
          >
            <View className="bg-white/5 flex-row items-center p-4">
              <Search size={20} color={colors.gray[400]} />
              <Text className="text-gray-400 ml-3 text-base">
                Search projects...
              </Text>
            </View>
          </BlurView>
        </TouchableOpacity>

        {/* Projects Section */}
        <View className="flex-row items-center justify-between mb-3">
          <Text className="text-gray-400 text-xs font-bold uppercase tracking-wider">
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