*** Settings ***
Library  SeleniumLibrary
Resource  suiteKeywords.resource

*** Variables ***
${URL}  http://yourwebsite.com
${SUCCESS_WINDOW_SELECTOR}  css:div.success

*** Test Cases ***
Check If Success Window Pops Out
    Open Website  ${URL}
    Click Button  Save
    Wait Until Element Is Visible  ${SUCCESS_WINDOW_SELECTOR}  5s
    Close Browser