*** Settings ***
Documentation    This file contains common keywords and variables used with test suites.
Library    SeleniumLibrary

*** Variables ***
${APP_URL}    https://tieki.ext.ocp-test-0.k8s.it.helsinki.fi
${BROWSER}    chrome
${DELAY}    0.5 seconds

*** Keywords ***
Title Is Correct
    Title Should Be    Vite + React

Go To Frontpage
    [Documentation]    Opens the homepage
    Go To    ${APP_URL}

Open And Configure Browser
    [Documentation]    Opens and configures the browser
    Open Browser    browser=${BROWSER}
    Maximize Browser Window
    Set Selenium Speed    ${DELAY}