*** Settings ***
Documentation    Tests for the frontpage of the app.

Resource    ../resources/app.resource
Suite Setup    
...    Run Keywords
...        Open And Configure Browser
...        AND    Register Keyword To Run On Failure    Nothing
Suite Teardown    Close Browser
Test Setup    Go To Testpage
Test Tags    testpage

*** Settings ***
Library    SeleniumLibrary


*** Test Cases ***
Select Statements and Click Seuraava
    [Documentation]    Select Statements and Click Seuraava
    Go To Testpage

    Click Element    //div[contains(@class,'statement')]
    Click Element    //*[@id="root"]/div/div[3]
    Click Element    //div[contains(@class,'statement')]

    Click Button    //button[contains(text(), 'Seuraava')]  


    

    