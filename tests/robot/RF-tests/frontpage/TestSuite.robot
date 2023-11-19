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
    [Documentation]    Checks that the home page opens correctly.
    Title Is Correct

Frontpage Contains Correct Info
    [Documentation]    Checks that the frontpage contains introduction to the test.
    Check Intro

User Can Start The Test
    [Documentation]    Clicks on the button that takes the user to the test.
    Go To Test
    First Test Page

User Can Start The Test Using Keyboard
    [Documentation]    Using keyboard only, press the button that takes the user to the test.
    Go To Test Using Keyboard
    First Test Page

User Can Go to Linkpage
    [Documentation]    Clicks on the button that takes the user to the linkpage.
    Go To Linkpage

User Can Go to Linkpage Using Keyboard
    [Documentation]    Using keyboard only, press the button that takes the user to the linkpage.
    Go To Linkpage Using Keyboard

User Can Open Feedback Form
    [Documentation]    Clicks on the button that takes the user to the feedback form.
    Go To Feedback Form

User Can Go to Feedback Form Using Keyboard
    [Documentation]    Using keyboard only, press the button that takes the user to the linkpage.
    Go To Feedback Form Using Keyboard
