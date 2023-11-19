*** Settings ***
Documentation    Tests for the frontpage of the app.

Resource    ../../RF-keywords/CommonFunctions.resource
Resource    ../testpages/suiteKeywords.resource
Resource    suiteKeywords.resource

Test Setup
...        Run Keywords
...        Open And Configure Browser
...        AND    Go To Resultpage
...        AND    Register Keyword To Run On Failure    Nothing
Test Teardown    Close Browser

Test Tags    resultpage


*** Test Cases ***
Resultpage Headers
    [Documentation]    Checks the headers at resultpage.
    Check Headers

Resultpage Analyses
    [Documentation]    Checks the number of analyses
    Check Analysis

Check PDF View From Top Of The Page
    [Documentation]    Checks that the pdf view is shown correctly when clicking link
    ...                from top of the result page.
    Go To PDF View From Top

Check PDF View From Bottom Of The Page
    [Documentation]    Checks that the pdf view is shown correctly when clicking link
    ...                from bottom of the result page.
    Go To PDF View From Bottom
