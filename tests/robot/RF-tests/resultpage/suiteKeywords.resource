*** Settings ***
Documentation    This file contains common keywords and variables used with test suites.


*** Keywords ***
Go To Resultpage
    [Documentation]    Goes to the Resultpage
    Go To Testpage
    Wait Until Page Contains    jotka kuvaavat sinua parhaiten
    # robocop: disable
    FOR    ${index}    IN RANGE    1    12
        Go To Next Page
        Select Statements    1
    END
    # robocop: enable
    Click Button    Tulokset
    Click Button    Kyllä

Check Headers
    [Documentation]    Checks that the headers are in order.
    Wait Until Page Contains    Tulokset
    Element Text Should Be    class:strengths    Vahvuudet
    Element Text Should Be    class:weaknesses    Kehityskohteet

Check Analysis
    [Documentation]    Checks that two analyses is shown.
    Wait Until Page Contains    Tulokset
    ${analysis}=    Get WebElements    xpath=//*[@id="panel1a-content"]
    ${analysis_count}=    Get Length    ${analysis}
    Should Be Equal As Integers    ${analysis_count}    2

Go To PDF View
    [Documentation]    Clicks the link that takes user to pdf view of the results.
    Wait Until Page Contains    Tulokset
    Click Link    Näytä tulokset PDF-tiedostona
    ${pdf_url}=    Get Location
    Should Be Equal    ${pdf_url}    ${APP_URL}/pdfview
