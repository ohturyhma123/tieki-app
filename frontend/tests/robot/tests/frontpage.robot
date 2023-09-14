*** Settings ***
Documentation    Tests for the frontpage of the app.

Resource    ../resources/app.resource
Suite Setup    
...    Run Keywords
...        Open And Configure Browser
...        AND    Register Keyword To Run On Failure    Nothing
Suite Teardown    Close Browser
Test Setup    Go To Frontpage
Test Tags    frontpage

*** Test Cases ***

Frontpage Is Open
    [Documentation]    Checks that the home page opens correctly
    Title Is Correct

Header Is Correct
    Element Text Should Be    tag:p    Hello Ohtu
