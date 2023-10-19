*** Settings ***
Documentation    This file contains common keywords and variables used with test suites.


*** Keywords ***
Select Statements
    [Documentation]    Selects given amount of statements on page.
    [Arguments]    ${amount}
    ${end_index}=    Evaluate    ${amount}+${1}
    FOR    ${index}    IN RANGE    1    ${end_index}
        Click Element    //*[@id="root"]/div[2]/div/div[${index}]
    END

Select Statements Using Keyboard
    [Documentation]    Selects given amount of statements on page using keyboard.
    [Arguments]    ${amount}
    ${end_index}=    Evaluate    ${amount}+${1}
    # robocop: disable
    FOR    ${index}    IN RANGE    1    ${end_index}
        Set Focus To Element    //*[@id="root"]/div[2]/div/div[${index}]
        Press Keys    None    ENTER
    END
    # robocop: enable

Number Of Statements Clicked
    [Documentation]    Counts statements clicked on a test page.
    ${selected_statements}=    Get WebElements    xpath=//div[contains(@class,'statement selected')]
    ${selected_count}=    Get Length    ${selected_statements}
    RETURN    ${selected_count}

Go To Next Page
    [Documentation]    Clicks the 'seuraava' button
    Click Button    Seuraava
    Page Should Contain    jotka kuvaavat sinua parhaiten

Go To Next Page Using Keyboard
    [Documentation]    Presses the 'seuraava' button
    Set Focus To Element    id:next-btn
    Press Keys    None    ENTER
    Page Should Contain    jotka kuvaavat sinua parhaiten

Go To Previous Page
    [Documentation]    Clicks the 'edellinen' button
    [Arguments]    ${set_number}
    Click Button    Edellinen
    Page Should Contain    ${set_number} / 12

Go To Previous Page Using Keyboard
    [Documentation]    Presses the 'edellinen' button
    [Arguments]    ${set_number}
    Set Focus To Element    id:previous-btn
    Press Keys    None    ENTER
    Page Should Contain    ${set_number} / 12

Go To Last Page
    [Documentation]    After 12th statement page, goes to the last page and confirms the alert.
    Click Button    Tulokset
    Click Button    Kyllä
    Page Should Contain    Tulokset

Go To Last Page Using Keyboard
    [Documentation]    After 12th statement page, goes to the last page and confirms the alert, using keyboard.
    Set Focus To Element    id:results-btn
    Press Keys    None    ENTER
    Set Focus To Element    //*[@class="yes-btn"]
    Press Keys    None    ENTER
    Page Should Contain    Tulokset

Go Back To Front Page
    [Documentation]    Goes to the frontpage by clicking 'etusivulle' button.
    Click Link    //*[@class="navbar-logo"]
    Page Should Contain    Tieteellisen kirjoittamisen itsearviointitesti

Go Back To Front Page Using Keyboard
    [Documentation]    Goes to the frontpage by pressing the 'etusivulle' button.
    Set Focus To Element    //*[@class="navbar-logo"]
    Press Keys    None    ENTER
    Page Should Contain    Tieteellisen kirjoittamisen itsearviointitesti
