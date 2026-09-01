import { expect, test } from '@playwright/test'
import { LoginPage } from '../pageobjects/LoginPage'
import { SideMenuOption, SidePanel } from '../components/SidePanel'
import { TopBarMenu } from '../components/top-bar-menu/TopBarMenu'

test.describe('Verify HRM page', () => {

    test('Get all the usernames registered', async ({ page }) => {

        const loginPage = new LoginPage(page)
        await loginPage.doLogin('Admin', 'admin123')

        await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()

        await page.getByRole('link', { name: 'Admin' }).click()
        await page.getByRole('navigation', { name: 'Topbar menu' }).getByText('User Management').click()
        await page.getByRole('menuitem', { name: 'Users' }).click()

        const rows = page.getByRole('table').getByRole('row')
        const usernames: string[] = []

        const rowCount = await rows.count()

        for (let i = 1; i < rowCount; i++) {
            const cell = rows.nth(i).getByRole('cell').nth(1)
            const username = await cell.textContent()
            if (username) {
                usernames.push(username)
            }
        }
        console.log(usernames)

    })


    test('Get all the Employee names registered', async ({ page }) => {

        const loginPage = new LoginPage(page)
        await loginPage.doLogin('Admin', 'admin123')

        await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()

        await page.getByRole('link', { name: 'Admin' }).click()
        await page.getByRole('navigation', { name: 'Topbar menu' }).getByText('User Management').click()
        await page.getByRole('menuitem', { name: 'Users' }).click()

        const rows = page.getByRole('table').getByRole('row')
        const employeeNames: string[] = []

        const rowCount = await rows.count()

        for (let i = 1; i < rowCount; i++) {
            const cell = rows.nth(i).getByRole('cell').nth(3)
            const employeeName = await cell.textContent()
            if (employeeName) {
                employeeNames.push(employeeName)
            }
        }
        console.log(employeeNames)

    })



    test('Select random users except Admin for edition', async ({ page }) => {

        const loginPage = new LoginPage(page)
        await loginPage.doLogin('Admin', 'admin123')

        await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()

        await page.getByRole('link', { name: 'Admin' }).click()
        await page.getByRole('navigation', { name: 'Topbar menu' }).getByText('User Management').click()
        await page.getByRole('menuitem', { name: 'Users' }).click()

        const validRows = page
            .getByRole('table')
            .getByRole('row')
            .filter({ has: page.locator('button') })
            .filter({ hasNotText: 'Admin' })

        const rowCount = await validRows.count()
        const randomIndex = Math.floor(Math.random() * rowCount);

        const selectedRow = validRows.nth(randomIndex);

        const expectedUserName = await selectedRow
            .getByRole('cell')
            .nth(1)
            .innerText();

        const pencilToEdit = selectedRow
            .locator('button')
            .filter({ has: page.locator('i.bi-pencil-fill') })

        await pencilToEdit.click()

        const currentUsername = page.locator("//label[contains(.,'Username')]/parent::div/following-sibling::div/input")
        await expect(currentUsername).toBeVisible({ timeout: 10000 });

        //   expect(await currentUsername.inputValue()).toEqual(userForEdition)
        await expect(currentUsername).toHaveValue(expectedUserName)
    })

    test('Check user role options', async ({ page }) => {

        const expectedRoleOptions = ['-- Select --', 'Admin', 'ESS']

        const loginPage = new LoginPage(page)
        await loginPage.loginAsAdmin()

        const sidePanel = new SidePanel(page)
        await sidePanel.clickOnOption(SideMenuOption.ADMIN)

        await page.locator("//label[contains(.,'User Role')]/parent::div/following-sibling::div").click()


        const currentUserRoleOptions = await page.getByRole('listbox').getByRole('option').allInnerTexts()

        console.log(currentUserRoleOptions)

        expect(currentUserRoleOptions, 'The options displayed in the user Role Dropdown do not match the expected options.').toEqual(expectedRoleOptions)

    })

    test('Filter by user Admin', async ({ page }) => {

        const loginPage = new LoginPage(page)
        await loginPage.loginAsAdmin()

        const sidePanel = new SidePanel(page)
        await sidePanel.clickOnOption(SideMenuOption.ADMIN)

        const allBodyRows = page.getByRole('table').getByRole('rowgroup').nth(1).getByRole('row')

        //Filas que contienen el Role Admin 
        const currentAdminsRows = allBodyRows.filter({
            has: page.getByRole('cell').nth(2).getByText('Admin')
        })

        const expectedAdminCount = await currentAdminsRows.count()

        console.log('Admin Users before filtering: ', expectedAdminCount)

        //Aplicar filtro 
        await page.locator("//label[contains(.,'User Role')]/parent::div/following-sibling::div").click()
        await page.getByRole('listbox').getByRole('option', { name: 'Admin' }).click()
        await page.getByRole('button', { name: 'Search' }).click()

        //La tabla filtrada deberia tener excatamente la misma cantidad que encontramos 


        await expect(allBodyRows).toHaveCount(expectedAdminCount)


        for (let i = 0; i < expectedAdminCount; i++) {
            await expect(allBodyRows.nth(i).getByRole('cell').nth(2)).toContainText('Admin')
        }

    })


    test('Capture all amounts', async ({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage.doLogin('Admin', 'admin123')

        await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()


        const sidePanel = new SidePanel(page)
        await sidePanel.clickOnOption(SideMenuOption.CLAIM)


        const allBodyRows = page.getByRole('table').getByRole('rowgroup').nth(1).getByRole('row')

        const amounts: number[] = []

        const rowCount = await allBodyRows.count()
        console.log('Number of rows', rowCount)

        for (let i = 0; i < rowCount; i++) {
            const amountCell = allBodyRows.nth(i).getByRole('cell').nth(7)
            const amountText = await amountCell.textContent()
            console.log("This is the amount in text: ", amountText)

            if (amountText === null) {
                continue
            }
            const convertedNumber = parseFloat(amountText?.replace(/,/g, '').trim())

            amounts.push(convertedNumber)
        }

        console.log(amounts)

        let total = 0

        for (let amount of amounts) {
            total += amount
        }

        console.log("Total is: ", total)

    })


    test('Add new user', async ({ page }) => {
        const randomUserName = 'goku' + crypto.randomUUID()
        const password = 'R4mdom45..*'
        const employeeToSearch = 'Qwerty LName'


        const loginPage = new LoginPage(page)
        await loginPage.doLogin('Admin', 'admin123')

        await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()


        const sidePanel = new SidePanel(page)
        await sidePanel.clickOnOption(SideMenuOption.ADMIN)

        const topBarMenu = new TopBarMenu(page)
        await topBarMenu.userManagement.clickOnUsersOption()
        await page.getByText('Add').click()
        await page.locator('div.oxd-grid-item--gutters')
            .filter({ has: page.getByText('User Role') })
            .locator('div.oxd-select-text-input')
            .click()

        await page.getByText('ESS', { exact: true }).click()
        await page.getByRole('textbox', { name: 'Type for hints...' }).fill(employeeToSearch)
        await page.getByText('Qwerty Qwerty LName', { exact: true }).click()

        await page.locator('div.oxd-grid-item--gutters')
            .filter({ has: page.getByText('Status') })
            .locator('div.oxd-select-text-input')
            .click()
        await page.getByText('Enabled', { exact: true }).click()

        await page.locator('div.oxd-grid-item--gutters')
            .filter({ has: page.getByText('Username') })
            .getByRole('textbox')
            .fill(randomUserName)

        await page.locator('div.oxd-grid-item--gutters')
            .filter({ has: page.getByText('Password', { exact: true }) })
            .getByRole('textbox')
            .fill(password)

        await page.locator('div.oxd-grid-item--gutters')
            .filter({ has: page.getByText('Confirm Password', { exact: true }) })
            .getByRole('textbox')
            .fill(password)


        await page.getByRole('button', { name: 'Save' }).click()

        await expect(page.locator('p.oxd-text--toast-message')).toHaveText('Successfully Saved')
    })
})