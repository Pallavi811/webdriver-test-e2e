Feature: Web Interaction
@demo
Scenario Outline: Demo Web Interaction 
    Given A Web Page is opened  
    When Perform web interaction    

        Examples:
            | TestID      | SearchItems |  ExpectedURL                 |
            | Demo_TC001  | WDIO        |  https://webdriver.io/       |
