*** Settings ***
Documentation    This file contains common keywords and variables used with test suites.


*** Keywords ***
Go To Links Page
    [Documentation]    Clicks on the button that takes the user to the linkpage.
    Click Button    Linkkejä

Click On Link
    [Documentation]    Clicks on the link that takes the user to one of the links.
    Click Element    //*[@id="root"]/div/p/a[1]

Go Back To Front Page
    [Documentation]    Goes to the frontpage by clicking 'etusivulle' button.
    Click Button    Etusivulle
    Page Should Contain    Tieteellisen kirjoittamisen itsearviointitesti
