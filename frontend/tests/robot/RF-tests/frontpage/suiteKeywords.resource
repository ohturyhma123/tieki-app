*** Settings ***
Documentation    This file contains common keywords and variables used with test suites.


*** Keywords ***
Title Is Correct
    [Documentation]    Checks that the correct title is shown.
    Title Should Be    Tieki

Check Header
    [Documentation]    Checks that the header is correct
    Element Text Should Be    tag:h1    Tieteellisen kirjoittamisen itsearviointitesti

Check Intro
    [Documentation]    Checks that intro text is shown on front page.
    Page Should Contain    Tämän testin avulla voit arvioida osaamistasi tieteellisen tekstin kirjoittajana.

Go To Test
    [Documentation]    Clicks on the button that takes the user to the test.
    Click Button    id=statementsRoute

First Test Page
    [Documentation]    Checks that the first test page is shown correctly
    Page Should Contain    Väittämäsetti 1/12

Go To Linkpage
    [Documentation]    Clicks on the button that takes the user to the linkpage.
    Click Link    Linkit
    Page Should Contain    Hyödyllisiä linkkejä
