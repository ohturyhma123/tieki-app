*** Settings ***
Documentation    This is an example test suite to demonstrate robot tests.
...              These tests are implemented on Verkkokauppa.com.

Resource    suiteKeywords.resource

Suite Setup    Open And Configure Browser
Suite Teardown    Close Browser

Test Setup    Go To Home Page

Test Tags    example


*** Variables ***
${HOME URL}    https://www.verkkokauppa.com/fi/etusivu
${BROWSER}    chrome
${DELAY}    0.5 seconds


*** Test Cases ***
Home Page Is Open
    [Documentation]    Checks that the home page opens correctly
    Title Is Correct

Log In
    [Documentation]    This simulates logging in to verkkokauppa.com. The test
    ...                will stop after submitting e-mail, as there is no such user in the system
    ...                as test@test.com.
    Go To Log In
    Submit Email


*** Keywords ***
Go To Home Page
    [Documentation]    Opens the homepage
    Go To    ${HOME URL}

Open And Configure Browser
    [Documentation]    Opens and configures the browser
    Open Browser    browser=${BROWSER}
    Maximize Browser Window
    Set Selenium Speed    ${DELAY}
