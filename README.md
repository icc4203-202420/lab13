# Laboratorio: Testing E2E de Aplicación React Native con Appium

Este laboratorio forma parte del curso de Aplicaciones Móviles y se centra en la implementación de pruebas end-to-end (E2E) utilizando Appium para una aplicación React Native de Pokémon.

## Descripción

El proyecto consiste en la automatización de pruebas E2E para validar el flujo completo de una aplicación móvil, desde el inicio de sesión hasta la navegación y visualización de detalles de Pokémon.

## Prerrequisitos

### Software Necesario

- [Node.js](https://nodejs.org/) (v14 o superior)
- [Java Development Kit (JDK)](https://www.oracle.com/java/technologies/downloads/) (versión 8 o superior)
- [Android Studio](https://developer.android.com/studio)
- [Appium Server](https://appium.io/) (v2.0 o superior)
- [Appium Inspector](https://github.com/appium/appium-inspector)

### Configuración del Entorno Android

1. Instalar Android Studio
2. Configurar las variables de entorno:
   ```bash
   export ANDROID_HOME=$HOME/Android/Sdk
   export PATH=$PATH:$ANDROID_HOME/tools
   export PATH=$PATH:$ANDROID_HOME/tools/bin
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```

3. Crear un emulador Android desde AVD Manager en Android Studio:
   - Recomendado: Pixel 6 con API 33
   - Nombre del dispositivo usado en este proyecto: `emulator-5556`

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Instalar Appium globalmente:
   ```bash
   npm install -g appium
   ```

4. Instalar el driver de UiAutomator2:
   ```bash
   appium driver install uiautomator2
   ```

## Generación del APK

Para ejecutar las pruebas, necesitas generar el APK de tu aplicación React Native:

1. Navegar al directorio de tu aplicación React Native
2. Ejecutar el comando de build:
   ```bash
   npx expo build:android
   ```
3. El APK generado debe colocarse en el directorio `apks/` del proyecto de pruebas

## Estructura del Proyecto

```
e2e-testing/
├── apks/                  # Directorio para los APKs de prueba
├── test/
│   ├── specs/            # Archivos de pruebas
│   └── helpers/          # Funciones auxiliares
├── package.json
└── README.md
```

## Casos de Prueba

El proyecto incluye los siguientes casos de prueba:

1. **Login Flow**
   - Verificación de elementos en la pantalla de login
   - Ingreso de credenciales
   - Validación de inicio de sesión exitoso

2. **Pokémon List Navigation**
   - Búsqueda de Pokémon
   - Validación de resultados de búsqueda
   - Navegación a detalles de Pokémon

3. **Pokémon Details**
   - Verificación de información detallada
   - Validación de elementos UI
   - Navegación entre pantallas

## Ejecución de Pruebas

1. Iniciar el emulador Android:
   ```bash
   emulator -avd [NOMBRE_DEL_EMULADOR]
   ```

2. Iniciar el servidor Appium:
   ```bash
   appium
   ```

3. Ejecutar las pruebas:
   ```bash
   npm test
   ```

## Configuración de Capacidades

Las capacidades del driver se configuran en el archivo de prueba:

```javascript
capabilities: {
    platformName: "Android",
    'appium:automationName': "UiAutomator2",
    'appium:deviceName': "emulator-5556",
    'appium:app': path.resolve(__dirname, "../apks/build-[TIMESTAMP].apk")
}
```

## Solución de Problemas Comunes

1. **Error de conexión con el emulador**
   - Verificar que el emulador esté iniciado
   - Comprobar el nombre del dispositivo con `adb devices`

2. **APK no encontrado**
   - Asegurarse de que el APK está en el directorio correcto
   - Verificar la ruta en las capacidades

3. **Elementos no encontrados**
   - Usar Appium Inspector para verificar los selectores
   - Aumentar los tiempos de espera en los tests

## Referencias

- [Documentación oficial de Appium](https://appium.io/docs/en/latest/)
- [WebDriverIO Documentation](https://webdriver.io/)
- [React Native Testing Guide](https://reactnative.dev/docs/testing-overview)
- [Android Developer Guide](https://developer.android.com/guide)

## Contribución

Para contribuir a este proyecto:

1. Fork el repositorio
2. Crear una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Crear un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.