*** Settings ***
Documentation    This file contains common keywords and variables used with test suites.


*** Keywords ***
Go To Resultpage
    [Documentation]    Goes to the Resultpage
    Go To Testpage
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
    Page Should Contain    Tulokset kategorioittain
    Element Text Should Be    class:strengths    Vahvuudet
    Element Text Should Be    class:weaknesses    Heikkoudet

Check Analysis
    [Documentation]    Checks that only one analysis is shown.
    ${analysis}=    Get WebElements    xpath=//*[@id="panel1a-content"]
    ${analysis_count}=    Get Length    ${analysis}
    Should Be Equal As Integers    ${analysis_count}    2
