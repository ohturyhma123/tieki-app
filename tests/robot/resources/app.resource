*** Settings ***
Documentation    This file contains common keywords and variables used with test suites.
Library    SeleniumLibrary

*** Variables ***
${APP_URL}    http://localhost:5173
${BROWSER}    chrome
${DELAY}    0.5 seconds

*** Keywords ***
Title Is Correct
    Title Should Be    Tieki

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