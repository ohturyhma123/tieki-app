*** Settings ***
Documentation    This file contains common keywords and variables used with test suites.


*** Keywords ***
Check Edit Links Is Visible
    [Documentation]    Checks that the edit links button is visible.
    Page Should Contain    Muokkaa linkkejä

Check Edit Statements Is Visible
    [Documentation]    Checks that the edit statements button is visible.
    Page Should Contain    Muokkaa väittämiä

Check Edit Results Is Visible
    [Documentation]    Checks that the edit results button is visible.
    Page Should Contain    Muokkaa analyyseja

Check Log Out Is Visible
    [Documentation]    Checks that the logout button is visible.
    Page Should Contain    Kirjaudu ulos

Go To Edit Link Page
    [Documentation]    Clicks the button that takes the user to edit links page.
    Click Button    Muokkaa linkkejä
    Page Should Contain    Muokkaa linkkejä
    Page Should Contain    Tallenna
    Wait Until Page Contains    Kirjoittajan ABC

Go To Edit Statements Page
    [Documentation]    Clicks the button that takes the user to edit statements page.
    Click Button    Muokkaa väittämiä
    Page Should Contain    Positiiviset väittämät
    Page Should Contain    Negatiiviset väittämät
    Wait Until Page Contains    Kirjoittamiseen liittyvät tunteet ja ajatukset

Go To Edit Analysis Page
    [Documentation]    Clicks the button that takes the user to edit analyses page.
    Click Button    Muokkaa analyyseja
    Page Should Contain    Muokkaa analyyseja
    Page Should Contain    Positiiviset analyysit
    Page Should Contain    Negatiiviset analyysit
    Wait Until Page Contains    Kirjoittamiseen liittyvät tunteet ja ajatukset

Open Link Info
    [Documentation]    Opens the links info that is edited.
    [Arguments]    ${link_index}
    Click Element    xpath=//*[@id="root"]/div[2]/div/div[${link_index}]/div[1]
    Sleep    0.5

Open Statement Category Info
    [Documentation]    Opens the statement category info that is edited.
    [Arguments]    ${category_index}
    Click Element    xpath=//*[@id="root"]/div[2]/div/div[${category_index}]/div/div[1]
    Sleep    0.5

Open Analysis Category Info
    [Documentation]    Opens the analyses info that is edited.
    [Arguments]    ${analysis_index}
    Click Element    xpath=//*[@id="root"]/div[2]/div/div[${analysis_index}]/div/div[1]/div[1]
    Sleep    0.5

Edit Analysis Link
    # robocop: disable=0508
    [Documentation]    Edits analysis text segment.
    [Arguments]    ${analysis_index}    ${new_link_name}    ${new_url}
    Click Element    xpath=//*[@id="root"]/div[2]/div/div[${analysis_index}]/div/div[2]/div/div/div/div/div[2]/div[1]
    Sleep    0.5
    Press Keys    xpath=/html/body/div/div[2]/div/div[${analysis_index}]/div/div[2]/div/div/div/div/div[2]/div[2]/div/div/div/div/div/div[1]/div/input    CTRL+A+BACKSPACE
    Input Text    xpath=/html/body/div/div[2]/div/div[${analysis_index}]/div/div[2]/div/div/div/div/div[2]/div[2]/div/div/div/div/div/div[1]/div/input    ${new_link_name}
    Press Keys    xpath=/html/body/div/div[2]/div/div[${analysis_index}]/div/div[2]/div/div/div/div/div[2]/div[2]/div/div/div/div/div/div[2]/div/input    CTRL+A+BACKSPACE
    Input Text    xpath=/html/body/div/div[2]/div/div[${analysis_index}]/div/div[2]/div/div/div/div/div[2]/div[2]/div/div/div/div/div/div[2]/div/input    ${new_url}
    # robocop: disable=0508

Edit Statement
    [Documentation]    Removes old statement and inputs new statement.
    [Arguments]    ${statement_id}    ${new_statement}
    Press Keys    id=statement-${statement_id}    CTRL+A+BACKSPACE
    Input Text    id=statement-${statement_id}    ${new_statement}

Add Link
    [Documentation]    Adds a new link.
    [Arguments]    ${link_name}    ${link_description}    ${link_url}
    Wait Until Element Is Visible    id=newLinkName
    Input Text    id=newLinkName   ${link_name}
    Wait Until Element Is Visible    id=newLinkDescription
    Input Text    id=newLinkDescription    ${link_description}
    Wait Until Element Is Visible    id=newLinkURL
    Input Text    id=newLinkURL    ${link_url}
    Click Button    Lisää uusi linkki
    Wait Until Page Contains    Muokkaa linkkejä

