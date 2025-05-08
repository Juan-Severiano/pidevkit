import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useFileSystemStore } from '../store/fileSystemStore';
import { FileType, MicroFile } from '../../domain/entities/types';
import { Folder, File, ChevronLeft } from 'lucide-react-native';

export const FileExplorer: React.FC = () => {
  const {
    files,
    currentPath,
    selectedFile,
    error,
    listFiles,
    setSelectedFile,
  } = useFileSystemStore();

  useEffect(() => {
    listFiles(currentPath);
  }, [currentPath]);

  const handleFilePress = (file: MicroFile) => {
    if (file.type === FileType.DIRECTORY) {
      listFiles(file.path);
    } else {
      setSelectedFile(file);
    }
  };

  const handleBackPress = () => {
    if (currentPath === '/') return;
    const parentPath = currentPath.split('/').slice(0, -1).join('/') || '/';
    listFiles(parentPath);
  };

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-red-500">{error}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100">
      <View className="flex-row items-center p-4 bg-white border-b border-gray-200">
        <TouchableOpacity
          onPress={handleBackPress}
          disabled={currentPath === '/'}
          className="mr-2"
        >
          <ChevronLeft
            size={24}
            color={currentPath === '/' ? '#9CA3AF' : '#374151'}
          />
        </TouchableOpacity>
        <Text className="text-gray-700 font-medium">{currentPath}</Text>
      </View>

      <ScrollView className="flex-1">
        {files.map((file) => (
          <TouchableOpacity
            key={file.path}
            onPress={() => handleFilePress(file)}
            className={`flex-row items-center p-4 border-b border-gray-200 ${
              selectedFile?.path === file.path ? 'bg-blue-50' : 'bg-white'
            }`}
          >
            {file.type === FileType.DIRECTORY ? (
              <Folder size={24} color="#4B5563" className="mr-3" />
            ) : (
              <File size={24} color="#4B5563" className="mr-3" />
            )}
            <View className="flex-1">
              <Text className="text-gray-700">{file.name}</Text>
              {file.modifiedAt && (
                <Text className="text-gray-500 text-sm">
                  {new Date(file.modifiedAt).toLocaleDateString()}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}; 