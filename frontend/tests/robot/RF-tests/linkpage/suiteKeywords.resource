*** Settings ***
Documentation    This file contains common keywords and variables used with test suites.


*** Keywords ***
Header Is Correct
    [Documentation]    Checks that right page is opened.
    Page Should Contain   Hyödyllisiä linkkejä

Click On Link
    [Documentation]    Clicks on the link that takes the user to one of the links.
    Click Element    //*[@id="root"]/div/div[2]/div/p/a[1]

Go Back To Front Page
    [Documentation]    Goes to the frontpage by clicking 'etusivulle' button.
    Click Element    //*[@id="root"]/div/div[1]/nav/div/a
    Page Should Contain    Tieteellisen kirjoittamisen itsearviointitesti
