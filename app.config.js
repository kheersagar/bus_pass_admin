import 'dotenv/config';

export default {
  "expo": {
    "name": "Admin Pass",
    "slug": "Admin-Pass",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.Bus Pass",
      "buildNumber": "1.0.0"
    },
    "android": {
      "package": "com.sagarrrr.AdminPass",
      "versionCode": 1,
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "extra": {
      "apiKey": process.env.apiKey,
      "authDomain": process.env.authDomain,
      "projectId": process.env.projectId,
      "storageBucket": process.env.storageBucket,
      "messagingSenderId": process.env.messagingSenderId,
      "appId": process.env.appId,
      "eas": {
        "projectId": "aaa2de3b-5117-4b23-bc36-b95078a30f43"
      }
    }
  }
}
