*** Settings ***
Documentation    This file contains keywords used with test suite.

Library    SeleniumLibrary


*** Variables ***
${EMAIL}    test@test.com
${PASSWORD}    password


*** Keywords ***
Title Is Correct
    [Documentation]    Once the home page is open, checks that the correct title is shown
    Title Should Be    Verkkokauppa.com - todennäköisesti aina halvempi

Go To Log In
    [Documentation]    Opens the log in page
    Click Element    //*[@id="app"]/div[1]/div/header/div[1]/nav/div/span[1]/span[1]
    Click Element    //*[@id="app"]/div[1]/div/header/div[1]/nav/div/span[1]/span[1]

Submit Email
    [Documentation]    Inputs e-mail address to e-mail input field and submits it
    Input Text    //input[@placeholder="Sähköpostiosoitteesi"]    ${EMAIL}
    Click Button    id=login-button
