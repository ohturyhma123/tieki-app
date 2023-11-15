*** Settings ***
Documentation    This file contains libraries and common keywords used with test suites.
Library    Collections
Library    SeleniumLibrary
Library    RequestsLibrary


*** Variables ***
${APP_URL}    http://localhost:3000
${TEST_URL}    http://localhost:3000/test/1
${LINK_URL}    http://localhost:3000/links
${EDIT_URL}    http://localhost:3000/edit
${BROWSER}    headlesschrome
${DELAY}    0 seconds

${LINKSAPI}    http://localhost:3000/api/links
${STATEMENTSAPI}    http://localhost:3000/api/statements
${RESULTSAPI}    http://localhost:3000/api/results


*** Keywords ***
Go To Frontpage
    [Documentation]    Opens the homepage
    Go To    ${APP_URL}

Open And Configure Browser
    [Documentation]    Opens and configures the browser
    Open Browser    browser=${BROWSER}
    Set Window Size    1920    1080
    Set Selenium Speed    ${DELAY}

Go To Testpage
    [Documentation]    Opens the testpage.
    Go To    ${TEST_URL}

Go To Linkspage
    [Documentation]    Opens the linkpage.
    Go To    ${LINK_URL}

Go To Editpage
    [Documentation]    Opens the editpage.
    Go To    ${EDIT_URL}