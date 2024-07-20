import { Given, Then, When} from "@wdio/cucumber-framework";


Given(/^Google page is opened$/, async() => {
    await browser.url("https://www.google.com");
    await browser.pause(10000); //7ms

});

When(/^Search with (.*)$/ , async(searchitems) => {
    console.log(`>>> searchItems --- ${searchitems}`);
    let ele = await $(`[name=q]`);
    await ele.setValue(searchitems);
    await browser.keys("Enter");
});

Then(/^Click on first serach result$/ , async() => {
    let ele = await $(`<h3>`);
    ele.click();
});

Then(/^URL Should match (.*)$/ , async(expectedURL) => {
    let url = await browser.getUrl();
    expect(url).toEqual(expectedURL);
});



