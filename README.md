# React Qiankun Microfrontend with Context7
http://npm-compare.com/qiankun,single-spa

A complete microfrontend architecture built with **React**, **Qiankun**, and **Context7** for global state management. This project demonstrates how to build scalable microfrontend applications with shared state and seamless communication between micro apps.

## 🚀 Features

- **Qiankun Integration**: Seamless microfrontend orchestration
- **Context7**: Custom global state management system for cross-app communication
- **Theme Support**: Dark/Light theme switching across all micro apps
- **React 18**: Latest React features and hooks
- **Modern UI**: Beautiful, responsive design with CSS variables
- **TypeScript Ready**: Easy to convert to TypeScript
- **Development Ready**: Hot reload and development server setup

## 📁 Project Structure

```
react-qiankun-microfrontend/
├── main-app/                 # Host application (Port 3000)
│   ├── src/
│   │   ├── components/       # Shared components
│   │   ├── context/          # Context7 global state
│   │   ├── pages/           # Main app pages
│   │   └── App.js           # Main app entry
│   └── package.json
├── micro-app-1/             # Dashboard micro app (Port 3001)
│   ├── src/
│   │   ├── components/      # Dashboard components
│   │   └── App.js          # Micro app entry
│   └── package.json
├── micro-app-2/             # Profile micro app (Port 3002)
│   ├── src/
│   │   ├── components/      # Profile components
│   │   └── App.js          # Micro app entry
│   └── package.json
└── package.json             # Root workspace config
```

## 🎯 Context7 System

Context7 is our custom global state management system that enables:

- **Cross-App Communication**: Share state between microfrontends
- **User Management**: Global user state and authentication
- **Theme Management**: Consistent theming across all apps
- **Navigation State**: Shared routing and breadcrumb management
- **Micro App Lifecycle**: Track loaded/unloaded micro applications

### Context7 Features:

```javascript
// Available in all micro apps via window.__GLOBAL_CONTEXT__
const globalContext = {
  state: {
    user: { id, name, email, role },
    theme: 'light' | 'dark',
    language: 'en',
    navigation: { activeRoute, breadcrumbs },
    sharedData: { /* cross-app data */ },
    loadedMicroApps: [],
    microAppStates: {}
  },
  actions: {
    setUser, setTheme, setLanguage,
    updateNavigation, setSharedData,
    markMicroAppLoaded, markMicroAppUnloaded
  }
}
```

## 🛠️ Quick Start

### Prerequisites

- Node.js 16+ and npm/yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd react-qiankun-microfrontend
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```

3. **Start all applications**
   ```bash
   npm start
   ```

This will start:
- Main App: http://localhost:3000
- Dashboard (micro-app-1): http://localhost:3001  
- Profile (micro-app-2): http://localhost:3002

### Individual App Commands

```bash
# Start main app only
npm run start:main

# Start micro-app-1 only  
npm run start:micro1

# Start micro-app-2 only
npm run start:micro2

# Build all apps
npm run build
```

## 🎨 Applications Overview

### Main Application (Host)
- **Port**: 3000
- **Purpose**: Container app that hosts all microfrontends
- **Features**: 
  - Navigation bar with theme toggle
  - User login/logout simulation
  - Micro app status tracking
  - Context7 state management

### Dashboard App (micro-app-1)
- **Port**: 3001 
- **Purpose**: Analytics and dashboard functionality
- **Features**:
  - Interactive charts (Recharts)
  - Real-time metrics
  - Data refresh capabilities
  - Context7 integration for shared data

### Profile App (micro-app-2)  
- **Port**: 3002
- **Purpose**: User profile and account management
- **Features**:
  - User profile forms
  - Settings management
  - Context7 state consumption
  - Theme-aware components

## 🔧 Configuration

### Qiankun Configuration

The main app registers micro applications in `main-app/src/App.js`:

```javascript
const microApps = [
  {
    name: 'micro-app-1',
    entry: '//localhost:3001',
    container: '#micro-app-1-container',
    activeRule: '/micro-app-1',
  },
  {
    name: 'micro-app-2', 
    entry: '//localhost:3002',
    container: '#micro-app-2-container',
    activeRule: '/micro-app-2',
  },
];
```

### Micro App Setup

Each micro app exports lifecycle methods:

```javascript
// In micro-app/src/index.js
export async function bootstrap() { /* init logic */ }
export async function mount(props) { /* mount logic */ }  
export async function unmount(props) { /* cleanup logic */ }
```

## 🎭 Theme System

The theme system uses CSS variables and supports:

- **Light Theme**: Clean, bright interface
- **Dark Theme**: Dark mode for better accessibility
- **Instant Switching**: Real-time theme changes across all apps
- **Persistent State**: Theme choice maintained in Context7

## 🚀 Deployment

### Production Build

```bash
npm run build
```

### Docker Support (Optional)

Create a `Dockerfile` for each application:

```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📊 Monitoring & Debugging

### Development Tools

- **React DevTools**: For component inspection
- **Console Logging**: Micro app lifecycle events
- **Context7 State Viewer**: Real-time state inspection in Dashboard
- **Network Tab**: Monitor micro app loading

### Common Issues

1. **CORS Issues**: Ensure all apps run on localhost during development
2. **Port Conflicts**: Make sure ports 3000, 3001, 3002 are available
3. **State Sync**: Check Context7 connection in browser console

## 🧪 Testing

```bash
# Test all applications
cd main-app && npm test
cd micro-app-1 && npm test  
cd micro-app-2 && npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Qiankun** - Micro-frontend framework
- **React** - UI library
- **Recharts** - Chart library for Dashboard
- **CSS Variables** - Theme system implementation

## 📞 Support

For questions and support:
- Create an issue in this repository
- Check the [Qiankun documentation](https://qiankun.umijs.org/)
- Review React documentation for component patterns

---

**Happy coding! 🚀** 