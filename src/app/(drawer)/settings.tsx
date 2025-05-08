import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useBoardStore } from '../../presentation/store/boardStore';
import { BoardStatus } from '../../domain/entities/types';
import { RotateCcw, RefreshCw } from 'lucide-react-native';

export default function SettingsScreen() {
  const { status, connectionStatus, resetBoard, initialize } = useBoardStore();

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="p-4">
        <Text className="text-lg font-semibold mb-4">Board Status</Text>
        <View className="bg-white rounded-lg p-4 mb-4">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-gray-600">Connection Status</Text>
            <Text className="font-medium">{connectionStatus}</Text>
          </View>
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-gray-600">Board Status</Text>
            <Text className="font-medium">{status}</Text>
          </View>
          <View className="flex-row space-x-2">
            <TouchableOpacity
              onPress={initialize}
              className="flex-1 flex-row items-center justify-center bg-blue-500 p-3 rounded-md"
            >
              <RefreshCw size={20} color="#FFFFFF" className="mr-2" />
              <Text className="text-white font-medium">Reconnect</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={resetBoard}
              disabled={status === BoardStatus.RUNNING}
              className={`flex-1 flex-row items-center justify-center p-3 rounded-md ${
                status === BoardStatus.RUNNING
                  ? 'bg-gray-300'
                  : 'bg-red-500'
              }`}
            >
              <RotateCcw size={20} color="#FFFFFF" className="mr-2" />
              <Text className="text-white font-medium">Reset Board</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text className="text-lg font-semibold mb-4">About</Text>
        <View className="bg-white rounded-lg p-4">
          <Text className="text-gray-600 mb-2">Version: 1.0.0</Text>
          <Text className="text-gray-600">
            PiDevKit IDE is a powerful development environment for Raspberry Pi
            boards, providing a seamless experience for writing, testing, and
            deploying Python scripts.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
} 