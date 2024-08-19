Feature: Demo Feature
@timeout
Scenario Outline: Run First demo Feature
    Given Google page is opened   
    When Search with <SearchItems>
    Then Click on first serach result
    Then URL Should match <ExpectedURL>

        Examples:
            | TestID      | SearchItems |  ExpectedURL                 |
            | Demo_TC001  | WDIO        |  https://webdriver.io/       |
