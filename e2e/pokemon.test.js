const { remote } = require('webdriverio');
const path = require('path');

describe('Pokemon App Tests', () => {
    let expect;
    let mobileDriver;
    let getElementByTestID;

    before(async () => {
        expect = (await import('chai')).expect;

        mobileDriver = await remote({
            path: '/',
            port: 4723,
            capabilities: {
                platformName: "Android",
                'appium:automationName': "UiAutomator2",
                'appium:deviceName': "emulator-5556",
                'appium:app': path.resolve(__dirname, "../apks/build-1731367851788.apk")
            }
        });

        getElementByTestID = async (testID) => {
            return await mobileDriver.$(`//*[@resource-id="${testID}"]`);
        };
        
        
    });

    it('should log in and navigate to the pokemon list', async () => {
        // 1. Buscar el campo de usuario
        const usernameLabel = await getElementByTestID('username-label');
        const usernameInput = await getElementByTestID('username-input');
        const loginButton = await getElementByTestID('login-button');
        
        // 2. Esperar a que los elementos estén presentes
        await usernameLabel.waitForExist({ timeout: 5000 });
        await usernameInput.waitForExist({ timeout: 5000 });
        await loginButton.waitForExist({ timeout: 5000 });
    
        // 3. Verificar que los elementos existen
        expect(await usernameLabel.isDisplayed()).to.be.true;
        expect(await usernameInput.isDisplayed()).to.be.true;
        expect(await loginButton.isDisplayed()).to.be.true;
    
        // 4. Escribir un nombre de usuario en el campo
        await usernameInput.setValue('TestUser');
        
        // 5. Hacer clic en el botón de login
        await loginButton.click();
    
        // Espera a que la siguiente vista cargue
        // await mobileDriver.pause(2000); // Espera 2 segundos para permitir que la navegación ocurra
    
        // 6. Verificar que estamos en la vista de pokemones
        const welcomeText = await getElementByTestID('welcome-text');
        await welcomeText.waitForExist({ timeout: 5000 });
        const usernameText = await welcomeText.getText();
        expect(usernameText).to.include('TestUser');  // Usar .include para verificar que el texto contiene el nombre de usuario
    
        // Verificar que la lista de pokemones se muestra
        const pokemonList = await getElementByTestID('pokemon-list');
        await pokemonList.waitForExist({ timeout: 5000 });
        expect(await pokemonList.isDisplayed()).to.be.true;
      });

        
    
    after(async () => {
        // Cerrar las sesiones de los drivers (móvil y web)
        if (mobileDriver) {
            await mobileDriver.deleteSession();
        }

    });
});
