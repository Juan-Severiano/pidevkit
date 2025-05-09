import CodeEditor from "@rivascva/react-native-code-editor";
import { files as appFiles } from "expo-micro-ide";
import { Play, Pause, RotateCcw, Save } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { BoardStatus } from "../../domain/entities/types";
import { useBoardStore } from "../store/boardStore";
import { useFileSystemStore } from "../store/fileSystemStore";

export const Editor: React.FC = () => {
  const {
    selectedFile,
    fileContent,
    readFile,
    writeFile,
    error: fileError,
    currentPath,
    listFiles,
    files,
  } = useFileSystemStore();

  useEffect(() => {
    const fetch = async () => {
      await listFiles();
      console.log(files);
    };
    fetch();
  }, []);

  const {
    status,
    lastOutput,
    error: boardError,
    runScript,
    pauseScript,
    resetBoard,
  } = useBoardStore();

  const [content, setContent] = useState("");
  const [output, setOutput] = useState("");

  useEffect(() => {
    const update = async () => {
      if (selectedFile) {
        try {
          console.log(selectedFile);
          console.log(`${currentPath}${selectedFile.name}`);
          const content = await appFiles.read(selectedFile.name);
          console.log(content);
        } catch (error) {
          console.log(error);
        }
      }
    };
    update();
  }, [selectedFile]);

  useEffect(() => {
    setContent(fileContent);
  }, [fileContent]);

  useEffect(() => {
    setOutput(lastOutput);
  }, [lastOutput]);

  const handleSave = async () => {
    if (selectedFile) {
      await writeFile(selectedFile.path, content);
    }
  };

  const handleRun = async () => {
    if (selectedFile) {
      await runScript(content);
    }
  };

  if (!selectedFile) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-gray-500">Select a file to edit</Text>
      </View>
    );
  }

  if (fileError || boardError) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-red-500">{fileError || boardError}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100">
      <View className="flex-row items-center justify-between p-4 bg-white border-b border-gray-200">
        <Text className="text-gray-700 font-medium">{selectedFile.name}</Text>
        <View className="flex-row space-x-2">
          <TouchableOpacity
            onPress={handleSave}
            className="p-2 bg-gray-100 rounded-md"
          >
            <Save size={20} color="#374151" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleRun}
            disabled={status === BoardStatus.RUNNING}
            className="p-2 bg-gray-100 rounded-md"
          >
            <Play
              size={20}
              color={status === BoardStatus.RUNNING ? "#9CA3AF" : "#374151"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={pauseScript}
            disabled={status !== BoardStatus.RUNNING}
            className="p-2 bg-gray-100 rounded-md"
          >
            <Pause
              size={20}
              color={status !== BoardStatus.RUNNING ? "#9CA3AF" : "#374151"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={resetBoard}
            className="p-2 bg-gray-100 rounded-md"
          >
            <RotateCcw size={20} color="#374151" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-1">
        <CodeEditor
          language="python"
          showLineNumbers
          initialValue={selectedFile.name}
          onChange={setContent}
          style={{}}
        />
      </View>

      {output && (
        <View className="h-1/3 bg-gray-900 p-4">
          <Text className="text-white font-mono">{output}</Text>
        </View>
      )}
    </View>
  );
};
