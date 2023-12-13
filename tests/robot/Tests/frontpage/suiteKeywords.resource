*** Settings ***
Documentation    This file contains common keywords and variables used with test suites.


*** Keywords ***
Title Is Correct
    [Documentation]    Checks that the correct title is shown.
    Title Should Be    Tieki – Tieteellisen kirjoittamisen itsearviointitesti

Check Intro
    [Documentation]    Checks that intro text is shown on front page.
    Page Should Contain    Tämän testin avulla voit arvioida osaamistasi tieteellisen tekstin kirjoittajana.

Go To Test
    [Documentation]    Clicks on the button that takes the user to the test.
    Click Button    id=statementsRoute

Go To Test Using Keyboard
    [Documentation]    Use keyboard to press the button that takes the user to the test.
    Set Focus To Element    id:statementsRoute
    Press Keys    None    ENTER

First Test Page
    [Documentation]    Checks that the first test page is shown correctly
    Wait Until Page Contains    jotka kuvaavat sinua parhaiten

Go To Linkpage
    [Documentation]    Clicks on the button that takes the user to the linkpage.
    Wait Until Keyword Succeeds    3x    200ms    Click Link    Linkit
    Wait Until Page Contains    Hyödyllisiä linkkejä

Go To Linkpage Using Keyboard
    [Documentation]    Use keyboard to press the button that takes the user to the linkpage.
    Set Focus To Element    //*[@id="root"]/div[1]/header/div/ul/li[1]/a
    Press Keys    None    ENTER
    Wait Until Page Contains    Hyödyllisiä linkkejä

Go To About Page
    [Documentation]    Clicks on the button that takes the user to the about page.
    Wait Until Keyword Succeeds    3x    200ms    Click Link    Tekijät
    Wait Until Page Contains    Tieteellisen kirjoittamisen itsearviointitestin sisällön

Go To About Page Using Keyboard
    [Documentation]    Use keyboard to press the button that takes the user to the about page.
    Set Focus To Element    //*[@id="root"]/div[1]/header/div/ul/li[2]/a
    Press Keys    None    ENTER
    Wait Until Page Contains    Tieteellisen kirjoittamisen itsearviointitestin sisällön

Go To Feedback Form
    [Documentation]    Clicks on the link that takes the user to the feedback form.
    Wait Until Keyword Succeeds    3x    200ms    Click Link    Anna palautetta testistä
    Sleep    3
    ${locs}=    Get Locations
    Should Be Equal    ${locs[1]}    https://elomake.helsinki.fi/lomakkeet/126370/lomake.html
