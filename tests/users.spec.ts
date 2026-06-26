import { expect, test } from '@playwright/test'

test.describe('Verify HRM page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    })


    test('Get all the usernames registered', async ({ page }) => {

        await page.getByRole('textbox', { name: 'Username' }).fill('Admin')
        await page.getByRole('textbox', { name: 'Password' }).fill('admin123')
        await page.getByRole('button', { name: 'Login' }).click()

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

        await page.getByRole('textbox', { name: 'Username' }).fill('Admin')
        await page.getByRole('textbox', { name: 'Password' }).fill('admin123')
        await page.getByRole('button', { name: 'Login' }).click()

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

        await page.getByRole('textbox', { name: 'Username' }).fill('Admin')
        await page.getByRole('textbox', { name: 'Password' }).fill('admin123')
        await page.getByRole('button', { name: 'Login' }).click()

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
})