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

/**
 *  WebInteractions
 */
Given(/^A Web Page is opened$/ , async() => {
    await browser.url("/inputs");
    await browser.setTimeout({implicit : 15000 , pageLoad : 10000});
    await browser.maximizeWindow();
});

Given(/^Perform web interaction$/, async() => {
    /**
     * 1. Input field with setValue and addValue
     * 2. Click and SetValue
     * 3. slow typeing 
     */
    let num = 12345;
    let strnum = num.toString();
    let ele = await $(`input[type=number]`);
    await ele.click();
    // Slow typeing
    for (let i = 0; i < strnum.length; i++) {
        let charStr = strnum.charAt(i);
        await browser.pause(1000);
        await browser.keys(charStr);
    }

    // await ele.moveTo();
    // await ele.scrollIntoView();
    // await ele.setValue("12345"); // setvalue clear the field before entering anything 
    // ele.addValue("12345") it will not clear the value before entering any input
    // addValue can be useful in file upload
    browser.pause(3000);
    

});


