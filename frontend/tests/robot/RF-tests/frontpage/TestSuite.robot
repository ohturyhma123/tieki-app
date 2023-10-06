*** Settings ***
Documentation    Tests for the frontpage of the app.

Resource    ../../RF-keywords/CommonFunctions.resource
Resource    suiteKeywords.resource

Suite Setup
...        Run Keywords
...        Open And Configure Browser
...        AND    Register Keyword To Run On Failure    Nothing
Suite Teardown    Close Browser

Test Setup    Go To Frontpage
Test Tags    frontpage


*** Test Cases ***
Frontpage Is Open
    [Documentation]    Checks that the home page opens correctly
    Title Is Correct

Frontpage Contains Correct Info
    [Documentation]    Checks that the frontpage's header is correct and the frontpage
    ...                contains introduction to the test
    Check Header
    Check Intro

User Can Start The Test
    [Documentation]    Clicks on the button that takes the user to the test.
    Go To Test
    First Test Page

User Can Go To Links Page
    [Documentation]    Checks that the user is able to go to links page via link.
    Click Linkit Link
