*** Settings ***
Documentation    This file contains common keywords and variables used with test suites.


*** Keywords ***
Header Is Correct
    [Documentation]    Checks that right page is opened.
    Page Should Contain   Hyödyllisiä linkkejä

Click On Link
    [Documentation]    Clicks on the link that takes the user to one of the links.
    Click Element    id=1

Keyboard Press Link
    [Documentation]    Use keyboard to press the link that takes the user to one of the links.
    Set Focus To Element    id=1
    Press Keys    None    ENTER

Go Back To Front Page
    [Documentation]    Goes to the frontpage by clicking 'etusivulle' button.
    Click Element    //*[@class="navbar-logo"]
    Page Should Contain    Tieteellisen kirjoittamisen itsearviointitesti

Go Back To Front Page Using Keyboard
    [Documentation]    Goes to the frontpage by clicking 'etusivulle' button.
    Set Focus To Element    //*[@class="navbar-logo"]
    Press Keys    None    ENTER
    Page Should Contain    Tieteellisen kirjoittamisen itsearviointitesti
