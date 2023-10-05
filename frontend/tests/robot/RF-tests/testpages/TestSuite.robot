*** Settings ***
Documentation    Tests for the frontpage of the app.

Resource    suiteKeywords.resource
Resource    ../../RF-keywords/CommonFunctions.resource

Suite Setup
...        Run Keywords
...        Open And Configure Browser
...        AND    Register Keyword To Run On Failure    Nothing
Suite Teardown    Close Browser

Test Setup    Go To Testpage
Test Tags    testpage


*** Test Cases ***
User Can Select Three Statements
    [Documentation]    Checks that an user is able to select 0-3 statements
    Select Statements    3
    ${statements}=    Number Of Statements Clicked
    Should Be Equal As Integers    ${statements}    3

User Can't Select More Than Three Statements
    [Documentation]    Checks that the user cannot select more than 3 statements
    Select Statements    4
    ${statements}=    Number Of Statements Clicked
    Should Be Equal As Integers    ${statements}    3

User Can Go Through All Test Pages
    [Documentation]    Checks that the user is able to go through every test page
    ...                and is able to select statements from each page.
    # robocop: disable
    FOR    ${index}    IN RANGE    1    12
        Go To Next Page
        Select Statements    1
    END
    # robocop: enable
    Go To Last Page

User Can Go Back To Front Page
    [Documentation]    Checks that the user is able to go back to the frontpage.
    Go Back To Front Page