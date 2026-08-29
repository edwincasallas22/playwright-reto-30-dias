import { test as setup, expect } from '@playwright/test'
import { LoginPage } from '../pageobjects/LoginPage'


setup('Authentication as Admin', async ({ page }) => {

    console.log('Authentication iniciada usando el setup')
    //iniciar sesion 
    const loginPage = new LoginPage(page)
    await loginPage.loginAsAdmin()

    //Nos aseguramos que el inicio de sesion es exitoso
    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()

    //Guardar el estado 
    await page.context().storageState({ path: '.auth/admin.json' })

    console.log('Authentication completada usando el setup')
})