*** Settings ***
Documentation    Tests for the frontpage of the app.

Resource    ../resources/app.resource
Suite Setup
...        Run Keywords
...        Open And Configure Browser
...        AND    Register Keyword To Run On Failure    Nothing
Suite Teardown    Close Browser
Test Setup    Go To Testpage
Test Tags    testpage


*** Test Cases ***
Select Statements and Click Seuraava
    [Documentation]    Select Statements and Click Seuraava, unclick one statement
    Go To Testpage

    Click Element    //div[contains(@class,'statement')]
    Click Element    //*[@id="root"]/div/div[3]
    Click Element    //div[contains(@class,'statement')]

    Click Button    //button[contains(text(), 'Seuraava')]

Test Statement Selection Limit
    [Documentation]   User cannot choose more than 3 statements
    Go To Testpage

    Click Element    //*[@id="root"]/div/div[3]
    Click Element    //*[@id="root"]/div/div[4]
    Click Element    //*[@id="root"]/div/div[5]
    Click Element    //*[@id="root"]/div/div[6]

    ${selected_statements}    Get WebElements    xpath=//div[contains(@class,'statement selected')]
    ${selected_count}    Get Length    ${selected_statements}

    Should Be Equal As Integers    ${selected_count}    3
