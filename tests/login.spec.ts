import { expect, test } from '@playwright/test'
import { LoginPage } from '../pageobjects/LoginPage'
import { SideMenuOption, SidePanel } from '../components/SidePanel'

test.describe('Verify HRM page', () => {


    test('Verify successful login', async ({ page }) => {

        const loginPage = new LoginPage(page)
        await loginPage.doLogin('Admin', 'admin123')

        const sidePanel = new SidePanel(page)
        await sidePanel.clickOnOption(SideMenuOption.RECRUITMENT)
        await sidePanel.clickOnOption(SideMenuOption.BUZZ)
        await sidePanel.clickOnOption(SideMenuOption.LEAVE)
        await sidePanel.clickOnOption(SideMenuOption.MY_INFO)
        await sidePanel.clickOnOption(SideMenuOption.PIM)

        await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()
    })

    test('Enter invalid credentials', async ({ page }) => {

        const loginPage = new LoginPage(page)
        await loginPage.doLogin('User', 'User123')

        await expect(page.getByRole('alert')).toHaveText('Invalid credentials')
    })

    test('Enter special characters', async ({ page }) => {

        const loginPage = new LoginPage(page)
        await loginPage.doLogin('!"#$%&/()', '!"#$%&/()')

        await expect(page.getByText('Invalid credentials')).toBeVisible()
    })

    test('Verify empty fields', async ({ page }) => {

        const loginPage = new LoginPage(page)
        await loginPage.doLogin('', '')

        await expect(page.getByText('Required')).toHaveCount(2)
    })

    test('Verify input search', async ({ page }) => {

        const loginPage = new LoginPage(page)
        await loginPage.doLogin('Admin', 'admin123')

        await page.getByRole('textbox', { name: 'Search' }).fill(SideMenuOption.LEAVE)

        const result = await page.getByLabel('Sidepanel').locator('ul.oxd-main-menu').innerText()
        expect(result).toEqual(SideMenuOption.LEAVE)
    })

})