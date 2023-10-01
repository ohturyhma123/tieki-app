*** Settings ***
Documentation    This file contains libraries and common keywords used with test suites.
Library    SeleniumLibrary


*** Variables ***
${APP_URL}    http://localhost:5173
${TEST_URL}    http://localhost:5173/test
${BROWSER}    chrome
${DELAY}    0.5 seconds


*** Keywords ***
Go To Frontpage
    [Documentation]    Opens the homepage
    Go To    ${APP_URL}

Open And Configure Browser
    [Documentation]    Opens and configures the browser
    Open Browser    browser=${BROWSER}
    Maximize Browser Window
    Set Selenium Speed    ${DELAY}

Go To Testpage
    [Documentation]    Opens the testpage.
    Go To    ${APP_URL}/test
