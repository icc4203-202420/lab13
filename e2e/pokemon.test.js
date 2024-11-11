const { remote } = require('webdriverio');
const path = require('path');



describe('Pokemon App Tests', () => {
    let driver;
    let expect;

    before(async () => {
        expect = (await import('chai')).expect;

        driver = await remote({
            path: '/',
            port: 4723,
            capabilities: {
                platformName: "Android",
                'appium:automationName': "UiAutomator2",
                'appium:deviceName': "emulator-5556",
                'appium:app': path.resolve(__dirname, "../dist/application-c8141df2-26e8-4e5f-b1b2-bfc7b762fcba.apk")
            }
        });
    });

    it('should login successfully', async () => {
        // Encuentra y verifica el label de username
        
        await driver.pause(1000); // Esperar 1 segundo
        const usernameLabel = await driver.$('~username-label');

        expect(await usernameLabel.isDisplayed()).to.be.true;

        // Ingresa el username
        const usernameInput = await driver.$('~username-input');
        await usernameInput.setValue('testUser');

        // Click en login
        const loginButton = await driver.$('~login-button');
        await loginButton.click();

        // Verifica que llegamos a la pantalla de Pokémon
        const welcomeText = await driver.$('~welcome-text');
        expect(await welcomeText.isDisplayed()).to.be.true;
    });

    // it('should search for pokemon', async () => {
    //     // Encuentra el input de búsqueda
    //     const searchInput = await driver.$('~search-input');
    //     await searchInput.setValue('pika');

    //     // Verifica que aparece pikachu en la lista filtrada
    //     const pikachuContainer = await driver.$('~pokemon-container-pikachu');
    //     expect(await pikachuContainer.isDisplayed()).to.be.true;
    // });

    // it('should navigate to pokemon details', async () => {
    //     // Click en el link de detalles de pikachu
    //     const pikachuLink = await driver.$('~pokemon-link-pikachu');
    //     await pikachuLink.click();

    //     // Aquí deberías agregar verificaciones para la pantalla de detalles
    //     // cuando agregues los testID correspondientes
    // });

    // it('should load more pokemon on scroll', async () => {
    //     // Guarda el número inicial de pokémon
    //     const initialPokemonCount = await driver.$$('~pokemon-container-*').length;

    //     // Scroll hasta el final
    //     await driver.executeScript('mobile: scroll', [{
    //         direction: 'down'
    //     }]);

    //     // Verifica que se cargaron más pokémon
    //     const newPokemonCount = await driver.$$('~pokemon-container-*').length;
    //     expect(newPokemonCount).to.be.greaterThan(initialPokemonCount);
    // });

    after(async () => {
        if (driver) {
            await driver.deleteSession();
        }
    });
});