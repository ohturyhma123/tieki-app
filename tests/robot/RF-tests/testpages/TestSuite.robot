*** Settings ***
Documentation    Tests for the frontpage of the app.

Resource    suiteKeywords.resource
Resource    ../../RF-keywords/CommonFunctions.resource

Test Setup
...        Run Keywords
...        Open And Configure Browser
...        AND    Go To Testpage
...        AND    Wait Until Page Contains    jotka kuvaavat sinua parhaiten
...        AND    Register Keyword To Run On Failure    Nothing
Test Teardown    Close Browser

Test Tags    testpage


*** Test Cases ***
User Can Select Three Statements
    [Documentation]    Checks that an user is able to select 0-3 statements
    Select Statements    3
    ${statements}=    Number Of Statements Clicked
    Should Be Equal As Integers    ${statements}    3

User Can Select Three Statements Using Keyboard
    [Documentation]    Checks that an user is able to select 0-3 statements using keyboard only
    Select Statements Using Keyboard    3
    ${statements}=    Number Of Statements Clicked
    Should Be Equal As Integers    ${statements}    3

User Can't Select More Than Three Statements
    [Documentation]    Checks that the user cannot select more than 3 statements
    Select Statements    4
    ${statements}=    Number Of Statements Clicked
    Should Be Equal As Integers    ${statements}    3

User Can't Select More Than Three Statements Using Keyboard
    [Documentation]    Checks that the user cannot select more than 3 statements using keyboard only
    Select Statements Using Keyboard    4
    ${statements}=    Number Of Statements Clicked
    Should Be Equal As Integers    ${statements}    3

User Can Go Through All Test Pages
    [Documentation]    Checks that the user is able to go through every test page
    ...                and is able to select statements from each page. Before proceeding to
    ...                the results page, user sees an alert.
    # robocop: disable
    FOR    ${index}    IN RANGE    1    12
        Go To Next Page
        Select Statements    1
    END
    # robocop: enable
    Go To Last Page

User Can Go Through All Test Pages Using Keyboard
    [Documentation]    Checks that the user is able to go through every test page using keyboard only
    ...                and is able to select statements from each page. Before proceeding to
    ...                the results page, user sees an alert.
    # robocop: disable
    FOR    ${index}    IN RANGE    1    12
        Select Statements Using Keyboard    1
        Go To Next Page Using Keyboard
    END
    # robocop: enable
    Go To Last Page Using Keyboard

User Can Go Back To Previous Test Page And See Selected Statements
    [Documentation]    Checks that the user is able to go back to previous test pages
    ...                and see statemenets selected.
    Select Statements    3
    Go To Next Page
    Select Statements    2
    Go To Previous Page    1
    ${previous_statements}=    Number Of Statements Clicked
    Should Be Equal As Integers    ${previous_statements}    3

User Is Able To Only Select Three Statements In Total On Previous Page
    [Documentation]    Checks that the user cannot choose more than 3 statements if navigating back to
    ...                previous statement set.
    Select Statements    2
    Go To Next Page
    Go To Previous Page    1
    Select Statements    2
    Select Statements    6
    ${previous_statements}=    Number Of Statements Clicked
    Should Be Equal As Integers    ${previous_statements}    3

User Is Able To Only Select Three Statements In Total On Previous Page Using Keyboard
    [Documentation]    Checks that the user cannot choose more than 3 statements if navigating back to
    ...                previous statement set, while using keyboard.
    Select Statements Using Keyboard    2
    Go To Next Page Using Keyboard
    Go To Previous Page Using Keyboard    1
    Select Statements Using Keyboard   2
    Select Statements Using Keyboard   6
    ${previous_statements}=    Number Of Statements Clicked
    Should Be Equal As Integers    ${previous_statements}    3

User Can Go Back To Previous Test Page By Browser Back
    [Documentation]    Checks that the browser's back button works correctly.
    Select Statements    2
    Go To Next Page
    Select Statements    2
    Go Back
    ${previous_statements}=    Number Of Statements Clicked
    Should Be Equal As Integers    ${previous_statements}    2
    Go To Next Page
    ${previous_statements}=    Number Of Statements Clicked
    Should Be Equal As Integers    ${previous_statements}    2

User Can Go Back To Front Page
    [Documentation]    Checks that the user is able to go back to the frontpage.
    Go Back To Front Page

User Can Go Back To Front Page Using Keyboard
    [Documentation]    Checks that the user is able to go back to the frontpage.
    Go Back To Front Page Using Keyboard

# robocop: disable
User Is Able To Continue Test After Reloading Page
    [Documentation]    Reloads the page and checks that user can navigate in the test
    ...                and see previously selected statements.
    # robocop: enable
    Select Statements    1
    Go To Next Page
    Select Statements    2
    Reload Page
    Wait Until Page Contains    jotka kuvaavat sinua parhaiten
    Go To Previous Page    1
    ${previous_statements}=    Number Of Statements Clicked
    Should Be Equal As Integers    ${previous_statements}    1
    Go To Next Page
    Select Statements    6
    ${previous_statements}=    Number Of Statements Clicked
    Should Be Equal As Integers    ${previous_statements}    3

User Is Able To See Selected Statements After Going Back To Front Page
    [Documentation]    Checks that the user is able to see previously selected statements
    ...                after going back to the frontpage.
    Select Statements    1
    Go To Next Page
    Select Statements    2
    Go Back To Front Page
    Go To Testpage
    Wait Until Page Contains    jotka kuvaavat sinua parhaiten
    Go To Next Page
    ${previous_statements}=    Number Of Statements Clicked
    Should Be Equal As Integers    ${previous_statements}    2
