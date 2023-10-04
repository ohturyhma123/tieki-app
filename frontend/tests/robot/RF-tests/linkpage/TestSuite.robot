*** Settings ***
Documentation    Tests for the linkpage of the app.
Resource    ../../RF-keywords/CommonFunctions.resource
Resource    suiteKeywords.resource

Suite Setup
...        Run Keywords
...        Open And Configure Browser
...        AND    Register Keyword To Run On Failure    Nothing
Suite Teardown    Close Browser

Test Setup    Go To Frontpage
Test Tags    linkpage

*** Test Cases ***
User can navigate to the linkpage
    [Documentation]    User can navigate to the linkpage and click on the link
    Go To Links Page
    Click On Link
    
User can navigate back to Front Page
    [Documentation]    User can navigate back to frontpage
    Go To Links Page
    Go Back To Frontpage
