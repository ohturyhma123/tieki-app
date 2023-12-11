*** Settings ***
Documentation    Tests for the frontpage of the app.

Resource    ../../CommonKeywords/CommonFunctions.resource
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

User Can Open About Page
    [Documentation]    Clicks on the button that takes the user to the authors page.
    Go To About Page

User Can Go To About Page Using Keyboard
    [Documentation]    Using keyboard only, press the button that takes the user to the authors page.
    Go To About Page Using Keyboard

User Can Go To Feedback Form
    [Documentation]    Clicks on the link that takes the user to the feedback form.
    Go To About Page
    Go To Feedback Form
