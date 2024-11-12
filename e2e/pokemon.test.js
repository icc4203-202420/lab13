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
                'appium:app': path.resolve(__dirname, "../apks/build-1731384322317.apk")
            }
        });

        getElementByTestID = async (testID) => {
            return await mobileDriver.$(`//*[@resource-id="${testID}"]`);
        };
    });

    it('should log in and navigate to the pokemon list', async () => { 
        const usernameLabel = await getElementByTestID('username-label');
        const usernameInput = await getElementByTestID('username-input');
        const loginButton = await getElementByTestID('login-button');
        
        await usernameLabel.waitForExist({ timeout: 5000 });
        await usernameInput.waitForExist({ timeout: 5000 });
        await loginButton.waitForExist({ timeout: 5000 });
    
        expect(await usernameLabel.isDisplayed()).to.be.true;
        expect(await usernameInput.isDisplayed()).to.be.true;
        expect(await loginButton.isDisplayed()).to.be.true;
    
        await usernameInput.setValue('TestUser');
        
        await loginButton.click();
    });

    it('should show the welcome text with the username', async () => {
        const welcomeText = await getElementByTestID('welcome-text');
        await welcomeText.waitForExist({ timeout: 5000 });
        const usernameText = await welcomeText.getText();
        expect(usernameText).to.include('TestUser'); 
    
        const pokemonList = await getElementByTestID('pokemon-list');
        await pokemonList.waitForExist({ timeout: 5000 });
        expect(await pokemonList.isDisplayed()).to.be.true;
    });

    it('should search for Bulbasaur and click on Bulbasaur', async () => {
        // Esperar a que el campo de búsqueda esté visible y disponible
        const searchInput = await getElementByTestID('search-input');
        await searchInput.waitForExist({ timeout: 5000 });
        expect(await searchInput.isDisplayed()).to.be.true;
    
        // Establecer un valor de búsqueda (Bulbasaur)
        await searchInput.setValue('Bulbasaur');
        
        // Verificar que la lista de Pokémon está visible
        const pokemonList = await getElementByTestID('pokemon-list');
        await pokemonList.waitForExist({ timeout: 5000 });
        expect(await pokemonList.isDisplayed()).to.be.true;
    
        // Buscar el Pokémon "Bulbasaur" en la lista
        const bulbasaur = await getElementByTestID('pokemon-name-bulbasaur');
        await bulbasaur.waitForExist({ timeout: 5000 });
        expect(await bulbasaur.isDisplayed()).to.be.true;
    
        // Hacer clic en el enlace de "Bulbasaur" para navegar a los detalles del Pokémon
        const bulbasaurLink = await getElementByTestID('pokemon-link-bulbasaur');
        await bulbasaurLink.click();
            
    });


    it('should show Pokemon details when clicking on Bulbasaur', async () => {
        const goBackButton = await getElementByTestID('button-does-not-exist');
        await goBackButton.waitForDisplayed({ timeout: 5000 });
        expect(await goBackButton.isDisplayed()).to.be.false;
    });



    after(async () => {
        if (mobileDriver) {
            await mobileDriver.deleteSession();
        }
    });
});
