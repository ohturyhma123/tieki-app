*** Settings ***
Documentation    This file contains common keywords and variables used with test suites.


*** Keywords ***
Go To Resultpage
    [Documentation]    Goes to the Resultpage
    Go To Testpage
    Wait Until Page Contains    jotka kuvaavat sinua parhaiten
    # robocop: disable
    FOR    ${index}    IN RANGE    1    12
        Click Element    //*[@id="root"]/div[2]/div/div[6]
        Go To Next Page
        Select Statements    1
    END
    # robocop: enable
    Click Button    Tulokset
    Click Button    Kyllä

Go To Resultpage No Results
    [Documentation]    Goes to the Resultpage
    Go To Testpage
    Wait Until Page Contains    jotka kuvaavat sinua parhaiten
    # robocop: disable
    FOR    ${index}    IN RANGE    1    3
        Go To Next Page
        Select Statements    1
    END
    FOR    ${index}    IN RANGE    1    10
        Go To Next Page
    END
    # robocop: enable
    Click Button    Tulokset
    Click Button    Kyllä

Check No Results
    [Documentation]    Checks that the loaded page is the correct one.
    Wait Until Page Contains    Et valinnut tarpeeksi väitteitä
    Wait Until Page Contains    Hyödyllisiä linkkejä löydät linkkisivulta
    Wait Until Page Contains    Palaa tästä etusivulle

Check Headers
    [Documentation]    Checks that the headers are in order.
    Wait Until Page Contains    Tulokset
    Element Text Should Be    class:strengths    Vahvuudet
    Element Text Should Be    class:weaknesses    Kehityskohteet

Check Analysis
    [Documentation]    Checks that four analyses are shown.
    Wait Until Page Contains    Tulokset
    ${analysis}=    Get WebElements    xpath=//*[@id="panel1a-header"]
    ${analysis_count}=    Get Length    ${analysis}
    Should Be Equal As Integers    ${analysis_count}    4

Check Analysis Order
    [Documentation]    Checks that the analyses are in correct order
    Wait Until Page Contains    Tulokset
    Element Text Should Be    class:analysis0    Kielelliset seikat
    Element Text Should Be    class:analysis1    Kirjoittamiseen liittyvät tunteet ja ajatukset

Go To PDF View From Top
    [Documentation]    Clicks the link that takes user to pdf view of the results.
    Wait Until Page Contains    Tulokset
    Click Link    Näytä tulokset PDF-tiedostona
    ${pdf_url}=    Get Location
    Should Be Equal    ${pdf_url}    ${APP_URL}/pdfview

Go To PDF View From Bottom
    [Documentation]    Clicks the link that takes user to pdf view of the results.
    Wait Until Page Contains    Tulokset
    Click Link    pdf-muodossa
    ${pdf_url}=    Get Location
    Should Be Equal    ${pdf_url}    ${APP_URL}/pdfview
