*** Settings ***
Documentation    This file contains common keywords and variables used with test suites.


*** Keywords ***
Check Headers
    [Documentation]    Checks that the headers are in order.
    Page Should Contain    Tulokset kategorioittain
    Element Text Should Be    class:strengths    Vahvuudet
    Element Text Should Be    class:weaknesses    Heikkoudet

Check Analysis

    ${analysis}=    Get WebElements    xpath=//p[contains(@class,'statement')]
    ${analysis_count}=    Get Length    ${analysis}
    Should Be Equal As Integers    ${analysis_count}    1