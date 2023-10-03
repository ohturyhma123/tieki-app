*** Settings ***
Documentation    Tests for the frontpage of the app.

Resource    suiteKeywords.resource
Resource    ../testpages/suiteKeywords.resource
Resource    ../../RF-keywords/CommonFunctions.resource

Suite Setup
...        Run Keywords
...        Open And Configure Browser
...        AND    Register Keyword To Run On Failure    Nothing
Suite Teardown    Close Browser

Test Setup    Go To Testpage
Test Tags    resultpage

*** Test Cases ***
Check resultpage
    [Documentation]    Goes through test and checks resultpage.
    FOR    ${index}    IN RANGE    1    10
            Go To Next Page
            Select Statements    1
        END

        Go To Next Page
        Go To Next Page
        Select Statements    1
        Go To Last Page

        Check Headers
        Check Analysis
        Go Back To Frontpage