Edit Link Name
    [Documentation]    Removes old link name and inputs new name.
    [Arguments]    ${link_index}    ${new_name}
    Press Keys    id=name-${link_index}    CTRL+A+BACKSPACE
    Input Text    id=name-${link_index}     ${new_name}

Edit Link Description
    [Documentation]    Removes old link name and inputs new name.
    [Arguments]    ${link_index}    ${new_description}
    Press Keys    id=description-${link_index}      CTRL+A+BACKSPACE
    Input Text    id=description-${link_index}    ${new_description}

Send Edited Object
    [Documentation]    Saves the edited link.
    Click Button    Tallenna

Check Object Was Updated Successfully
    [Documentation]    Checks that correct alert occurs if link is saved successfully.
    Wait Until Page Contains    Tiedot tallennettu onnistuneesti
    Click Button    OK
    Page Should Contain    Muokkaussivu

Check Object Was Updated Unsuccessfully
    [Documentation]    Checks that correct alert occurs if link is not saved.
    Wait Until Page Contains    Tietojen tallennus epäonnistui
    Click Button    OK
    Page Should Contain    Tallenna

Set Link DB To Initial State
    [Documentation]    Sets the database to initial state.
    [Arguments]    ${link_index}    ${edited_part}    ${initial_value}
    Go To Edit Link Page
    Open Link Info   ${link_index}
    IF  $edited_part == 'name'
        Edit Link Name    ${link_index}    ${initial_value}
    ELSE IF    $edited_part == 'description'
        Edit Link Description    ${link_index}    ${initial_value}
    END
    Send Edited Object
    Check Object Was Updated Successfully

Set Statement DB To Initial State
    [Documentation]    Sets the database to initial state.
    [Arguments]    ${category_index}    ${statement_id}    ${initial_value}
    Go To Edit Statements Page
    Open Statement Category Info   ${category_index}
    Edit Statement    ${statement_id}    ${initial_value}
    Send Edited Object
    Check Object Was Updated Successfully

Set Analysis DB To Initial State
    [Documentation]    Sets the database to initial state.
    [Arguments]    ${analysis_index}    ${initial_link_name}    ${initial_link_url}
    Go To Edit Analysis Page
    Open Analysis Category Info  ${analysis_index}
    Edit Analysis Link    ${analysis_index}    ${initial_link_name}    ${initial_link_url}
    Send Edited Object
    Check Object Was Updated Successfully

Delete Link
    [Documentation]    Deletes the link.
    [Arguments]    ${link_index}
    Click Element    xpath=/html/body/div/div[2]/div/div[${link_index}]/div[2]/div/div/div/div/button
    Sleep    0.5
    Page Should Contain    Muokkaa linkkejä

Add New Analysis Link
    # robocop: disable=0508
    [Documentation]    Adds a new analysis link.
    [Arguments]    ${linkName}    ${linkUrl}
    Wait Until Element Is Visible    xpath=/html/body/div/div[2]/div/div[5]/div/div[2]/div/div/div/div/div[2]/div[2]/div/div/div/div[2]/div/div[1]/div/input    10
    Wait Until Element Is Enabled    xpath=/html/body/div/div[2]/div/div[5]/div/div[2]/div/div/div/div/div[2]/div[2]/div/div/div/div[2]/div/div[1]/div/input    10
    Input Text    xpath=/html/body/div/div[2]/div/div[5]/div/div[2]/div/div/div/div/div[2]/div[2]/div/div/div/div[2]/div/div[1]/div/input    ${linkName}
    Wait Until Element Is Visible    xpath=/html/body/div/div[2]/div/div[5]/div/div[2]/div/div/div/div/div[2]/div[2]/div/div/div/div[2]/div/div[2]/div/input    10
    Wait Until Element Is Enabled    xpath=/html/body/div/div[2]/div/div[5]/div/div[2]/div/div/div/div/div[2]/div[2]/div/div/div/div[2]/div/div[2]/div/input    10
    Input Text    xpath=/html/body/div/div[2]/div/div[5]/div/div[2]/div/div/div/div/div[2]/div[2]/div/div/div/div[2]/div/div[2]/div/input    ${linkUrl}
    Click Element    xpath=/html/body/div/div[2]/div/div[5]/div/div[2]/div/div/div/div/div[2]/div[2]/div/div/div/div[2]/div/button

Delete Analysis Link
    # robocop: disable=0508
    [Documentation]    Deletes an analysis link.
    Click Element    xpath=/html/body/div/div[2]/div/div[5]/div/div[2]/div/div/div/div/div[2]/div[2]/div/div/div/div[1]/div[1]/button

Click Link Info
    [Documentation]    Clicks the link info.
    [Arguments]    ${index}
    Click Element    xpath=//*[@id="root"]/div[2]/div/div[5]/div/div[2]/div/div/div/div/div[${index}]/div[1]
