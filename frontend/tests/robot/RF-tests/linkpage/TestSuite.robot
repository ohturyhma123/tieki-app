*** Settings ***
Documentation    Tests for the linkpage of the app.
Resource    ../../RF-keywords/CommonFunctions.resource
Resource    suiteKeywords.resource

Suite Setup
...        Run Keywords
...        Open And Configure Browser
...        AND    Register Keyword To Run On Failure    Nothing
Suite Teardown    Close Browser

Test Setup    CommonFunctions.Go To Linkspage
Test Tags    linkpage


*** Test Cases ***
Linkpage Is open
    [Documentation]    Linkpage is opened
    Header Is Correct

User Can Click On The Link
    [Documentation]    User can click on the link in the linkpage
    Click On Link

User Can Navigate Back To Front Page
    [Documentation]    User can navigate back to frontpage
    Go Back To Frontpage
