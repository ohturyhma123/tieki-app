*** Settings ***
Documentation    This file contains common keywords and variables used with test suites.


*** Keywords ***
Select Statements
    [Documentation]    Selects given amount of statements on page.
    [Arguments]    ${amount}
    ${end_index}=    Evaluate    ${amount}+${1}
    FOR    ${index}    IN RANGE    1    ${end_index}
        Click Element    //*[@id="root"]/div/div[2]/div/div[${index}]
    END

Number Of Statements Clicked
    [Documentation]    Counts statements clicked on a test page.
    ${selected_statements}=    Get WebElements    xpath=//div[contains(@class,'statement selected')]
    ${selected_count}=    Get Length    ${selected_statements}
    RETURN    ${selected_count}

Go To Next Page
    [Documentation]    Clicks the 'seuraava' button
    Click Button    Seuraava
    Page Should Contain    Väittämäsetti

Go To Previous Page
    [Documentation]    Clicks the 'edellinen' button
    [Arguments]    ${set_number}
    Click Button    Edellinen
    Page Should Contain    Väittämäsetti ${set_number}/12

Go To Last Page
    [Documentation]    After 12th statement page, goes to the last page and confirms the alert.
    Click Button    Tulokset
    Click Button    Kyllä
    Page Should Contain    Tulokset

Go Back To Front Page
    [Documentation]    Goes to the frontpage by clicking 'etusivulle' button.
    Click Link    //*[@class="navbar-logo"]
    Page Should Contain    Tieteellisen kirjoittamisen itsearviointitesti
