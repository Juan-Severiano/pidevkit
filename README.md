# PiDevKit IDE

A powerful mobile and desktop IDE for Raspberry Pi development, built with React Native and Expo. This application provides a seamless experience for writing, testing, and deploying Python scripts on Raspberry Pi boards.

## Features

- 🔌 Easy board connection and management
- 📱 Responsive design for both mobile and desktop
- 📁 Full-featured file explorer
- ⚡ Real-time script execution
- 📊 Live output monitoring
- 🎨 Beautiful and intuitive UI
- 🌙 Dark mode support

## Architecture

This project follows Clean Architecture principles, organized into the following layers:

### Domain Layer (`src/domain/`)
- Contains business logic and interfaces
- Independent of external frameworks
- Defines core types and use cases
- Components:
  - `entities/`: Core data types and interfaces
  - `useCases/`: Business logic interfaces

### Data Layer (`src/data/`)
- Implements domain interfaces
- Handles external dependencies
- Components:
  - `repositories/`: Concrete implementations of domain interfaces
  - Integrates with expo-micro-ide for board communication

### Presentation Layer (`src/presentation/`)
- UI components and state management
- Uses Zustand for state management
- Components:
  - `components/`: Reusable UI components
  - `hooks/`: Custom React hooks
  - `store/`: Zustand state stores

### App Layer (`src/app/`)
- Expo Router configuration
- Screen components
- Navigation logic

## Project Structure

\`\`\`
src/
├── app/                    # Expo Router screens
│   ├── (drawer)/          # Drawer navigation screens
│   ├── _layout.tsx        # Root layout with drawer
│   └── index.tsx          # Main IDE screen
├── domain/                # Core business logic
│   ├── entities/
│   └── useCases/
├── data/                  # Data layer implementations
│   └── repositories/
├── presentation/          # UI and state management
│   ├── components/
│   ├── hooks/
│   └── store/
└── assets/               # Static assets
\`\`\`

## State Management

The application uses Zustand for state management, with two main stores:

1. **Board Store** (`boardStore.ts`)
   - Manages board connection state
   - Handles script execution
   - Monitors board status

2. **File System Store** (`fileSystemStore.ts`)
   - Manages file operations
   - Handles file selection
   - Tracks current directory

## Navigation

The app uses Expo Router with drawer navigation:

- **IDE** (Main Screen)
  - Split view on desktop
  - Editor-only view on mobile
- **Files**
  - Dedicated file explorer for mobile
- **Settings**
  - Board management
  - Connection status
  - App information

## Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/pidevkit-ide.git
cd pidevkit-ide
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Start the development server:
\`\`\`bash
npm start
# or
yarn start
\`\`\`

## Development

### Prerequisites
- Node.js 16 or higher
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development)

### Environment Setup
1. Install Expo CLI:
\`\`\`bash
npm install -g expo-cli
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

### Running the App
- **iOS Simulator**: \`npm run ios\`
- **Android Emulator**: \`npm run android\`
- **Web**: \`npm run web\`

## Building for Production

1. Configure app.json:
   - Update version numbers
   - Configure adaptive icons
   - Set up splash screen

2. Build the app:
\`\`\`bash
npm run build:prod
\`\`\`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Expo](https://expo.dev/)
- Uses [expo-micro-ide](https://github.com/Juan-Severiano/expo-micro-ide) for board communication
- UI components from [Lucide Icons](https://lucide.dev/) 