*** Settings ***
Documentation    This file contains common keywords and variables used with test suites.


*** Keywords ***
Title Is Correct
    [Documentation]    Checks that the correct title is shown.
    Title Should Be    Tieki

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
    Wait Until Keyword Succeeds    3x    200ms    Click Link    Hyödyllisiä linkkejä
    Wait Until Page Contains    Hyödyllisiä linkkejä

Go To Linkpage Using Keyboard
    [Documentation]    Use keyboard to press the button that takes the user to the linkpage.
    Set Focus To Element    //*[@id="root"]/div[1]/header/div/ul/li[1]/a
    Press Keys    None    ENTER
    Wait Until Page Contains    Hyödyllisiä linkkejä
