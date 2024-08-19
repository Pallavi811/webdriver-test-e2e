Feature: Web Interaction
@demo
Scenario Outline: Demo Web Interaction 
    Given A Web Page is opened  
    # When Perform Input field web interaction
    # Then Perform Dropdown web interaction
    # Then Perform Checkbox web interaction 
    # Then Perform Multiple Windows web interaction
    # Then Perform Multiple Alert web interaction
    # Then Perform File upload web interaction
    Then Perform Frame web interaction      

        Examples:
            | TestID      | SearchItems |  ExpectedURL                 |
            | Demo_TC001  | WDIO        |  https://webdriver.io/       |
