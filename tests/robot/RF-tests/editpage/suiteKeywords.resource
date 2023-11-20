*** Settings ***
Documentation    This file contains common keywords and variables used with test suites.


*** Keywords ***
Check Edit Links Is Visible
    [Documentation]    Checks that the edit links button is visible.
    Page Should Contain    Muokkaa linkkejä

Check Edit Statements Is Visible
    [Documentation]    Checks that the edit links button is visible.
    Page Should Contain    Muokkaa väittämiä

Check Edit Results Is Visible
    [Documentation]    Checks that the edit links button is visible.
    Page Should Contain    Muokkaa analyyseja

Check Log Out Is Visible
    [Documentation]    Checks that the edit links button is visible.
    Page Should Contain    Kirjaudu ulos

Go To Edit Link Page
    [Documentation]    Clicks the button that takes the user to edit links page.
    Click Button    Muokkaa linkkejä
    Page Should Contain    Muokkaa linkkejä

Open Link Info
    [Documentation]    Opens the links info that is edited.
    [Arguments]    ${link_index}
    Click Element    xpath=//*[@id="root"]/div[2]/div/div[${link_index}]/div[1]

Edit Link Name
    [Documentation]    Removes old link name and inputs new name.
    [Arguments]    ${link_index}    ${new_name}
    ${name}=    Get Element Attribute    locator=xpath:/html/body/div/div[2]/div/div[${link_index}]/div[2]/div/div/div/div/div[1]/div/input    attribute=value
    ${name_length}=    Get Length    ${name}
    FOR    ${index_n}    IN RANGE    0    ${name_length}+1
        Press Keys    xpath=/html/body/div/div[2]/div/div[${link_index}]/div[2]/div/div/div/div/div[1]/div/input    BACKSPACE
        IF    ${index_n} == ${name_length}+1    BREAK
    END
    Input Text    xpath=/html/body/div/div[2]/div/div[${link_index}]/div[2]/div/div/div/div/div[1]/div/input    ${new_name}

Edit Link Description
    [Documentation]    Removes old link name and inputs new name.
    [Arguments]    ${link_index}    ${new_description}
    ${description}=    Get Element Attribute    locator=xpath:/html/body/div/div[2]/div/div[${link_index}]/div[2]/div/div/div/div/div[2]/div/input    attribute=value
    ${description_length}=    Get Length    ${description}
    FOR    ${index_d}    IN RANGE    0    ${description_length}+1
        Press Keys    xpath=/html/body/div/div[2]/div/div[${link_index}]/div[2]/div/div/div/div/div[2]/div/input      BACKSPACE
        IF    ${index_d} == ${description_length}+1    BREAK
    END
    Input Text    xpath=/html/body/div/div[2]/div/div[${link_index}]/div[2]/div/div/div/div/div[2]/div/input    ${new_description}

Send Edited Link
    [Documentation]    Saves the edited link.
    Click Button    Tallenna
    Sleep    1

Check Link Was Updated Successfully
    [Documentation]    Checks that correct alert occurs if link is saved successfully.
    Page Should Contain    Tiedot tallennettu onnistuneesti
    Click Button    OK
    Page Should Contain    Muokkaussivu

Check Link Was Updated Unsuccessfully
    [Documentation]    Checks that correct alert occurs if link is not saved.
    Page Should Contain    Tietojen tallennus epäonnistui
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
    Send Edited Link
    Check Link Was Updated Successfully

Delete Link
    [Documentation]    Deletes the link.
    [Arguments]    ${link_index}
    # Scroll Element Into View    id=delete-${link_index}
    Sleep    1
    Click Element    xpath=/html/body/div/div[2]/div/div[${link_index}]/div[2]/div/div/div/div/button
    Page Should Contain    Muokkaa linkkejä

Add Link
    [Documentation]    Adds a new link.
    [Arguments]    ${link_name}    ${link_description}    ${link_url}
    #Click Element    id=add-new-link-button
    Wait Until Element Is Visible    id=newLinkName
    Input Text    id=newLinkName   ${link_name}
    Wait Until Element Is Visible    id=newLinkDescription
    Input Text    id=newLinkDescription    ${link_description}
    Wait Until Element Is Visible    id=newLinkURL
    Input Text    id=newLinkURL    ${link_url}
    Click Button    Lisää uusi linkki
    Wait Until Page Contains    Muokkaa linkkejä

Check Link Was Added Successfully
    [Documentation]    Checks that a link was added successfully.
    ${count_before}=    Get Element Count    id=linkComponent
    Add Link    Test Link    Test Description    http://test.com
    ${count_after}=    Get Element Count    id=linkComponent
    Should Be True    ${count_after} > ${count_before}
