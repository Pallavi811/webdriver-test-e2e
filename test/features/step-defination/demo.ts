import { Given, Then, When } from "@wdio/cucumber-framework";

Given(/^Google page is opened$/, async () => {
  await browser.url("https://www.google.com");
  await browser.pause(10000); //7ms
});

When(/^Search with (.*)$/, async (searchitems) => {
  console.log(`>>> searchItems --- ${searchitems}`);
  let ele = await $(`[name=q]`);
  await ele.setValue(searchitems);
  await browser.keys("Enter");
});

Then(/^Click on first serach result$/, async () => {
  let ele = await $(`<h3>`);
  ele.click();
});

Then(/^URL Should match (.*)$/, async (expectedURL) => {
  console.log(`${expectedURL}`);
  
  await browser.waitUntil(async function () {
      return await browser.getTitle() === "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO";
  },{timeout: 20000 , interval: 500 , timeoutMsg : `Failed loading Page --->${await browser.getTitle()}`});

  
  let url = await browser.getUrl();
  expect(url).toEqual(expectedURL);
});

/**
 *  WebInteractions
 */
Given(/^A Web Page is opened$/, async () => {
  await browser.url("");
  await browser.setTimeout({ implicit: 15000, pageLoad: 10000 });
  await browser.maximizeWindow();
});

Given(/^Perform Input field web interaction$/, async () => {
  /**
   * 1. Input field with setValue and addValue
   * 2. Click and SetValue
   * 3. slow typeing
   */
  await browser.url("/inputs");
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

  await ele.moveTo();
  await ele.scrollIntoView();
  await ele.setValue("12345"); // setvalue clear the field before entering anything
  ele.addValue("12345"); //it will not clear the value before entering any input
  //addValue can be useful in file upload
  browser.pause(3000);
});

Given(/^Perform Dropdown web interaction$/, async () => {
  /**
   *  1. Dropdown handeling
   *
   */
  await browser.url("/dropdown");
  let ele = await $(`*//option[@selected='selected']`);
  let val = await ele.getText();
  expect(val).toEqual("Please select an option");
  await browser.pause(3000);
  // Selction of diff options
  let ddEle = await $("#dropdown");
  await ddEle.selectByVisibleText("Option 2");
  await browser.pause(6000);
  // Verification of all list present in dropdown option
  let eleArray = await $$(`select > option`);
  let arr = [];
  for (let i = 0; i < eleArray.length; i++) {
    let elea = eleArray[i];
    let val = await elea.getText();
    arr.push(val);
    console.log(val);
  }
  console.log(`>> Options Array : ${arr}`);
});

Given(/^Perform Checkbox web interaction$/, async () => {
  /**
   * checkbox webinteractions
   */
  await browser.url("/checkboxes");
  let ele = await $(`//*[@id="checkboxes"]/input[1]`);
  // ele.click();
  if (!(await ele.isSelected())) {
    await ele.click();
  }
  //let ele1 = await $(`//*[@id="checkboxes"]/input[2]`);
  //ele1.click();

  await browser.pause(6000);
  // selecting all element
  let eleArray = await $$(`//*[@id="checkboxes"]/input`);
  for (let i = 0; i < eleArray.length; i++) {
    let ele = eleArray[i];
    if (!(await ele.isSelected())) {
      ele.click();
    }
  }
});

Given(/^Perform Multiple Windows web interaction$/, async () => {
  /**
   * windows handeling
   * 1. Open another window
   * 2. Switch to window based on title
   * 3. Switch to main window again
   *
   * getTitle()
   * getWindowHandle()
   * getWindowHandles()
   * switchToWindow()
   *
   */

  await browser.url("/windows");
  await $(`=Click Here`).click();
  await $(`=Elemental Selenium`).click();
  let currentWindTitle = await browser.getTitle();
  console.log(`>>>> Current window Title ${currentWindTitle}`);
  let parentWindowHandle = await browser.getWindowHandle();

  // Switch to Specific window
  let winHandles = await browser.getWindowHandles();

  for (let i = 0; i < winHandles.length; i++) {
    await browser.switchToWindow(winHandles[i]);
    console.log(`>>>>>> Window Handle ${winHandles[i]}`);
    let currentWinTitle = await browser.getTitle();
    console.log(`>>>>> CurrentWindowTitle ${currentWinTitle}`);
    if (currentWinTitle === "Home | Elemental Selenium") {
      await browser.switchToWindow(winHandles[i]);
      let headerText = await $(`<h1>`).getText();
      await console.log(`>>>> Text of header-----> ${headerText}`);
      // Rest of action goes here....
      break;
    }
  }

  // switch back to parent window
  await browser.switchToWindow(parentWindowHandle);
  let parentWindowText = await $(`<h3>`).getText();
  console.log(`>>>> Parent Window---> ${parentWindowText}`);
  await browser.pause(3000);
});

Given(/^Perform Multiple Alert web interaction$/, async () => {
  /**
   * 1.isalertOpen();
   * 2.aceptAlert();
   * 3.dismissAlert();
   * 4.getAlertText();
   * 5.SendAlertText();
   *
   */
  await browser.url("/javascript_alerts");
  await $(`button=Click for JS Alert`).click();

  if (await browser.isAlertOpen()) {
    await browser.acceptAlert();
  }
  await $(`button=Click for JS Prompt`).click();
  if (await browser.isAlertOpen()) {
    await browser.sendAlertText("Hi");
    await browser.acceptAlert();
    await browser.pause(2000);
  }

  // Basic Auth
  await browser.url(
    "https://admin:admin@the-internet.herokuapp.com/basic_auth"
  );
  await browser.pause(3000);
});

Given(/^Perform File upload web interaction$/, async () => {
  await browser.url("/upload");
  await $(`#file-upload`).addValue(
    `${process.cwd()}/data/FileUpload/dummy.txt`
  );
  await $(`#file-submit`).click();
  await browser.pause(3000);
});

Given(/^Perform Frame web interaction$/, async () => {
  await browser.url("/framesclear");
  await $(`=iFrame`).click();
  await browser.pause(3000);
});
Given(/^Perform Key Press web interaction$/, async () => {
  await $(`=iFrame`).click();
  let ele = await $(`#mce_0_irf`);
  await browser.switchToFrame(ele);
  await $(`tinymce`).click();
  await browser.keys(["Meta", "A"]);
  await browser.pause(1000);
  await browser.keys("Delete");
  await $("#tinymce").addValue("typing into Frame...");
  await browser.pause(3000);
});
