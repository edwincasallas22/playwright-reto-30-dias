import {expect, test} from '@playwright/test'

test.describe('Verify HRM page', () =>{
    test.beforeEach(async({page}) =>{
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    })


test('Verify successful login', async({page}) =>{    
    await page.getByRole('textbox', {name:'Username'}).fill('Admin')
    await page.getByRole('textbox', {name:'Password'}).fill('admin123')
    await page.getByRole('button', {name:'Login'}).click()

    await expect(page.getByRole('link', {name:'Admin'})).toBeVisible()
})

test('Enter invalid credentials', async({page}) =>{
    
    await page.getByRole('textbox', {name:'Username'}).fill('User')
    await page.getByRole('textbox', {name:'Password'}).fill('User123')
    await page.getByRole('button', {name:'Login'}).click()

    await expect(page.getByRole('alert')).toHaveText('Invalid credentials')
})

test('Enter special characters', async({page}) =>{
    
    await page.getByRole('textbox', {name:'Username'}).fill('!"#$%&/()')
    await page.getByRole('textbox', {name:'Password'}).fill('!"#$%&/()')
    await page.getByRole('button', {name:'Login'}).click()

    await expect(page.getByText('Invalid credentials')).toBeVisible()
})

test('Verify empty fields', async({page}) =>{
    
    await page.getByRole('button', {name:'Login'}).click()

    await expect(page.getByText('Required')).toHaveCount(2)
})

})