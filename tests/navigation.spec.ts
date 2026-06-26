import { test, expect } from '@playwright/test'


test.describe('Verify left menu options', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    })



    test('Check left menu options', async ({ page }) => {
        await page.getByRole('textbox', { name: 'Username' }).fill('Admin')
        await page.getByRole('textbox', { name: 'Password' }).fill('admin123')
        await page.getByRole('button', { name: 'Login' }).click()

        await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()

        const leftMenuItems = page.getByLabel('Sidepanel').getByRole('listitem')
        const currentMenuItemsCount = await leftMenuItems.count()
        console.log('Current menu items count', currentMenuItemsCount)

        const currentMenuItems: String[] = []

        for (let i = 0; i < currentMenuItemsCount; i++) {
            const menuText = await leftMenuItems.nth(i).innerText()
            currentMenuItems.push(menuText)
        }

        console.log(currentMenuItems)

        const expectedMenuItems = [
            'Admin',
            'PIM',
            'Leave',
            'Time',
            'Recruitment',
            'My Info',
            'Performance',
            'Dashboard',
            'Directory',
            'Maintenance',
            'Claim',
            'Buzz'
        ]
        expect(currentMenuItems).toEqual(expectedMenuItems)
        expect(currentMenuItems[0]).toBe('Admin')
        await expect(leftMenuItems.first()).toContainText('Admin')
    })


    test('Navigate through hte left panel', async ({ page }) => {

        await page.getByRole('textbox', { name: 'Username' }).fill('Admin')
        await page.getByRole('textbox', { name: 'Password' }).fill('admin123')
        await page.getByRole('button', { name: 'Login' }).click()

        await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()
        const currentMenuItemsCount = await page.getByLabel('Sidepanel').getByRole('listitem').count()

        for (let i = 0; i < currentMenuItemsCount; i++) {

            const leftMenuItems = page.getByLabel('Sidepanel').getByRole('listitem')


            const menuItem = leftMenuItems.nth(i)
            const menuText = await menuItem.innerText()

            console.log('Current menu item: ', menuText)
            await menuItem.click()
            await page.waitForLoadState('domcontentloaded');

            if (menuText === 'Maintenance') {
                await page.goBack({ waitUntil: 'domcontentloaded' });
                await expect(page.getByLabel('Sidepanel')).toBeVisible();
            }

        }

    })


    test('Check all the qualification links', async ({ page }) => {
        const expectedPages = [
            {
                menu: 'Skills',
                url: '/web/index.php/admin/viewSkills'
            },
            {
                menu: 'Education',
                url: '/web/index.php/admin/viewEducation'
            },
            {
                menu: 'Licenses',
                url: '/web/index.php/admin/viewLicenses'
            }
        ]

        await page.getByRole('textbox', { name: 'Username' }).fill('Admin')
        await page.getByRole('textbox', { name: 'Password' }).fill('admin123')
        await page.getByRole('button', { name: 'Login' }).click()

        await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()

        await page.getByRole('link', { name: 'Admin' }).click()
        await page.getByRole('navigation', { name: 'Topbar menu' }).getByText('Qualifications').click()

        const qualificationOptions = page.getByRole('menu').locator('li')

        for (let expectedPage of expectedPages) {
            const menuOption = qualificationOptions.filter({ hasText: expectedPage.menu })
            await menuOption.click()
            await expect(page).toHaveURL(new RegExp(expectedPage.url))
            await page.getByRole('navigation', { name: 'Topbar menu' }).getByText('Qualifications').click()
        }

    })

    test('Check all the Configuration links', async ({ page }) => {
        const expectedPages = [
            {
                menu: 'Email Configuration',
                url: '/web/index.php/admin/listMailConfiguration'
            },
            {
                menu: 'Email Subscriptions',
                url: '/web/index.php/admin/viewEmailNotification'
            },
            {
                menu: 'Localization',
                url: '/web/index.php/admin/localization'
            }
        ]

        await page.getByRole('textbox', { name: 'Username' }).fill('Admin')
        await page.getByRole('textbox', { name: 'Password' }).fill('admin123')
        await page.getByRole('button', { name: 'Login' }).click()

        await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()

        await page.getByRole('link', { name: 'Admin' }).click()
        await page.getByRole('navigation', { name: 'Topbar menu' }).getByText('Configuration').click()

        const configurationOptions = page.getByRole('menu').locator('li')

        for (let expectedPage of expectedPages) {
            const menuOption = configurationOptions.filter({ hasText: expectedPage.menu })
            await menuOption.click()
            await expect(page).toHaveURL(new RegExp(expectedPage.url))
            await page.getByRole('navigation', { name: 'Topbar menu' }).getByText('Configuration').click()
        }

    })

})