*** Settings ***
Documentation    Tests for the linkpage of the app.
Resource    ../../CommonKeywords/CommonFunctions.resource
Resource    suiteKeywords.resource

Suite Setup
...        Run Keywords
...        Open And Configure Browser
...        AND    Register Keyword To Run On Failure    Nothing
Suite Teardown    Close Browser

Test Setup
...        Run Keywords
...        CommonFunctions.Go To Linkspage
...        AND    Wait Until Page Contains    Lue
Test Tags    linkpage


*** Test Cases ***
Linkpage Is open
    [Documentation]    Linkpage is opened
    Header Is Correct

User Can Click On The Link
    [Documentation]    User can click on the link in the linkpage
    Click On Link

User Can Use Keyboard To Press The Link
    [Documentation]    Using keyboard, can press the link in the linkpage
    Keyboard Press Link

User Can Navigate Back To Front Page
    [Documentation]    User can navigate back to frontpage
    Go Back To Frontpage

User Can Navigate Back To Front Page Using Keyboard
    [Documentation]    User can navigate back to frontpage using only keyboard
    Go Back To Front Page Using Keyboard
