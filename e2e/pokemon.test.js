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

    it('should search for Pika and click on Pikachu', async () => {
        const searchInput = await getElementByTestID('search-input');
        await searchInput.waitForExist({ timeout: 5000 });
    
        expect(await searchInput.isDisplayed()).to.be.true;
    
        const pokemonList = await getElementByTestID('pokemon-list');
        await pokemonList.waitForExist({ timeout: 5000 });
        
        const bulbasaur = await getElementByTestID('pokemon-name-bulbasaur');
        await bulbasaur.waitForExist({ timeout: 5000 });
        expect(await bulbasaur.isDisplayed()).to.be.true;
        
        // const bulbasaurLink = await getElementByTestID('pokemon-link-bulbasaur');
        // await bulbasaurLink.click();
        // await mobileDriver.pause(10000);
    });


    it('should show Pokemon details when clicking on Bulbasaur', async () => {
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
    
        // Esperar que la pantalla de detalles cargue y verificar los elementos esperados
        const pokemonDetailsTitle = await getElementByTestID('pokemon-details-title');
        await pokemonDetailsTitle.waitForExist({ timeout: 5000 });
        const titleText = await pokemonDetailsTitle.getText();
        expect(titleText).to.include('Bulbasaur');
    
        // Verificar que las estadísticas están presentes
        const hpStat = await getElementByTestID('stat-hp');
        const attackStat = await getElementByTestID('stat-attack');
        const defenseStat = await getElementByTestID('stat-defense');
        await Promise.all([hpStat.waitForExist({ timeout: 5000 }), attackStat.waitForExist({ timeout: 5000 }), defenseStat.waitForExist({ timeout: 5000 })]);
        
        expect(await hpStat.isDisplayed()).to.be.true;
        expect(await attackStat.isDisplayed()).to.be.true;
        expect(await defenseStat.isDisplayed()).to.be.true;
    
        // Verificar que al menos una imagen de sprite de Bulbasaur está presente
        const pokemonImage = await getElementByTestID('pokemon-sprite');
        await pokemonImage.waitForExist({ timeout: 5000 });
        expect(await pokemonImage.isDisplayed()).to.be.true;
    
        // Pausar 10 segundos para simular espera
        await mobileDriver.pause(10000);
    });
    
    

    after(async () => {
        // Cerrar las sesiones de los drivers (móvil y web)
        if (mobileDriver) {
            await mobileDriver.deleteSession();
        }
    });
});
