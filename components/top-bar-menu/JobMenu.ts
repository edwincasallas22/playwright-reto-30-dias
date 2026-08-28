import { Locator, Page } from "@playwright/test";

export class JobMenu {

    private readonly page: Page
    private readonly job: Locator
    private readonly jobTitlesOption: Locator
    private readonly payGradesOption: Locator

    constructor(page: Page) {
        this.page = page
        this.job = page.getByRole('navigation', { name: 'Topbar menu' }).getByText('Job')
        this.jobTitlesOption = page.getByRole('menuitem', { name: 'Job Titles' })
        this.payGradesOption = page.getByRole('menuitem', { name: 'Pay Grades' })
    }

    private async clickOnJobs() {
        await this.job.click()
    }

    async clickOnJobTitles() {
        await this.clickOnJobs()
        await this.jobTitlesOption.click()
    }

    async clickOnPayGrades() {
        await this.clickOnJobs()
        await this.payGradesOption.click()
    }


}