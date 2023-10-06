*** Settings ***
Documentation    Tests for the frontpage of the app.

Resource    ../../RF-keywords/CommonFunctions.resource
Resource    ../testpages/suiteKeywords.resource
Resource    suiteKeywords.resource

Suite Setup
...        Run Keywords
...        Open And Configure Browser
...        AND    Register Keyword To Run On Failure    Nothing
Suite Teardown    Close Browser

Test Setup    Go To Resultpage
Test Tags    resultpage


*** Test Cases ***
Resultpage Headers
    [Documentation]    Checks the headers at resultpage.
    Check Headers

Resultpage Analyses
    [Documentation]    Checks the number of analyses
    Check Analysis
