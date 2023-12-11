*** Settings ***
Documentation    Tests for the frontpage of the app.

Resource    ../../CommonKeywords/CommonFunctions.resource
Resource    ../testpages/suiteKeywords.resource
Resource    suiteKeywords.resource

Test Setup
...        Run Keywords
...        Open And Configure Browser
...        AND    Register Keyword To Run On Failure    Nothing
Test Teardown    Close Browser

Test Tags    resultpage


*** Test Cases ***
Resultpage Headers
    [Documentation]    Checks the headers at resultpage.
    Go To Resultpage
    Check Headers

Resultpage Analyses
    [Documentation]    Checks the order and number of analyses.
    Go To Resultpage
    Check Analysis
    Check Analysis Order

Resultpage PDF
    [Documentation]    Goes to the pdfview from results.
    Go To Resultpage
    Go To PDF View From Bottom

Resultpage No Results
    [Documentation]    Checks that there are no results.
    Go To Resultpage No Results
    Check No Results
